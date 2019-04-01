import request from '@/utils/request'

export function remainNewly(register, activity) {
  return request({
    url: '/remain/newly',
    method: 'get',
    data: {
      reg: register,
      activity: activity
    }
  })
}

export function remainActivity(activity, last_activity) {
  return request({
    url: '/remain/activity',
    method: 'get',
    data: {
      activity: activity,
      last_activity: last_activity
    }
  })
}
