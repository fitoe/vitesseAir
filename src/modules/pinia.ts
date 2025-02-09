import type { UserModule } from '~/types'
import { createPinia } from 'pinia'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ app, isClient, router, initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)

  if (import.meta.env.SSR)
    initialState.pinia = pinia.state.value
  else
    pinia.state.value = initialState.pinia || {}

  // router.beforeEach((to, from, next) => {
  //   const store = useRootStore(pinia)
  //   if (!store.ready)
  //     // perform the (user-implemented) store action to fill the store's state
  //     store.initialize()
  //   next()
  // })

  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}

  else
    initialState.pinia = pinia.state.value
}
