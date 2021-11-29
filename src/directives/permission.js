import store from '@/store'
function checkPermission(el, binding) {
  const { value } = binding
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermission = points.some((points) => {
      return value.includes(points)
    })

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChildren()
    }
  } else {
    throw new Error('v-permisison value is ["admin", "editor"...]')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
