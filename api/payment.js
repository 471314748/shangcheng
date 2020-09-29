import request from '@/utils/request.js'
let token = uni.getStorageSync('token') || ''

// 创建订单
function createOrders(data) {
	return request({
		url: '/api/public/v1/my/orders/create',
		method: 'POST',
		isAuth:true,
		data
	})
}
// 获取支付参数
function getDoPay(data) {
	return request({
		url: '/api/public/v1/my/orders/req_unifiedorder',
		method: 'POST',
		isAuth:true,
		data
	})
}

export {
	createOrders, getDoPay
}
