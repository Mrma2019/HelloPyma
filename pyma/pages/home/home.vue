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
					<view class="weather-card__info flex-col" data-pagepath='/pages/weather/weather'
						@click="navigatorTo">
						<view class="weather-card__icon-row flex-row">
							<icon class="weather-card__weather-icon breath iconfont icon-qingtian"></icon>
							<text class="weather-card__temp">{{weatherCardInfo.temp}}</text>
							<view class="weather-card__time flex-col">
								<icon class="weather-card__temp-icon iconfont icon-sheshidu"></icon>
								<text class="weather-card__time-text">{{formatTime}}</text>
							</view>
						</view>
						<view class="weather-card__info-col flex-col">
							<text>{{weatherCardInfo.text}}</text>
							<text>{{weatherCardInfo.windDir}}</text>
							<text>{{weatherCardInfo.humidity}}</text>
						</view>
					</view>
					<view class="weather-card__date flex-col">
						<view class="title">
							<text>{{weatherCardInfo.dateTitle}}</text>
						</view>
						<view class="date flex-row">
							<view class="date-item" v-for="item, index in formatDate.split(':')" :key="index">
								<text class="text">{{item}}</text>
								<text class="desc">{{ index === 0 ? 'year' : index === 1 ? 'month' : 'day' }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="btn-card flex-row">
					<view class="btn-card__main btn flex-col">
						<text class="text">{{buttonCardInfo.mainBtn.text}}</text>
						<text class="desc">{{buttonCardInfo.mainBtn.desc}}</text>
						<icon :class="['iconfont', buttonCardInfo.mainBtn.icon]"></icon>
					</view>
					<view class="btn-card__box flex-col">
						<view class="btn-card__sub btn flex-col" v-for="item, index in buttonCardInfo.subBtns" :key="index">
							<text class="text">{{item.text}}</text>
							<text class="desc">{{item.desc}}</text>
							<icon :class="['iconfont', item.icon]"></icon>
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
	} from '@/store/weatherStore.js';
	import {
		formatStore
	} from '@/store/formatStore.js'

	export default {
		data() {
			return {
				title: "HelloPyMa",
				algin: "left",
				color: "white",
				navBarHeight: 0,
				swiperHeight: 0,
				contentPanelPaddingBottom: 0,
				buttonCardInfo: {
					mainBtn: {
						text: '立即发布',
						desc: '找搭子',
						icon: 'icon-xunzhao'
					},
					subBtns: [{
						text: '留言板',
						desc: '去留言',
						icon: 'icon-liuyan'
					}, {
						text: '声明',
						desc: '查看',
						icon: 'icon-guanyuapp'
					}]
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
			weatherCardInfo() {
				const weatherInfo = weatherStore.data;
				return {
					temp: weatherInfo.temp,
					text: weatherInfo.text,
					windDir: `${weatherInfo.windDir} ${weatherInfo.windScale}级`,
					humidity: `空气湿度 ${weatherInfo.humidity}`,
					dateTitle: '当前日期 年/月/日'
				}
			},
			formatDate() {
				return formatStore.data.date || "";
			},
			formatTime() {
				return formatStore.data.time || "";
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
	$ele-border-radius: 10rpx;
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

			@media screen and (min-width:768px) {
				height: 200rpx;
			}

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content-panel {
		width: $panel-width;

		.weather-card {
			height: 200rpx;
			justify-content: space-between;
			box-sizing: border-box;
			overflow: hidden;

			.weather-card__info {
				width: max-content;
				position: relative;
				padding: 15rpx 25rpx;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;

				.weather-card__icon-row {
					align-items: flex-end;

					.weather-card__weather-icon {
						font-size: 90rpx;
						color: #E6DB74;
					}

					.weather-card__temp {
						font-size: 60rpx;
					}

					.weather-card__temp-icon {
						font-size: 35rpx;
						font-weight: bold;
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
				padding: 20rpx;
				position: relative;

				.title {
					color: $uni-color-primary;
					font-size: 22rpx;
					margin: 20rpx;
					position: absolute;
					top: 0;
				}

				.date {
					width: 90%;
					justify-content: space-between;

					.date-item {
						width: 28%;
						background-color: $uni-color-primary;
						color: #fff;
						padding: 18rpx 0;
						font-size: 35rpx;
						text-align: center;
						position: relative;

						.desc {
							font-size: 18rpx;
							position: absolute;
							right: 8rpx;
							bottom: 5rpx;
						}
					}
				}
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

		}

		.btn-card {
			height: 250rpx;
			justify-content: space-between;
			background-color: #fff;
			margin-top: $ele-margin;
			border-radius: $ele-border-radius;
			padding: 20rpx;
			box-sizing: border-box;
			overflow: hidden;
			color: #fff;

			.btn {
				position: relative;
				box-sizing: border-box;
				overflow: hidden;
				justify-content: center;
				background-color: $uni-color-primary;
				border-radius: $ele-border-radius;
			}

			.text {
				font-size: 32rpx;
				margin: 0 0 25rpx 40rpx;
			}

			.desc {
				font-size: 20rpx;
				margin: 20rpx 0 0 40rpx;
			}

			.iconfont {
				font-size: 50rpx;
				position: absolute;
				right: 25rpx;
				bottom: 25rpx;
			}

			.btn-card__main {
				width: 49%;
				height: 100%;
			}
			
			.btn-card__box{
				width: 49%;
				height: 100%;
				justify-content: space-between;
				.btn-card__sub{
					width: 100%;
					height: 49%;
					.text{
						margin: 0 0 10rpx 25rpx;
					}
					.desc{
						margin: 0 0 0 25rpx;
					}
				}
			}
		}
	}
</style>