import type { UserInfo } from '#/store'
import type { ErrorMessageMode } from '#/axios'

import type { RoleEnum } from '@/enums/roleEnum'
import type { LoginParams } from '@/api/sys/model/userModel'
import type { RouteRecordRaw } from 'vue-router'
import { h } from 'vue'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { PageEnum } from '@/enums/pageEnum'
import { RETOKEN_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { getUserInfo, loginApi, refreshToken } from '@/api/sys/user'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { router } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { createAxios } from '@/utils/request'
import { isArray } from '@/utils/is'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  refreshToken?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
  userId?: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    userId: undefined,
    // refresh token
    refreshToken: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRefreshToken(): string {
      return this.refreshToken || getAuthCache<string>(RETOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info || '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRefreshToken(info: string | undefined) {
      this.refreshToken = info || ''
      setAuthCache(RETOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      if (this.userInfo)
        this.userInfo.userId = this.userId

      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<UserInfo | null> {
      const { createMessage } = useMessage()
      try {
        const { goHome = true, ...loginParams } = params
        const res = await loginApi(loginParams)
        if (!res) {
          createMessage.warning('result is null')
          return null
        }
        const { access_token, refresh_token, user_id } = res

        // save token
        this.setToken(access_token)
        this.setRefreshToken(refresh_token)
        this.userId = user_id
        return this.afterLoginAction(goHome)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async toTefreshToken() {
      const { createMessage } = useMessage()
      try {
        const res = await refreshToken(createAxios())
        const { access_token, refresh_token } = res

        // save token
        this.setToken(access_token)
        this.setRefreshToken(refresh_token)
        return true
      }
      catch (error: any) {
        createMessage.error(error.message)
        this.logout(true)
      }
    },

    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.getToken)
        return null
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      }
      else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach(route => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome && (await router.replace(PageEnum.BASE_HOME))
      }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken)
        return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo

      if (isArray(roles)) {
        const roleList = roles.map(item => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      }
      else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
