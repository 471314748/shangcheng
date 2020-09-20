<template>
	<view class="home">
		<!-- 搜索区域 -->
		<navigator url="/pages/search/search" hover-class="none">
			<searchLink></searchLink>
		</navigator>
		<!-- 轮播图 -->
		<swiper indicator-dots indicator-color="rgba(255,255,255,.5)" indicator-active-color="#fff">
			<swiper-item v-for="(item, index) in swiperdata" :key="index">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav">
			<image v-for="(item,index) in catitems" :key="index" :src="item.image_src" mode=""></image>
		</view>
		<!-- 楼层 -->
		<view class="floor">
			<view v-for="(floor,floorIndex) in floordata" :key="floorIndex" class="floor-item">
				<image :src="floor.floor_title.image_src"></image>
				<view class="product">
					<image :src="floor.product_list[0].image_src" mode=""></image>
					<view class="right">
						<block v-for="(item,index) in floor.product_list" :key="index">
							<image v-if="index" :src="item.image_src" mode=""></image>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import {
		apiGetSwiperdata,
		apiGetCatitems,
		apiGetFloordata
	} from '../../api/home.js'
	import searchLink from '@/components/searchLink.vue'
	export default {
		components: {
			searchLink
		},
		data() {
			return {
				// 轮播图数据
				swiperdata: [],
				// nav导航数据
				catitems: [],
				// 楼层数据
				floordata: []
			}
		},
		onLoad() {
			this.getSwiperdata()
			this.getCatitems()
			this.getFloordata()
		},
		methods: {
			// 轮播图
			async getSwiperdata() {
				// uni.request({
				// 	url: 'https://www.uinav.com/api/public/v1/home/swiperdata',
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		// console.log(res.data.message)
				// 		this.swiperdata = res.data.message
				// 	}
				// })
				let res = await apiGetSwiperdata()
				this.swiperdata = res.data.message
			},
			// nav分类
			async getCatitems() {
				let res = await apiGetCatitems()
				this.catitems = res.data.message
			},
			// 楼层
			async getFloordata() {
				let res = await apiGetFloordata()
				this.floordata = res.data.message
			}
		}
	}
</script>

<style lang="less" scoped>
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
