import request from '@/utils/request.js'

// 请求商品分类数据
function getCategories(data) {
	return request({
		url: '/api/public/v1/categories',
		method: 'get',
		data
	})
}

export {
	getCategories
}
