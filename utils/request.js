// 封装网络请求
// 基地址
const BASE_URL = 'https://www.uinav.com'

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
