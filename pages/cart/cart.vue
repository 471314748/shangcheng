<template>
	<view class="content">
		<view class="title">
			<text class="iconfont icon-shop"></text>
			<text>优购生活馆</text>
			<!-- <text>---&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---</text> -->
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="item.goodsId" @click="toItem(item.goodsId)">
				<text class="iconfont" :class="item.checked?'icon-check':'icon-unchecked'" @click.stop="toggleCheck(item)"></text>
				<image :src="item.goods_small_logo" alt="" />
				<view class="right">
					<text class="text-line2">{{item.goods_name}}</text>
					<view class="btm">
						<text class="price">￥<text>{{item.goods_price}}</text>.00</text>
						<view class="goods-num">
							<!-- <button>-</button>
							<text>{{item.num}}</text>
							<button>+</button> -->
							<u-number-box disabled-input v-model="item.num" @change="valChange(item,index)"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="account">
			<view class="select-all">
				<view @click="toggleAll">
					<text class="iconfont" :class="isAll?'icon-check':'icon-unchecked'"></text>
					<text>全选</text>
				</view>
				<view class="price-wrapper">
					<view class="price">
						<text>合计:<text class="num">￥{{totalPrice}}.00</text></text>
						<view>
							<text class="info">包含运费</text>
						</view>
					</view>
					<view class="account-btn" @click="toPay">结算({{totalNum}})</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiGetGoodslist
	} from '../../api/item.js'

	const CART_KEY = 'cart'

	export default {
		data() {
			return {
				goodsList: [],
				cart: []
			}
		},
		onShow() {
			// console.log(6666);
			// 请求本地数据status
			this.cart = uni.getStorageSync(CART_KEY) || []
			if(this.cart.length>0){
				uni.setTabBarBadge({
					index: 2,
					text: this.cart.length+''
				})
			} else{
				uni.removeTabBarBadge({
					index: 2
				})
			}
			if(!this.cart){
				return
			}
			let idsArr = this.cart.map(item => {
				return item.goodsId
			})
			let idsStr = idsArr.join(',')
			// console.log(idsStr);
			this.query(idsStr)
		},
		methods: {
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
			// 跳商品详情
			toItem(goodsId) {
				uni.navigateTo({
					url: '/pages/item/item?goodsId=' + goodsId
				})
			},
			// 商品复选框点击勾选/不勾选
			toggleCheck(item) {
				// console.log(item.checked);
				item.checked = !item.checked
			},
			// 全选图标勾选/不勾选
			toggleAll() {
				this.isAll = !this.isAll
			},
			// 输入框改变触发
			valChange(item, index) {
				if (item.num < 1) {
					uni.showModal({
						title: '提示',
						content: '你确认要删除商品吗？',
						success: res => {
							if (res.confirm) {
								// 删除数据
								this.goodsList.splice(index, 1)
							} else if (res.cancel) {
								// this.goodsList[index].num = 1
								let change = this.goodsList[index]
								change.num = 1
								console.log(change);
								this.$set(this.goodsList, index, change)
							}
						},
					});
				}
			},
			// 结算，跳支付页面
			toPay(){
				// 五数量，提示
				if(!this.totalNum){
					uni.showToast({
						title: '请选择点商品吧',
					})
					return
				}
				// 未登录，跳登录
				if(!uni.getStorageSync('userInfo')){
					uni.navigateTo({
						url: '../login/login'
					})
				}
				// 一切正常跳转
				uni.navigateTo({
					url: '../pay/pay'
				})
			}
		},
		computed: {
			// 全选
			isAll: {
				// 依赖发送改变
				get() {
					return this.goodsList.every(item => {
						return item.checked
					})
				},
				// isAll改变
				set(status) {
					console.log('55'.status);
					this.goodsList.forEach(item => {
						item.checked = status
					})
				}
			},
			// 数量总和
			totalNum() {
				return this.goodsList.reduce((sum, item) => {
					return sum + (item.checked ? item.num : 0)
				}, 0)
			},
			// 所有选中的商品数量*商品价格之和
			totalPrice() {
				return this.goodsList.reduce((sum, item) => {
					return sum + (item.checked ? item.num * item.goods_price : 0)
				}, 0)
			}
		},
		// 监听器
		watch: {
			goodsList: {
				handler(newValue) {
					console.log('改变', newValue);
					// this.cart = uni.getStorageSync(CART_KEY) || []
					let cart = this.goodsList.map(item => {
						return {
							goodsId: item.goodsId,
							num: item.num,
							checked: item.checked
						}
					})
					uni.setStorageSync(CART_KEY, cart)
				},
				deep: true
			}
		}
	}
</script>

<style lang="less">
	.iconfont {
		font-size: 44rpx;
	}

	.title {
		height: 88rpx;
		display: flex;
		align-items: center;

		.iconfont {
			color: #999;
			margin: 6rpx 12rpx 0 32rpx;
		}
	}

	.goods-item {
		height: 206rpx;
		background-color: #fff;
		border-top: 1rpx solid #ddd;
		display: flex;
		box-sizing: border-box;
		align-items: center;

		.iconfont {
			color: #eb4450;
			margin: 0 30rpx;
		}

		image {
			width: 160rpx;
			height: 160rpx;
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
					display: flex;

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
		top: 88rpx;
		width: 100%;
		overflow: auto;
		padding-bottom: 60rpx;
		background-color: #f4f4f4;
	}

	.account {
		height: 98rpx;
		border-bottom: 1rpx solid #ddd;
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		align-items: center;

		.iconfont {
			color: #eb4450;
			margin: 0 30rpx;
		}

		.account-btn {
			width: 230rpx;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			background-color: #eb4450;
		}

		.select-all {
			flex: 1;
			display: flex;
			align-items: center;

			.price-wrapper {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;
			}
		}

		.price {
			margin-right: 20rpx;

			.num {
				color: #eb4450;
			}

			.info {
				color: #999;
			}
		}
	}
</style>
