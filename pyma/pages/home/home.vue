<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="title" :algin="algin" :color="color"
			@sendNavBarHeight="getNavBarHeight" />
		<scroll-view id="page-content" scroll-y enable-flex>
			<view class="box flex-row" :style="{height: navBarHeight + swiperHeight/2 + 'px'}">
				<swiper class="swiper" :style="{top: navBarHeight + 'px'}">
					<swiper-item>
						<image class="image" src="/static/bg_1.jpg" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="content-panel"
				:style="{marginTop: swiperHeight/2 + 10 + 'px', paddingBottom: contentPanelPaddingBottom + 'px'} ">
				<view class="weather-card flex-row">
					<view class="weather-card__content flex-col" data-pagepath='/pages/weather/weather'
						@click="navigatorTo">
						<view class="weather-card__icon-row flex-row">
							<icon class="weather-card__weather-icon breath iconfont icon-a-1"></icon>
							<text class="weather-card__temp">{{weatherData.temp}}</text>
							<view class="weather-card__time flex-col">
								<icon class="weather-card__temp-icon iconfont icon-wenduji"></icon>
								<text class="weather-card__time-text">{{formatTime}}</text>
							</view>
						</view>
						<view class="weather-card__info-col flex-col">
							<text>{{weatherData.text}}</text>
							<text>{{weatherData.windDir + weatherData.windScale + '级'}}</text>
							<text>{{'空气湿度' + weatherData.humidity}}</text>
						</view>
					</view>
					<view class="weather-card__date flex-col">
						<view class="title">
							<text>日期</text>
						</view>
						<view class="date flex-row">
							<view class="date-item" v-for="item in formatDate.split(':')" key="index">
								<text>{{item}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-tab-bar class="tab-bar__component" @sendTabBarHeight="setContentPanelPaddingBottom" />
	</view>
</template>

<script>
	import {
		weatherStore
	} from '@/store/weather';
	import {
		dateStore
	} from '@/store/date.js'

	export default {
		data() {
			return {
				title: "HelloPyMa",
				algin: "left",
				color: "white",
				navBarHeight: 0,
				swiperHeight: 0,
				contentPanelPaddingBottom: 0
			}
		},
		methods: {
			getNavBarHeight(height) {
				this.navBarHeight = height;
				// console.log(this.navBarHeight);
			},
			setContentPanelPaddingBottom(height) {
				// console.log('首页获取到的tab-bar高度：' + height);
				this.contentPanelPaddingBottom = height;
			},

			//页面跳转
			navigatorTo(e) {
				const pagepath = e.currentTarget.dataset.pagepath;
				// console.log(pagepath);
				uni.navigateTo({
					url: `${pagepath}`
				});
				console.log(this.weatherData);
			}
		},

		computed: {
			weatherData() {
				return weatherStore.data || {};
			},
			formatDate() {
				return dateStore.date || {};
			},
			formatTime() {
				return dateStore.time || {};
			}
		},

		onLoad() {
			const query = uni.createSelectorQuery().in(this);
			query.select(".swiper").boundingClientRect(rect => {
				this.swiperHeight = rect.height;
			}).exec();
		}
	}
</script>

<style lang="scss">
	$panel-width: 95%;
	$ele-border-radius: 10px;
	$ele-margin: 10px;

	.box {
		width: 100%;
		justify-content: center;
		background-color: $uni-color-primary;
		flex-shrink: 0;

		.swiper {
			position: relative;
			width: $panel-width;
			border-radius: $ele-border-radius;
			overflow: hidden;

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content-panel {
		width: $panel-width;

		.weather-card {
			justify-content: space-between;

			.weather-card__content {
				width: max-content;
				position: relative;
				padding: 15px;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;

				.weather-card__icon-row {
					align-items: center;

					.weather-card__weather-icon {
						font-size: 90rpx;
					}

					.weather-card__temp {
						font-size: 60rpx;
					}

					.weather-card__temp-icon {
						font-size: 25rpx;
					}

					.weather-card__time {
						font-size: 22rpx;
					}
				}

				.weather-card__info-col {
					align-items: center;
					font-size: 23rpx;
				}
			}

			.weather-card__date {
				flex: 1;
				margin-left: $ele-margin;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 10px;
				position: relative;

				.title {
					color: $uni-color-primary;
					font-size: 22rpx;
					padding: 20rpx;
					position: absolute;
					top: 0;
				}

				.date {
					.date-item {
						background-color: $uni-color-primary;
						color: #fff;
						padding: 20rpx;
						margin: 0 10rpx;
						font-size: 35rpx;
					}
				}
			}

			//天气图标动画
			.breath {
				animation: breath 2s ease-in-out infinite;
			}

			@keyframes breath {
				0% {
					opacity: 1;
				}

				50% {
					opacity: 0.6;
				}

				100% {
					opacity: 1;
				}
			}

		}
	}
</style>