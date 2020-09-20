<template>
	<view class="header">
		<input type="text" confirm-type="search" v-model.trim="search_val" @confirm="confirmHandler">
		<icon class="search-icon" type="search" size="16">
		</icon>
		<icon @click="clearInput" class="clear-icon" type="clear" size="16" color="#ccc" v-show="search_val">
		</icon>
	</view>
</template>

<script>
	export default {
		props:['searchVal'],
		data() {
			return {
				search_val: this.searchVal
			}
		},
		watch:{
			searchVal(newVal){
				this.search_val = newVal
			}
		},
		methods: {
			// 清除输入框
			clearInput() {
				this.search_val = ''
			},
			confirmHandler() {
				if(!this.search_val) {
					return
				}
				// emit给父亲
				this.$emit('search', this.search_val)
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		height: 120rpx;
		background-color: #eee;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		input {
			background-color: #fff;
			height: 60rpx;
			width: 720rpx;
			padding-left: 74rpx;
			box-sizing: border-box;
		}

		.search-icon {
			position: absolute;
			left: 44rpx;
		}

		.clear-icon {
			position: absolute;
			right: 44rpx;
			z-index: 100;
			left: auto;
		}
	}
</style>
