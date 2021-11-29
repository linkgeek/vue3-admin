import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 所有不匹配的路由跳转404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      // console.log('routes: ', routes)
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
