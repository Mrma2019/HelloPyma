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
					<view class="weather-card__content flex-col" data-pagepath = '/pages/weather/weather' @click="navigatorTo">
						<view class="weather-card__icon-row flex-row">
							<icon class="weather-card__weather-icon iconfont icon-a-1"></icon>
							<text class="weather-card__temp">{{weatherData.temp}}</text>
							<view class="weather-card__time flex-col">
								<icon class="weather-card__temp-icon iconfont icon-wenduji"></icon>
								<text class="weather-card__time-text">{{weatherData.time}}</text>
							</view>
						</view>
						<view class="weather-card__info-col flex-col">
							<text>{{weatherData.desc}}</text>
							<text>{{weatherData.windy}}</text>
							<text>{{weatherData.humidity}}</text>
						</view>
					</view>
					<view class="weather-card__date">

					</view>
				</view>
			</view>
		</scroll-view>
		<uni-tab-bar class="tab-bar__component" @sendTabBarHeight="setContentPanelPaddingBottom" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "HelloPyMa",
				algin: "left",
				color: "white",
				navBarHeight: 0,
				swiperHeight: 0,
				contentPanelPaddingBottom: 0,
				weatherData: {
					"temp": 38,
					"time": "23:15",
					"desc": "晴",
					"windy": "东南风3级",
					"humidity": "空气湿度52"
				}
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
			navigatorTo(e){
				const pagepath = e.currentTarget.dataset.pagepath;
				// console.log(pagepath);
				uni.navigateTo({
					url: `${pagepath}`
				})
			}
		},
		onReady() {
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
				padding: 10px;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;

				.weather-card__icon-row {
					align-items: center;

					.weather-card__weather-icon {
						font-size: 80rpx;
					}

					.weather-card__temp {
						font-size: 50rpx;
						margin: 0 5px;
						font-weight: bold;
					}

					.weather-card__temp-icon {
						font-size: 25rpx;
					}

					.weather-card__time {
						font-size: 20rpx;
					}
				}

				.weather-card__info-col {
					align-items: center;
					font-size: 22rpx;
					font-weight: bold;
				}
			}

			.weather-card__date {
				flex: 1;
				margin-left: $ele-margin;
				background-color: #fff;
				border-radius: $ele-border-radius;
			}
		}
	}
</style>