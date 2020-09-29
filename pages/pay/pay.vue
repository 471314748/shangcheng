<template>
	<view>
		<view class="address-wrapper">
			<view class="address" v-if="address.userName">
				<view class="receiver">
					<view class="name">收货人：{{address.userName}}</view>
					<view class="phone-num">{{address.telNumber}}</view>
					<text class="iconfont icon-arrow-right"></text>
				</view>
				<view class="address-txt">收货地址：{{address.provinceName || ''}},{{address.cityName || ''}},{{address.countyName || ''}},{{address.detailInfo || ''}}</view>
			</view>
			<!-- 选择地址 -->
			<view class="choose-address" v-else @click="getAddr">
				<view>请选择地址</view>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="flower">
				<image src="/static/images/cart_border@2x.png"></image>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="item.goodsId">
				<image :src="item.goods_small_logo" alt="">
					<view class="right">
						<view class="line-clamp2">{{item.goods_name}}</view>
						<view class="btm">
							<text class="price">￥<text>{{item.goods_price}}</text>.00</text>
							<view class="goods-num">
								<text>x {{item.num}}</text>
							</view>
						</view>
					</view>
			</view>
		</view>

		<view class="bottom-fixed" @click="pay">
			微信支付(￥{{totalPrice}})
		</view>
	</view>
</template>

<script>
	import {
		apiGetGoodslist
	} from '../../api/item.js'
	import {
		createOrders, getDoPay
	} from '../../api/payment.js'

	const CART_KEY = 'cart'
	export default {
		data() {
			return {
				// 收货地址
				address: uni.getStorageSync('address') || {},
				cart: [],
				goodsList: []
			}
		},
		onLoad(options) {
			// 商详跳转过来的
			this.goodsId = parseInt(options.goodsId)
			let idsStr = ''
			// console.log(goodsId);
			if (this.goodsId) {
				console.log('直接买的');
				// 如果从商详跳转,构造一个cart
				this.cart = [{
					goodsId: this.goodsId,
					num: 1
				}]
				idsStr = this.goodsId
			} else {
				console.log('购物车买的');
			// console.log(6666);
			// 请求本地数据status
			this.cart = uni.getStorageSync(CART_KEY) || []
			this.cart = this.cart.filter(item => {
				return item.checked
			})
			if (!this.cart.length) {
				return
			}
			console.log(this.cart);
			let idsArr = this.cart.map(item => {
				return item.goodsId
			})
			idsStr = idsArr.join(',')
			}
			// console.log(idsStr);
			this.query(idsStr)
		},
		methods: {
			// 获取微信地址
			getAddr() {
				// 发起授权，
				uni.authorize({
					scope: 'scope.address',
					// 确认，成功处理
					success: () => {
						// 获取通讯地址
						uni.chooseAddress({
							success: (res) => {
								this.address = res
								// console.log(this.address);
								// 存地址
								uni.setStorageSync('address', res)
							},
							// 拒绝，失败处理
							fail: () => {
								console.log(111);
								uni.showModal({
									title: '提示',
									content: '请在打开的设置中，开启通讯地址',
									success: res => {
										uni.openSetting({})
									}
								})
							}
						})
					}
				})
			},
			// 请求数据
			async query(idsStr) {
				let res = await apiGetGoodslist(idsStr)
				this.goodsList = res.data.message
				// 数组里的对象融合cart
				this.goodsList = this.cart.map(item => {
					let ch = this.goodsList.find(goodItem => {
						return item.goodsId == +goodItem.goods_id
					})
					return { ...item,
						...ch
					}
				})
			},
			// 支付
			pay() {
				// 判断有收货地址
				if (!this.address.userName) {
					uni.showModal({
						title: '提示',
						content: '请先填写收货地址',
						showCancel: false
					})
					return
				}
				let token = uni.getStorageSync('token')
				if (!token) {
					uni.navigateTo({
						url: '../login/login'
					})
					return
				}
				// 创建订单
				this.createOrder()
			},
			// 订单创建
			async createOrder() {
				let consignee_addr = this.getConsigneeAddr()
				// console.log(consignee_addr);
				let goods = this.getOrderGoods()
				// console.log(goods);
				// return
				let data = await createOrders({
					order_price: this.totalPrice,
					consignee_addr,
					goods
				})
				// 删除商品,如果商品详情过来，不删除
				!this.goodsId&&this.arrangeCart()
				this.orderNumber = data.order_number
				// 获取支付参数
				this.doPay()
			},
			// 收货地址
			getConsigneeAddr() {
				return this.address.provinceName + this.address.cityName 
				+ this.address.countyName + this.address.detailInfo+
				' '+ this.address.userName + ' ' + this.address.telNumber
			},
			// 创建订单'参数'
			getOrderGoods(){
				return this.goodsList.map(item=>{
					return {
						goods_id: item.goodsId,
						goods_number: item.num,
						goods_price: item.goods_price
					}
				})
			},
			// 获取请求参数
			async doPay(){
				let res = await getDoPay({
					order_number: this.orderNumber
				})
				// console.log(res);
				// 唤起微信支付
				uni.requestPayment({
					...res.pay,
					success: (res) => {
						uni.showModal({
							title: '提示',
							content: '微信支付成功',
							showCancel: false,
							success: () => {
								// 跳转订单结果页
								uni.navigateTo({
									url: '/pages/order_result/order_result'
								})
							}
						})
					},
					fail: (res) => {
						uni.showModal({
							title: '提示',
							content: '微信支付失败',
							showCancel: false,
							success: () => {
								// 跳转订单结果页
								uni.navigateTo({
									url: '/pages/order_result/order_result?orderNumber=' + this.orderNumber
								})
							}
						})
					}
				})
			},
			//删除storage cart里面选中的商品
			arrangeCart() {
				// 取
				let cart = uni.getStorageSync(CART_KEY) || []
				// 更新
				if(!cart){
					return
				}
				cart = cart.filter(item=>{
					// 取没有选中的
					return !item.checked
				})
				// 存
				uni.setStorageSync(CART_KEY, cart)
			},
		},
		// 计算属性，计算价格
		computed: {
			// 所有选中的商品数量*商品价格之和
			totalPrice() {
				// if(this.goodsId){
					return this.goodsList.reduce((sum, item) => {
						return sum + item.num * item.goods_price
					}, 0)
				// } else {
				// 	return this.goodsList.reduce((sum, item) => {
				// 		return sum + (item.checked ? item.num * item.goods_price : 0)
				// 	}, 0)
				// }
			}
		}
	}
