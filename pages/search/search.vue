<template>
	<view class="wrapper">
		<SearchBar @search="searchHandler" />
		<view class="history-search">
			<view class="title">
				<text class="title">历史搜索</text>
				<icon type="clear" size="18" @click="clearHistoryList">
				</icon>
			</view>
			<view>
				<view v-for="(item, index) in keywordList" :key="index" @click="toSerachList(item)">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchBar from '@/components/searchBar'
	const KEYWORD_LIST = 'keyword_list'
	export default {
		components: {
			SearchBar
		},
		data() {
			return {
				// 搜索值
				keywordList: [],
			}
		},
		onShow() {
			this.keywordList = uni.getStorageSync(KEYWORD_LIST) || []
		},
		methods: {
			// 跳转搜索列表页面
			searchHandler(val) {
				let _keywordList = [...new Set([val, ...this.keywordList])]
				console.log(_keywordList)
				uni.setStorageSync(KEYWORD_LIST, _keywordList)
				uni.navigateTo({
					url: '/pages/search_list/search_list?catName=' + val
				})
			},
			// 点击搜索历史
			toSerachList(item) {
				this.searchHandler(item)
			},
			// 清空搜索历史
			clearHistoryList() {
				uni.showModal({
					title: '提示',
					content: '是否清空搜索历史？',
					success: res => {
						if (res.confirm) {
							this.keywordList = []
							uni.removeStorageSync(KEYWORD_LIST)
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.search {
		background-color: #eee;
		padding: 30rpx 15rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		position: relative;

		icon {
			position: absolute;
			top: 50rpx;
			left: 38rpx;
		}

		input {
			height: 60rpx;
			flex: 1;
			background-color: #fff;
			padding-left: 70rpx;
			box-sizing: border-box;
			border-radius: 4rpx;
		}

		button {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 8rpx;
			font-size: 28rpx;
			border: 1rpx solid #bfbfbf;
			background-color: #eee;
			margin-left: 20rpx;
		}
	}

	.history-search {
		color: #333;
		font-size: 28rpx;
		padding: 30rpx 30rpx 30rpx 15rpx;

		.title {
			display: flex;
			justify-content: space-between;
		}

		view {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;

			view {
				height: 64rpx;
				line-height: 64rpx;
				padding: 0 26rpx;
				background-color: #ddd;
				margin: 0 30rpx 16rpx 0;
			}
		}
	}
</style>
