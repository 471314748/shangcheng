<template>
	<view class="home">
		<!-- 搜索区域 -->
		<view class="search-link">
			<view class="inner">
				<icon type="search" size="32rpx" color="#bbb" />
				<text>搜索</text>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots indicator-color="rgba(255,255,255,.5)" indicator-active-color="#fff">
			<swiper-item v-for="item in 4">
				<image src="http://157.122.54.189:9090/pyg/banner1.png"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav">
			<image v-for="item in 4" src="http://157.122.54.189:9090/pyg/icon_index_nav_4@2x.png" mode=""></image>
		</view>
		<!-- 楼层 -->
		<view class="floor">
			<view v-for="item in 4" class="floor-item">
				<image src="http://157.122.54.189:9090/pyg/pic_floor01_title.png"></image>
				<view class="product">
					<image src="http://157.122.54.189:9090/pyg/pic_floor01_1@2x.png" mode=""></image>
					<view class="right">
						<image v-for="item in 4" src="http://157.122.54.189:9090/pyg/pic_floor01_2@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	// 搜索区域
	.search-link {
		// height: 100rpx;
		background-color: red;
		padding: 20rpx 16rpx;

		.inner {
			background-color: #fff;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				color: #bbb;
				margin-left: 16rpx;
			}
		}
	}

	// 轮播图
	swiper {
		height: 340rpx;
		width: 100%;

		image {
			width: 100%;
		}
	}

	// 分类
	.nav {
		display: flex;
		justify-content: space-around;
		padding: 27rpx 0;

		image {
			width: 120rpx;
			height: 140rpx;
		}
	}

	// 楼层
	.floor {
		.floor-item {
			>image {
				height: 88rpx;
				width: 100%;
			}

			.product {
				display: flex;
				padding: 20rpx 17rpx;

				>image {
					width: 232rpx;
					height: 386rpx;
				}

				.right {
					flex: 1;
					display: flex;
					flex-wrap: wrap;

					image {
						width: 232rpx;
						height: 188rpx;
						margin: 0 0 10rpx 10rpx;
					}
				}
			}
		}
	}
	// 
</style>