</script>

<style lang="less">
	.address-wrapper {
		background-color: #fff;
	}

	.address {
		display: flex;
		flex-direction: column;
		padding: 44rpx 30rpx 48rpx 20rpx;

		.receiver {
			display: flex;
			justify-content: space-between;
			margin-bottom: 50rpx;
			position: relative;

			.phone-num {
				margin-right: 40rpx;
			}

			.icon-arrow-right {
				position: absolute;
				top: 8rpx;
				right: 0;
				color: #999;
			}
		}
	}

	.choose-address {
		display: flex;
		padding: 44rpx 30rpx 48rpx 20rpx;
		justify-content: space-between;

		.icon-arrow-right {
			color: #999;
		}
	}

	.flower {
		image {
			height: 16rpx;
			width: 100%;
			display: block;
		}
	}

	.goods-item {
		height: 206rpx;
		background-color: #fff;
		border-top: 1rpx solid #ddd;
		display: flex;
		box-sizing: border-box;
		align-items: center;

		image {
			width: 160rpx;
			height: 160rpx;
			margin-left: 30rpx;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin: 0 20rpx 0 18rpx;

			.btm {
				display: flex;
				margin-top: 40rpx;
				justify-content: space-between;

				.price {
					color: #eb4450;

					>text {
						font-size: 24px;
					}
				}

				.goods-num {
					display: flex;
					align-items: center;

					button {
						width: 60rpx;
						height: 50rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 4rpx solid #666;
					}

					text {
						margin: 0 30rpx;
					}
				}
			}
		}
	}

	.goods-list {
		position: absolute;
		bottom: 98rpx;
		top: 243rpx;
		width: 100%;
		overflow: auto;
		padding-bottom: 60rpx;
		background-color: #f4f4f4;
	}

	.bottom-fixed {
		position: absolute;
		height: 98rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #1aad19;
		color: #fff;
		line-height: 98rpx;
		text-align: center;
	}
</style>
