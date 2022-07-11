import type { ValidationRule } from 'ant-design-vue/lib/form/Form';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import type { Ref } from 'vue';
import { computed, ref, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, handleBackLogin, getLoginState };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form)
      return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export function useFormRules() {
  const { t } = useI18n();
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));

  const validateMobile = async (_: RuleObject, value: string) => {
    if (!value)
      return Promise.reject(t('sys.login.mobilePlaceholder'));

    if (!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value))
      return Promise.reject(t('sys.login.notLegalPhone'));

    return Promise.resolve();
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const passwordFormRule = unref(getPasswordFormRule);
    return {
      phone: [{ validator: validateMobile, trigger: 'change' }],
      password: passwordFormRule,
    };
  });

  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
