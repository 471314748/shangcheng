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
	isAuth,
	data
}) {
	return new Promise((resolve, reject) => {
		// 接口不需要传token,默认值为{}
		let header = {}
		
		if (isAuth) {
			// 接口需要传token
			let token = uni.getStorageSync('token')
			// 接口需要token，但是没有登录态，跳转登录页
			if(!token){
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return 
			}
			header.Authorization = token
		}
		
		uni.request({
			url: BASE_URL + url,
			method,
			header,
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
