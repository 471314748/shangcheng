<template>
	<view class="search_list">
		<view>
			<!-- 头部 -->
			<view class="top-header" :style="{position:isFixed?'fixed':'static'}">

				<!-- <view class="header">
					<icon type="search" size="16" color="#bbb">
					</icon>
					<input type="text" v-model="search_val" @confirm="reload">
				</view> -->
				<searchBar @search="searchHandler" :searchVal="search_val"></searchBar>
				<!-- 过滤菜单 -->
				<view class="filter-menu">
					<view :class="{active:activeIndex===index}" v-for="(item, index) in menuList" :key="index" @click="selectMenu(index)">{{item}}
					</view>
				</view>

			</view>
			<!-- 商品列表 -->
			<view class="goods-list" :style="{marginTop:isFixed?'220rpx':'20rpx'}">
				<view class="goods" v-for="(item, index) in goodsList" :key="index" @click="toItem(item.goods_id)">
					<image :src="item.goods_small_logo" alt="">
						<view class="right">
							<view class="goods-name text-line2">{{item.goods_name}}</view>
							<view class="price">￥<text>{{item.goods_price}}</text>.00</view>
						</view>
				</view>
			</view>
			<!-- 加载完提示 -->
			<view class="btm-line" v-show="isLastPage">
				呜呜呜，真的没有了
			</view>
		</view>
		<!-- 骨架屏 -->
		<!-- <u-skeleton :loading="loading" :animation="true" bg-color="pink"></u-skeleton> -->
	</view>
</template>

<script>
	import {
		getGoodsSearch
	} from '@/api/search.js'
	import searchBar from '@/components/searchBar.vue'
	export default {
		components:{
			searchBar
		},
		data() {
			return {
				// 骨架屏显示
				// loading: true,
				// 标签页
				menuList: ['综合', '销量', '价格'],
				// 数据
				goodsList: [],
				// 默认选中
				activeIndex: 0,
				// 搜索内容
				search_val: '',
				// 页码
				pagenum: 1,
				// 页容量
				PAGE_SISE: 10,
				// 是否请求中
				isRequesting: false,
				// 数据加载完没有
				isLastPage: false,
				// 头部是否定定位
				isFixed: false
			}
		},
		onLoad(options) {
			// console.log(options.catName)
			this.search_val = options.catName
			this.querySearchList()
		},
		methods: {
			// 点击下标
			selectMenu(index) {
				this.activeIndex = index
			},
			// 请求搜索数据
			async querySearchList() {
				uni.showLoading({
					title: '加载中'
				})
				// 如果请求中，不继续请求了
				if (this.isRequesting) {
					return
				}
				this.isRequesting = true
				let res = await getGoodsSearch({
					query: this.search_val,
					pagenum: this.pagenum,
					pagesize: this.PAGE_SISE
				})
				this.isRequesting = false
				this.goodsList = [...this.goodsList, ...res.data.message.goods]
				// console.log(this.goodsList.length, res.data.message.total)
				// 判断加载完没有
				if (this.goodsList.length == res.data.message.total) {
					this.isLastPage = true
				}
				// 关闭加载
				uni.hideLoading()
			},
			// search
			reload() {
				this.pagenum = 1
				this.goodsList = []
				this.querySearchList()
			},
			// 跳转商品详情页面
			toItem(id) {
				uni.navigateTo({
					url: '/pages/item/item?goodsId=' + id
				});
			},
			// 子传父搜索reload对应
			searchHandler(inputVal) {
				this.search_val = inputVal
				this.reload()
			}
		},
		// 下拉生命周期
		onPullDownRefresh() {
			this.isFixed = false
			if (this.isLastPage === true) {
				this.isLastPage = false
			}
			this.reload()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		},
		// 触底生命周期
		onReachBottom() {
			if (this.isLastPage) {
				return
			}
			this.pagenum++
			this.querySearchList()
		},
		// 页面滚动
		onPageScroll() {
			this.isFixed = true
		}
	}
</script>

<style lang="less">
	.header {
		height: 120rpx;
		padding: 30rpx 16rpx;
		box-sizing: border-box;
		background-color: #eee;
		position: relative;

		icon {
			position: absolute;
			top: 48rpx;
			left: 44rpx;
		}

		input {
			height: 60rpx;
			width: 100%;
			border-radius: 4rpx;
			background-color: #fff;
			padding-left: 80rpx;
			box-sizing: border-box;
		}
	}

	.top-header {
		// position: static;
		// top: 88rpx;
		top: 0;
		left: 0;
		// right: 0;
		background-color: #fff;
		z-index: 99;
	}

	.goods-list {
		// margin-top: 220rpx;
	}

	.filter-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;

		view.active {
			color: #EB4450;
		}
	}

	.goods {
		border-top: 1rpx solid #ddd;
		height: 260rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.right {
			flex: 1;
			margin-left: 26rpx;

			.price {
				color: #eb4450;
				font-size: 24rpx;
				margin-top: 80rpx;

				text {
					font-size: 36rpx;
				}
			}
		}
	}

	.btm-line {
		text-align: center;
	}
</style>
