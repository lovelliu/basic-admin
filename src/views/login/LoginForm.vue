<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col } from 'ant-design-vue';
  import LoginFormTitleVue from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useFormValid, useLoginState, useFormRules } from './useLogin';

  import { getCaptcha } from '/@/api/sys/user';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;

  const { t } = useI18n();
  const userStore = useUserStore();
  const { getFormRules } = useFormRules();
  const { notification } = useMessage();

  const formRef = ref();
  const formData = reactive({
    username: 'admin',
    password: 'password',
    verifyCode: '',
    captchaId: '',
  });
  const imgSrc = ref('');
  const rememberMe = ref(false);
  const loading = ref(false);
  const { validForm } = useFormValid<typeof formData>(formRef);

  const { getLoginState, setLoginState } = useLoginState();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  onMountedOrActivated(getCaptchaImg);

  async function getCaptchaImg() {
    const { id, img } = await getCaptcha();
    formData.captchaId = id;
    imgSrc.value = img;
  }

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        username: data.username,
        password: data.password,
        captchaId: formData.captchaId,
        verifyCode: data.verifyCode,
      });

      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc') + ': ' + userInfo.userName}`,
        });
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <LoginFormTitleVue class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    @keypress.enter="handleLogin"
    ref="formRef"
    v-show="getShow"
    :rules="getFormRules"
  >
    <FormItem name="username" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.username"
        :placeholder="t('sys.login.accountPlaceholder')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        v-model:value="formData.password"
        :placeholder="t('sys.login.passwordPlaceholder')"
      />
    </FormItem>
    <FormItem name="verifyCode" class="">
      <Input
        size="large"
        v-model:value="formData.verifyCode"
        :placeholder="t('sys.login.smsPlaceholder')"
      >
        <template #suffix>
          <img
            :src="imgSrc"
            alt="captcha"
            style="height: 30px; cursor: pointer"
            @click="getCaptchaImg"
          />
        </template>
      </Input>
    </FormItem>

    <ARow>
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem style="text-align: right">
          <AButton type="link" size="small">{{ t('sys.login.forgetPassword') }}</AButton>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <AButton type="primary" size="large" block @click="handleLogin" :loading="loading">{{
        t('sys.login.loginButton')
      }}</AButton>
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <AButton block @click="setLoginState(LoginStateEnum.MOBILE)" disabled>{{
          t('sys.login.mobileSignInFormTitle')
        }}</AButton>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <AButton block @click="setLoginState(LoginStateEnum.QR_CODE)" disabled>
          {{ t('sys.login.qrSignInFormTitle') }}
        </AButton>
      </ACol>
      <ACol :md="7" :xs="24">
        <AButton block @click="setLoginState(LoginStateEnum.REGISTER)" disabled>
          {{ t('sys.login.registerButton') }}
        </AButton>
      </ACol>
    </ARow>
  </Form>
</template>
