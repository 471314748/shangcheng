import request from '@/utils/request.js'

// 创建订单
function createOrders(data) {
	return request({
		url: '/api/public/v1/my/orders/create',
		method: 'POST',
		header: {
			'Authorization': 66666
		},
		data
	})
}

export {
	createOrders
}
