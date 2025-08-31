<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin"
			:color="pageInfo?.navColor"></uni-nav-bar>
		<scroll-view id="page-content" scroll-y>
			<view class="content-wrapper">
				<view class="info-card border-box flex-col" :style="{marginTop: systemInfo?.navBarHeight + 'px'}">
					<view class="avatar-wrapper border-box flex-row">
						<image class="avatar" src="/static/logo.jpg" mode="widthFix"></image>
						<view class="nickname border-box flex-col">
							<text class="text">昵称:PyMa</text>
							<view class="edit flex-row" style="align-items: center;">
								<text class="iconfont icon-bianji" style="color: #ddd;"></text>
								<text>编辑资料</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
				pageInfo: {}
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

	.info-card {
		width: 95%;
		height: 250rpx;
		background-color: $uni-color-primary;
		border-radius: $ele-border-radius;
		color: #fff;

		.avatar-wrapper {
			width: 100%;
			margin-top: 35rpx;
			padding: 0 35rpx;
			align-items: center;
		}

		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		.text {
			font-size: 30rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.edit {
			font-size: 20rpx;
		}

		.nickname {
			flex: 1;
			height: 100rpx;
			padding-left: 35rpx;
			justify-content: space-around;
		}
	}
</style>