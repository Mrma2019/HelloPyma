<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="title" :algin="algin" :color="color"
			@sendNavBarHeight="getNavBarHeight" />
		<scroll-view id="page-content" scroll-y enable-flex>
			<view class="box flex-row" :style="{height: navBarHeight + swiperHeight/2 + 'px'}">
				<swiper class="swiper" :style="{top: navBarHeight + 'px'}">
					<swiper-item>
						<image class="image" src="/static/logo.png" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="content-panel"
				:style="{marginTop: swiperHeight/2 + 10 + 'px', paddingBottom: contentPanelPaddingBottom + 'px'} ">
				<view class="weather-placard__panel flex-row">
					<view class="weather flex-col">
						<uni-overlay></uni-overlay>
						<view class="icon-part flex-row">
							<icon class="weather-icon iconfont icon-a-1"></icon>
							<text class="temp">{{weatherData.temp}}</text>
							<view class="time flex-col">
								<icon class="temp-icon iconfont icon-wenduji"></icon>
								<text class="time-text">{{weatherData.time}}</text>
							</view>
						</view>
						<view class="info-part flex-col">
							<text>{{weatherData.desc}}</text>
							<text>{{weatherData.windy}}</text>
							<text>{{weatherData.humidity}}</text>
						</view>
					</view>
					<view class="placard">

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
					"windy": "東南風3級",
					"humidity":"空氣濕度52"
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

		.weather-placard__panel {
			justify-content: space-between;

			.weather {
				width: max-content;
				position: relative;
				padding: 10px;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;

				.icon-part {
					align-items: center;

					.weather-icon {
						font-size: 80rpx;
					}

					.temp {
						font-size: 50rpx;
						margin: 0 5px;
					}

					.temp-icon {
						font-size: 25rpx;
					}

					.time {
						font-size: 20rpx;
					}
				}
				
				.info-part{
					align-items: center;
					font-size: 22rpx;
				}
			}

			.placard {
				flex: 1;
				margin-left: $ele-margin;
				background-color: #fff;
				border-radius: $ele-border-radius;
			}
		}
	}
</style>