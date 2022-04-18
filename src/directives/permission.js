import store from '@/store'

function checkPermission(el, binding) {
  // 获取权限
  const { value } = binding
  console.log('binding-value: ', value)
  // 获取功能权限
  const points = store.getters.userInfo.permission.points
  console.log('points: ', points)
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    console.log('hasPermission: ', hasPermission)

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permisison value is ["admin", "editor"...]')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  },
  beforeUnmount() {}
}
