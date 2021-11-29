import request from '@/utils/request'

/**
 * 获取用户列表
 */
export const getUserManageList = (data) => {
  console.log('分页：', data)
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/delete/${id}`
  })
}

/**
 * 获取用户角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 用户分配角色
 */
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'post',
    data: {
      roles
    }
  })
}
