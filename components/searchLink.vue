<template>
	<!-- 搜索组件 -->
	<view class="search-link">
		<view class="inner">
			<icon type="search" size="32rpx" color="#bbb" />
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	// 搜索区域
	.search-link {
		// height: 100rpx;
		background-color: #eb4450;
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
</style>
