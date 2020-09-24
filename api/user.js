// 用户相关
import request from '@/utils/request.js'

// 请求商品详情
function getUsersWxlogin(data) {
	return request({
		url: '/api/public/v1/users/wxlogin',
		method: 'POST',
		data
	})
}

export {
	getUsersWxlogin
}
