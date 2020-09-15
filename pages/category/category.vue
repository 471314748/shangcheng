<template>
	<view>
		<searchLink></searchLink>
		<uni-badge text="1"></uni-badge>
	</view>
</template>

<script>
	import {
		uniBadge
	} from '@dcloudio/uni-ui'
	import searchLink from '@/components/searchLink.vue'
	export default {
		components: {
			uniBadge,
			searchLink
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
