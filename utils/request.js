// 封装网络请求
// 自己appid: wx8c9c8ba03ae5e52e
// 登陆接口需要切换appid: wx38d8faffac4d34d2
// 基地址
const BASE_URL = 'https://www.uinav.com'
// const BASE_URL = 'https://api-ugo-dev.itheima.net'
// const BASE_URL = 'https://api.zbztb.cn'
function request({
	url,
	method,
	data
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method,
			data,
			success: res => {
				resolve(res)
			},
			fail: () => {
				reject(res)
			}
		});
	})
}

export default request
