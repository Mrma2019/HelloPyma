<template>
	<view class="content">
		<uni-nav-bar :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin" :color="pageInfo?.navColor"></uni-nav-bar>
		<scroll-view id="page-content" scroll-y>
			<view class="content-wrapper" :style="{marginTop: systemInfo?.navBarHeight + gap + 'px'}">
				<view class="profile-card border-box flex-col">
					<view class="avatar-wrapper flex-row">
						<image class="avatar" src="/static/logo.jpg" mode="widthFix"></image>
						<text class="nickname">PyMa</text>
						<text class="menu-btn iconfont icon-a-xiala2"></text>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-tab-bar></uni-tab-bar>
	</view>
</template>

<script>
	import {
		systemStore
	} from '@/store/systemStore.js';
	import {
		getPageInfo
	} from './index.js';

	export default {
		data() {
			return {
				pageInfo: {},
				gap: 10
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
				console.log('inof', data);
				return {
					navBarHeight: data.navBarHeight
				}
			}
		}
	}
</script>

<style lang="scss">
	$ele-border-radius: 20rpx;

	::v-deep(.nav-bar) {
		background-color: $uni-page-bg-color !important;
	}

	.profile-card {
		width: 95%;
		height: max-content;
		background-color: $uni-color-primary;
		border-radius: $ele-border-radius;
		color: #fff;

		.avatar-wrapper {
			align-items: center;
			padding: 20rpx;
			position: relative;
		}

		.avatar {
			width: 100rpx;
			height: 100rpx;
			margin-left: 20rpx;
			border-radius: $ele-border-radius;
			border: 2px solid #fff;
		}

		.nickname {
			padding-left: 40rpx;
		}

		.menu-btn {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			position: absolute;
			right: 40rpx;
			background-color: #fff;
			border-radius: 50%;
			color: $uni-color-primary;
			text-align: center;
			line-height: 40rpx;
			box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
			transition: transform 0.25s ease-out;
			will-change: transform;

			&:hover {
				transform: scale(1.2);
			}
		}


	}
</style>