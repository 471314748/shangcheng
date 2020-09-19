import request from '@/utils/request.js'

// 请求商品详情
function getGoodsItem(goods_id) {
	return request({
		url: '/api/public/v1/goods/detail?goods_id='+goods_id,
		method: 'get'
	})
}

export {
	getGoodsItem
}