import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 角色分配权限
 */
export const distrubutePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'post',
    data
  })
}
