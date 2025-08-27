<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :align="pageInfo?.navAlgin" :title="pageInfo?.navTitle"
			:color="pageInfo?.navColor" , :is-back="pageInfo?.isBack" @sendNavBarHeight="getNavHeight"></uni-nav-bar>
		<view class="content-wrapper fixed-box" :style="{paddingTop: navigatorHeight + 'px'}">
			<scroll-view id="page-content" scroll-y>
				<view class="content-center flex-col" style="padding-bottom: 100rpx;">
					<view class="addr-card flex-row">
						<view class="flex-row" style="height: 100%; align-items: center;">
							<text class="addr">{{weatherInfo.location?.name || '--'}}</text>
							<text class="date">{{today || '--'}}</text>
						</view>
						<text class="update_time">{{weatherInfo?.updateTime || '--'}}</text>
					</view>
					<view class="temp-card flex-row">
						<view class="flex-row">
							<text class="temp">{{weatherInfo.data?.temp || '--'}}</text>
							<text class="temp-icon iconfont icon-sheshidu"></text>
						</view>
						<text
							:class="['qi-' + weatherInfo.data?.icon, weatherInfo.data?.icon == 100 ? 'roate':'breath']"></text>
						<text class="text">{{weatherInfo.data?.text || '--'}}</text>
					</view>
					<view class="wind-card border-box flex-row">
						<text>{{weatherInfo?.windDir || '--'}}</text>
						<text>|</text>
						<text>{{weatherInfo?.humidity || '--'}}</text>
					</view>
					<view class="indices-card border-box flex-col" v-for="item, index in weatherInfo?.indices"
						:key="index">
						<text>{{item?.name || '--'}}</text>
						<text>{{item?.category || '--'}}</text>
						<text>{{item?.text || '--'}}</text>
					</view>
					<view class="grid-weather__card border-box flex-col">
						<view class="item flex-row" v-for="item, index in weatherInfo?.gridInfo" :key="index">
							<text>{{item.day || '--'}}</text>
							<text :class="['qi-'+item.iconDay]"></text>
							<text>{{item.tempMax || '--'}}</text>
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
	import {
		formatStore
	} from '@/store/formatStore.js';
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
		computed: {
			weatherInfo() {
				const data = weatherStore.data;
				const girdInfo = weatherStore.girdInfo;
				const location = data.location;
				const updateTime = data.obsTime?.match(/\d{2}:\d{2}/)[0] + '更新' || '--';
				const gridInfo = (girdInfo?.daily).map(item => {
					const fd = formatDate(item.fxDate);
					return {
						...item,
						day: fd.day
					}
				});

				const indices = (weatherStore.indices.daily).map(item => {
					return {
						name: `类型：${item?.name}`,
						category: `级别：${item?.category }`,
						text: item.text
					}
				});

				return {
					data,
					location,
					gridInfo,
					indices,
					updateTime,
					windDir: `${data.windDir || ''} ${data.windScale || ''}级`,
					humidity: `空气湿度 ${data.humidity || ''}`
				};
			},
			today() {
				const data = formatStore.data;
				return `(${data.prefix}${data.date})`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	$panel-width: 90%;
	$ele-border-radius: 20rpx;
	$ele-margin: 20rpx;

	.border-box {
		width: $panel-width;
		border-radius: $ele-border-radius;
		box-sizing: border-box;
		overflow: hidden;
		background-color: $uni-color-primary;
		font-size: 30rpx;
		padding: 30rpx 40rpx;
	}

	.content-wrapper {
		color: #fff;
	}

	#page-content {
		background: linear-gradient(to bottom, $uni-color-primary, #e8e8e8);
		box-sizing: border-box;
		overflow: hidden;

		.content-center {
			align-items: center;
		}
	}

	.addr-card {
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

	.temp-card {
		width: $panel-width;
		font-size: 140rpx;
		height: 280rpx;
		justify-content: space-around;
		align-items: center;

		.temp-icon {
			font-size: 35rpx;
		}

		.text {
			font-size: 45rpx;
		}
	}

	.wind-card {
		height: 250rpx;
		justify-content: space-between;
		align-items: center;
		background-color: $uni-color-primary;
		opacity: 0.7;
	}

	.indices-card {
		height: max-content;
		justify-content: center;
		background-color: $uni-color-primary;
		margin: $ele-margin 0;
		line-height: 45rpx;
		opacity: 0.7;
	}

	.grid-weather__card {
		opacity: 0.8;

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

	.footer {
		color: $uni-color-primary;
		font-size: 20rpx;
	}

	//天气图标动画
	.breath {
		animation: breath 2s ease-in-out infinite;
	}

	@keyframes breath {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		50% {
			transform: scale(1.1);
			opacity: 0.6;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.rotate {
		color: #FFC107;
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>