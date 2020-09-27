<template>
	<view>
		<button open-type="getUserInfo" @getuserinfo="getMyUserInfo">点我登录</button>
	</view>
</template>

<script>
	import {
		getUsersWxlogin
	} from '@/api/user.js'
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 获取用户信息
			getMyUserInfo(userInfoRes) {
				// 获取用户信息
				// console.log('userInfoRes', userInfoRes)
				let {
					encryptedData,
					signature,
					iv,
					rawData
				} = userInfoRes.detail;
				// 获取code
				uni.login({
					success: async loginRes => {
						let code = loginRes.code
						let data = await getUsersWxlogin({
							encryptedData,
							signature,
							iv,
							rawData,
							code
						})
						// 无法获取token,bug
						console.log('需要切换老师的appid,在utils/request.js文件夹');
						console.log('data', data);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userInfo', userInfoRes.detail.userInfo);
						uni.showToast({
							title: '登录成功',
							duration: 500,
							success: () => {
								// 并不是toast消失时候,是toast出现时候
								setTimeout(() => {
									// 回到上一个页面
									uni.navigateBack();
								}, 500);
							}
						});
						// 
					}
				})
			}
		}
	}
</script>

<style>
</style>
