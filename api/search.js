import request from '@/utils/request.js'

// 请求商品分类数据
function getGoodsSearch(data) {
	return request({
		url: '/api/public/v1/goods/search',
		method: 'get',
		data
	})
}

export {
	getGoodsSearch
}