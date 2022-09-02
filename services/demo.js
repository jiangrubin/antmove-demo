import request from '../utils/request'

export function queryCnodeTopics (data) {
  return request.get({
    url: 'https://cnodejs.org/api/v1/topics',
    data
  })
}