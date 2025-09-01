<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin"
			:color="pageInfo?.navColor"></uni-nav-bar>
		<scroll-view id="page-content" scroll-y>
			<view class="content-wrapper">
				<view class="info-card border-box flex-col" :style="{marginTop: systemInfo?.navBarHeight + gap + 'px'}">
					<view class="info-wrapper flex-col">
						<view class="avatar">
							<image class="item-img" src="/static/logo.jpg" mode="widthFix"></image>
						</view>
						<view class="nickname flex-row">
							<text class="text">昵称：PyMa </text>
							<text class="edit iconfont icon-bianji1"></text>
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
	$avatar-width: 120rpx;

	::v-deep(.nav-bar) {
		background-color: $uni-page-bg-color !important;
	}

	.info-card {
		width: 95%;
		background-color: #fff;
		border-radius: $ele-border-radius;
		color: #fff;
		padding: 20rpx;

		.info-wrapper {
			width: 100%;
			height: 300rpx;
			margin-top: calc(#{$avatar-width} / 2);
			background-color: $uni-color-primary;
			border-radius: $ele-border-radius;
			position: relative;
		}

		.avatar {
			position: absolute;
			top: calc(#{$avatar-width} / -2);
			left: calc(#{$avatar-width} / 2);

			.item-img {
				width: $avatar-width;
				height: $avatar-width;
				border-radius: 50%;
				border: 2px solid #fff;
			}
		}

		.nickname {
			width: 100%;
			height: calc(#{$avatar-width} / 2);
			align-items: flex-end;
			padding: 0 calc(#{$avatar-width}/ 2) 0 calc(#{$avatar-width} * 1.5 + 20rpx);
			font-size: 30rpx;
			box-sizing: border-box;
			position: relative;

			.text {
				flex: 1;
				min-width: 0;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.edit {
			position: absolute;
			right: 20rpx;
		}
	}
</style>