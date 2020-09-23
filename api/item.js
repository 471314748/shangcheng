import request from '@/utils/request.js'

// 请求商品详情
function getGoodsItem(goods_id) {
	return request({
		url: '/api/public/v1/goods/detail?goods_id='+goods_id,
		method: 'get'
	})
}

// 购物车需要展示的内容
function apiGetGoodslist(goods_ids) {
	return request({
		url: '/api/public/v1/goods/goodslist?goods_ids='+goods_ids,
		method: 'get'
	})
}

export {
	getGoodsItem,
	apiGetGoodslist
}