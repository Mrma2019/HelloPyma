<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin"
			:color="pageInfo?.navColor"></uni-nav-bar>
		<uni-tab-bar />
	</view>
</template>

<script>
	import {
		systemStore
	} from '@/store/systemStore.js';
	import {
		getPageInfo
	} from './index.js'

	export default {
		data() {
			return {
				pageInfo: {},
				navBarHeight: 0
			}
		},
		methods: {

		},
		async mounted() {
			this.pageInfo = await getPageInfo();
		},
		computed: {
			systemInfo() {
				const data = systemStore.data;
				console.log(data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar__component {
		background-color: #f8f8f8 !important;
	}
</style>