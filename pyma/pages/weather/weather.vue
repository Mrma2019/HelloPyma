<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :align="pageInfo?.navAlgin" :title="pageInfo?.navTitle"
			:color="pageInfo?.navColor" , :is-back="pageInfo?.isBack" @sendNavBarHeight="getNavHeight"></uni-nav-bar>
		<scroll-view id="page-content" scroll-y enable-flex>
			<view class="content-wrapper" :style="{marginTop: navigatorHeight + 'px'}">
				<view class="addr-card flex-row">
					<text class="addr">{{weatherStore.location.name}}</text>
					<text class="update_time">{{weatherStore.data.obsTime}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getPageInfo
	} from './index.js';
	import {
		weatherStore
	} from '@/store/weatherStore.js'
	export default {
		data() {
			return {
				pageInfo: {},
				navigatorHeight: 0
			}
		},
		methods: {
			getNavHeight(height) {
				this.navigatorHeight = height
			}
		},
		async onLoad() {
			this.pageInfo = await getPageInfo();
		},
		computed: {
			weatherStore() {
				console.log('天气信息', weatherStore);
				return weatherStore;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar__component {
		background-color: $uni-color-primary;
	}
	
	#page-content{
		background-color: $uni-color-primary;
		
		.content-wrapper{
			color: #fff;
		}
	}
	
	.addr-card{
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		.addr{
			font-size: 40rpx;
		}
	}
</style>