<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :align="pageInfo?.navAlgin" :title="pageInfo?.navTitle"
			:color="pageInfo?.navColor" , :is-back="pageInfo?.isBack" @sendNavBarHeight="getNavHeight"></uni-nav-bar>
		<view class="content-wrapper fixed-box" :style="{paddingTop: navigatorHeight + 'px'}">
			<scroll-view id="page-content" class="border-box" scroll-y>
				<view class="content-center flex-col" style="padding-bottom: 100rpx;">
					<view class="location flex-row">
						<view class="flex-row" style="height: 100%; align-items: center;">
							<text class="addr">{{weatherInfo.location?.name || '--'}}</text>
							<text class="date">{{date || '--'}}</text>
						</view>
						<text class="update_time">{{weatherInfo?.updateTime || '--'}}</text>
					</view>
					<view class="now-info flex-row">
						<view class="flex-row">
							<text class="temp">{{weatherInfo?.temp || '--'}}</text>
							<text class="temp-icon iconfont icon-sheshidu"></text>
						</view>
						<text :class="['qi-' + weatherInfo?.icon, weatherInfo?.icon == 100 ? 'rotate':'breath']"></text>
						<text class="text">{{weatherInfo?.text || '--'}}</text>
					</view>
					<view class="info__card card border-box flex-row">
						<view class="item flex-col">
							<text class="desc">风速</text>
							<text class="icon qi-1080"></text>
							<text class="text">{{weatherInfo?.windSpeed}}</text>
						</view>
						<view class="item flex-col">
							<text class="desc">云量</text>
							<text class="icon qi-509"></text>
							<text class="text">{{weatherInfo?.cloud}}</text>
						</view>
						<view class="item flex-col">
							<text class="desc">体感温度</text>
							<text class="icon qi-2396"></text>
							<text class="text">{{weatherInfo?.feelsLike}}</text>
						</view>
					</view>
					<view class="grid-info__card card border-box flex-col">
						<view class="item flex-row" v-for="item, index in weatherInfo?.gridInfo" :key="index">
							<text>{{item.day || '--'}}</text>
							<text>
								<text :class="['qi-'+item.iconDay]"></text>
								<text style="margin-left: 8rpx;">{{item.textDay}}</text>
							</text>
							<text>{{item.tempMax || '--'}}</text>
						</view>
					</view>
					<view class="indices__card card border-box flex-row">
						<view class="flex-col" style="justify-content: center; align-items: center;">
							<text class="item-name">{{weatherInfo?.indices?.name || '--'}}</text>
							<text class="iconfont icon-tab-height"></text>
						</view>
						<view class="flex-col"
							style="flex: 1; justify-content: center; align-items: flex-start; padding-left: 40rpx;">
							<text class="item-category">{{weatherInfo?.indices?.category || '--'}}</text>
							<text class="item-text">{{weatherInfo?.indices?.text || '--'}}</text>
						</view>
					</view>
					<view class="footer">
						<text>{{footer}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		weatherStore
	} from '@/store/weatherStore.js';
	// import {
	// 	formatStore
	// } from '@/store/formatStore.js';
	import {
		getPageInfo
	} from './index.js';
	import {
		formatDate
	} from '@/utils/format.js'

	export default {
		data() {
			return {
				pageInfo: {},
				navigatorHeight: 0,
				footer: '数据来源：和风天气Api',
				date: '2025-08-31 周五'
			}
		},
		methods: {
			getNavHeight(height) {
				this.navigatorHeight = height;
			}
		},
		async onLoad() {
			this.pageInfo = await getPageInfo();
		},

		onShow() {
			console.log(this.date);
		},
		computed: {
			weatherInfo() {
				const data = weatherStore.data;
				const gridInfo = (weatherStore.girdInfo?.daily).map(item => {
					const fd = formatDate(item.fxDate);
					return {
						...item,
						day: fd.day
					}
				});
				// console.log(gridInfo);

				const indices = weatherStore.indices.daily[0];
				// console.log(indices);

				return {
					gridInfo,
					indices,
					icon: data?.icon || '--',
					temp: data?.temp || '--',
					text: data?.text || '--',
					location: data?.location || '--',
					updateTime: data.obsTime?.match(/\d{2}:\d{2}/)[0] + '更新' || '--',
					cloud: `${data?.cloud || '--'}%`,
					windSpeed: `${data?.windSpeed || '--'}Km/h`,
					feelsLike: `${data?.feelsLike || '--'}℃`
				};
			},
			// date() {
			// 	const data = formatStore.store.data;
			// 	return `(${data.prefix}${data.date} ${data.day})`;
			// }
		}
	}
</script>

<style lang="scss" scoped>
	$panel-width: 90%;
	$ele-border-radius: 20rpx;
	$ele-margin: 20rpx;

	.content-wrapper {
		color: #fff;
	}

	.card {
		width: $panel-width;
		border-radius: $ele-border-radius;
		background-color: $uni-color-primary;
		font-size: 30rpx;
		padding: 30rpx 40rpx;
	}

	#page-content {
		background: linear-gradient(to bottom, $uni-color-primary, #e8e8e8);

		.content-center {
			align-items: center;
		}
	}

	.location {
		width: $panel-width;
		height: 80rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		overflow: hidden;

		.addr {
			font-size: 40rpx;
		}

		.date {
			margin-left: 20rpx;
			font-size: 25rpx;
		}

		.update_time {
			font-size: 30rpx;
		}
	}

	.now-info {
		width: $panel-width;
		height: 280rpx;
		font-size: 140rpx;
		justify-content: space-around;
		align-items: center;

		.temp-icon {
			font-size: 35rpx;
		}

		.text {
			font-size: 45rpx;
		}
	}

	.info__card {
		justify-content: space-between;
		align-items: center;
		background-color: $uni-color-primary;
		opacity: 0.7;

		.item {
			align-items: center;

			.desc {
				font-size: 30rpx;
			}

			.icon {
				font-size: 100rpx;
				font-weight: normal !important;
			}

			.text {
				font-size: 30rpx;
			}
		}
	}

	.grid-info__card {
		opacity: 0.8;
		margin: $ele-margin 0;

		.item {
			height: 80rpx;
			justify-content: space-around;
			align-items: center;

			border-bottom: 1px solid #fff;

			&:last-child {
				border-bottom: none;
			}
		}
	}

	.indices__card {
		justify-content: flex-start;
		align-items: center;
		background-color: $uni-color-primary;
		opacity: 0.8;

		.item-name {
			padding: 20rpx 0;
			font-size: 30rpx;
		}

		.iconfont {
			font-size: 100rpx;
		}
	}

	.footer {
		color: $uni-color-primary;
		font-size: 20rpx;
		padding: 20rpx 0;
	}
</style>