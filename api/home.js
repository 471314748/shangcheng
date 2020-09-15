import request from '@/utils/request.js'
// 首页请求

// 请求轮播图数据
function apiGetSwiperdata(data) {
	return request({
		url: '/api/public/v1/home/swiperdata',
		method: 'get',
		data
	})
}

// 请求导航数据
function apiGetCatitems(data) {
	return request({
		url: '/api/public/v1/home/catitems',
		method: 'get',
		data
	})
}

// 请求楼层数据
function apiGetFloordata(data) {
	return request({
		url: '/api/public/v1/home/floordata',
		method: 'get',
		data
	})
}

export {
	apiGetSwiperdata,
	apiGetCatitems,
	apiGetFloordata
}
