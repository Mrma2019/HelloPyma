<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin"
			:is-back="pageInfo?.isBack" :color="pageInfo?.navColor" @sendNavBarHeight="getNavBarHeight">
		</uni-nav-bar>
		<scroll-view id="page-content" scroll-y refresher-enabled="true">
			<view class="content-wrapper">
				<view class="box flex-row"
					:style="{height: navBarHeight + gap + swiperHeight/2 + 'px', marginBottom: swiperHeight / 2 + 'px'}">
					<swiper class="swiper" :style="{top: navBarHeight + gap + 'px'}">
						<swiper-item v-for="(item, index) in pageInfo?.swiperImageSrc" :key="index">
							<image class="image" :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="content-panel" :style="{paddingBottom: contentPanelPaddingBottom + 'px'} ">
					<view class="weather-card flex-row">
						<view class="weather-card__info flex-col" data-pagepath='/pages/weather/weather'
							@click="navigatorTo">
							<view class="weather-card__icon-row flex-row">
								<text
									:class="['weather-card__weather-icon', 'iconfont', 'qi-' + weatherCardInfo.icon, weatherCardInfo.icon === 100 ? 'rotate':'breath']"></text>
								<text class="weather-card__temp">{{weatherCardInfo.temp}}</text>
								<view class="weather-card__time flex-col">
									<text class="weather-card__temp-icon iconfont icon-sheshidu"></text>
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
								<view class="date-item" v-for="item, index in formatDate.split('-')" :key="index">
									<text class="text">{{item}}</text>
									<text
										class="desc">{{ index === 0 ? 'Year' : index === 1 ? 'Month' : 'Date' }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="btn-card flex-row">
						<view class="btn-card__main btn flex-col">
							<text class="text">{{pageInfo.mainBtn?.text}}</text>
							<text class="desc">{{pageInfo.mainBtn?.desc}}</text>
							<text :class="['iconfont', pageInfo.mainBtn?.icon]"></text>
						</view>
						<view class="btn-card__box flex-col">
							<view class="btn-card__sub btn flex-col" v-for="item, index in pageInfo?.subBtns"
								:key="index">
								<text class="text">{{item.text}}</text>
								<text class="desc">{{item.desc}}</text>
								<text :class="['iconfont', item.icon]"></text>
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
	} from '@/store/weatherStore.js';
	import {
		formatStore
	} from '@/store/formatStore.js';
	import {
		getPageInfo
	} from './index.js';

	export default {
		data() {
			return {
				navBarHeight: 0,
				swiperHeight: 0,
				contentPanelPaddingBottom: 0,
				gap: 10,
				pageInfo: {}
			}
		},

		async onLoad() {
			this.pageInfo = await getPageInfo();

			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select(".swiper").boundingClientRect(rect => {
					this.swiperHeight = rect.height;
					// console.log('swiper的高度', this.swiperHeight);
				}).exec();
			});
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
					dateTitle: '当前日期 年/月/日',
					icon: weatherInfo.icon
				}
			},
			formatDate() {
				return formatStore.data.date || "";
			},
			formatTime() {
				return formatStore.data.time || "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	$panel-width: 95%;
	$ele-border-radius: 20rpx;
	$ele-margin: 20rpx;

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
		margin-top: $ele-margin;
		width: $panel-width;

		.weather-card {
			height: 220rpx;
			justify-content: space-between;
			box-sizing: border-box;
			overflow: hidden;

			.weather-card__info {
				width: 220rpx;
				;
				position: relative;
				padding: 18rpx 28rpx;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;

				.weather-card__icon-row {
					align-items: flex-end;

					.weather-card__weather-icon {
						font-size: 80rpx;
					}

					.weather-card__temp {
						font-size: 60rpx;
						padding-left: 10rpx;
					}

					.weather-card__temp-icon {
						font-size: 32rpx;
					}

					.weather-card__time {
						font-size: 22rpx;
					}
				}

				.weather-card__info-col {
					align-items: center;
					font-size: 22rpx;
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

		}

		.btn-card {
			height: 260rpx;
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

			.btn-card__box {
				width: 49%;
				height: 100%;
				justify-content: space-between;

				.btn-card__sub {
					width: 100%;
					height: 49%;

					.text {
						margin: 0 0 10rpx 25rpx;
					}

					.desc {
						margin: 0 0 0 25rpx;
					}
				}
			}
		}
	}
</style>