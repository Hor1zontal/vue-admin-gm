import request from '@/utils/request'

export function remainNewly(register, activity) {
  return request({
    url: '/statistic/newly',
    method: 'get',
    params: {
      reg: register,
      active: activity
    }
  })
}

export function remainActivity(activity, last_activity) {
  return request({
    url: '/statistic/activity',
    method: 'get',
    params: {
      login: activity,
      last_login: last_activity
    }
  })
}

export function dayUserData(day) {
  return request({
    url: '/statistic/user',
    method: 'get',
    params: {
      day
    }
  })
}
