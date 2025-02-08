// 用户信息
export const useUserStore = defineStore('user', () => {
  const info = ref<User>({
    userid: null,
    username: null,
    roleId: null,
    token: null,
    refreshToken: null,
    nickname: null,
  })
  const isLogin = computed(() => info.value?.token !== null)
  function clear() {
    info.value = {
      userid: null,
      username: null,
      roleId: null,
      token: null,
      refreshToken: null,
      nickname: null,
    }
  }
  function logout() {
    clear()
    // const router = useRouter()
  }
  return {
    info,
    clear,
    logout,
    isLogin,
  }
}, { persist: true })
