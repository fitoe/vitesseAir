export { }
declare global {
  interface User {
    userid: number | null
    username: string | null
    nickname: string | null
    roleId: number | null
    token: string | null
    refreshToken: string | null
  }

  interface List {
    data: User[]
    count: number
  }
}
