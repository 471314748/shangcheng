<template>
	<view class="category">
		<searchLink></searchLink>
		<view class="u-menu-wrap" v-if="tabbar.length">
			<!-- 左边 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @click="swichMenu(index)">
					<text class="u-line-1">{{item.cat_name}}</text>
				</view>
			</scroll-view>
			<!-- 右边 -->
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="page-view">
						<view class="class-item">
							<!-- 广告图片 -->
							<view class="item-title-img">
								<image src="../../static/images/titleImage.png" mode=""></image>
							</view>
							<!-- 广告下整体 -->
							<block v-for="(item1, index1) in item.children" :key="index1">
								<view class="item-title" v-if="item1.children">
									/<text>{{item1.cat_name}}</text>/
								</view>
								<!-- 右每一项  -->
								<view class="item-container">
									<!-- 小商品 -->
									<view class="thumb-box" v-for="(item2, index2) in item1.children" :key="index2"  @click="toSearchList(item2.cat_name)">
										<image class="item-menu-image" :src="item2.cat_icon" mode=""></image>
										<view class="item-menu-name">{{item2.cat_name}}</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</scroll-view>
			</block>
			<!-- 结束 -->
		</view>
	</view>
</template>

<script>
	import searchLink from "@/components/searchLink.vue"
	import {
		getCategories
	} from "@/api/category.js"
	export default {
		components: {
			searchLink
		},
		data() {
			return {
				tabbar: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		onLoad() {
			this.getCategoriesdata()
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			// 请求数据
			async getCategoriesdata() {
				let res = await getCategories()
				// console.log(res.data.message)
				this.tabbar = res.data.message
			},
			// 点击每一项
			toSearchList(catName) {
				uni.navigateTo({
					url: '/pages/search_list/search_list?catName='+catName,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		// display: flex;
		// position: absolute;
		// left: 0;
		// right: 0;
		// top: 0;
		// bottom: 0;
		// overflow:scroll;
	}

	.u-menu-wrap {
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		top: 100rpx;
		bottom: 0;
		flex: 1;
		// display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 100rpx;
		background: #f4f4f4;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #eb4450;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 6rpx solid #eb4450;
		height: 60rpx;
		left: 0;
		top: 20rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: #fff;
	}

	.page-view {
		padding: 16rpx;
		padding-top: 0;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 8rpx;
	}

	.item-title-img {
		image {
			width: 520rpx;
			height: 180rpx;
		}
	}

	.item-title {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 26rpx;
		color: #e0e0e0;

		text {
			color: #333;
			margin: 0 30rpx;
		}
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
