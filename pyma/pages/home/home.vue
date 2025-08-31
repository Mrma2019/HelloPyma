<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="pageInfo?.navTitle" :align="pageInfo?.navAlgin"
			:is-back="pageInfo?.isBack" :color="pageInfo?.navColor" @sendNavBarHeight="getNavBarHeight">
		</uni-nav-bar>
		<scroll-view id="page-content" scroll-y refresher-enabled="true" :refresher-triggered="refresherTriggered"
			@refresherrefresh="onRefresher">
			<view class="content-wrapper">
				<view class="box flex-row"
					:style="{height: navBarHeight + gap + swiperHeight/2 + 'px', marginBottom: swiperHeight / 2 + 'px'}">
					<!-- 轮播图 -->
					<swiper class="swiper" :style="{top: navBarHeight + gap + 'px'}">
						<swiper-item v-for="(item, index) in pageInfo?.swiperImageSrc" :key="index">
							<image class="item" :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="content-panel" :style="{marginBottom: contentPanelPaddingBottom + 'px'} ">
					<view class="info__card border-box flex-row">
						<!-- 天气信息 -->
						<view class="weather-info flex-col" :data-pagepath="pageInfo?.pages?.info_to"
							@click="navigatorTo">
							<view class="flex-row" style="align-items: center;">
								<text
									:class="['item-icon__weather', 'iconfont', 'qi-' + weatherInfo?.icon, weatherInfo?.icon == 100 ? 'rotate':'breath']"></text>
								<text class="item-temp">{{weatherInfo?.temp || '--'}}</text>
								<view class="weather-card__time flex-col">
									<text class="item-icon__temp iconfont icon-sheshidu"></text>
									<text class="item-time">{{time || '--'}}</text>
								</view>
							</view>
							<view class="info-text flex-col">
								<text>{{weatherInfo?.text || '--'}}</text>
								<text>{{weatherInfo?.windDir || '--'}}</text>
								<text>{{weatherInfo?.humidity || '--'}}</text>
							</view>
						</view>
						<!-- 日期 -->
						<view class="date-info flex-col">
							<view class="item-title">
								<text>{{weatherInfo?.dateTitle || '--'}}</text>
							</view>
							<view class="item-date flex-row">
								<view class="date-item" v-for="item, index in date" :key="index">
									<text class="text">{{item['value'] || '--'}}</text>
									<text class="desc">{{item['label']}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 页面跳转 -->
					<view class="btn-card border-box flex-row">
						<view class="main-btn button flex-col" :data-pagepath="pageInfo?.pages?.mainBtn_to"
							@click="navigatorTo">
							<text class="text">{{pageInfo.mainBtn?.text || '--'}}</text>
							<text class="desc">{{pageInfo.mainBtn?.desc || '--'}}</text>
							<text :class="['iconfont', pageInfo.mainBtn?.icon]"></text>
						</view>
						<view class="sub-btn__box flex-col">
							<view class="sub-btn button border-box flex-col" v-for="item, index in pageInfo?.subBtns"
								:key="index" @click="onClick(item)">
								<text class="text">{{item?.text || '--'}}</text>
								<text class="desc">{{item?.desc || '--'}}</text>
								<text :class="['iconfont', item.icon]"></text>
							</view>
						</view>
					</view>
					<!-- 标签页 -->
					<view class="tap-bar border-box">
						<uni-tap-bar class="tap-bar__component" :taps="pageInfo?.taps"></uni-tap-bar>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="btn-post flex-row" :style="{bottom: contentPanelPaddingBottom + 20 + 'px', right: 20 + 'px'}">
			<text class="iconfont icon-fabu-"></text>
		</view>
		<uni-popup v-model:show="is_popup" height="65">
		</uni-popup>
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
				pageInfo: {},
				is_popup: false,
				refresherTriggered: false
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

		onHide() {
			this.is_popup = false;
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
			},
			async onRefresher() {
				this.refresherTriggered = true;
				await this.getData();
				this.refresherTriggered = false;
			},
			getData() {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve();
					}, 1000);
				});
			},
			onClick(item) {
				// console.log('popup');
				if (item.is_popup) {
					this.is_popup = true;
				} else {
					this.is_popup = false;
				}
			}
		},

		computed: {
			weatherInfo() {
				const data = weatherStore.data;
				return {
					temp: data.temp,
					text: data.text,
					windDir: `${data.windDir} ${data.windScale}级`,
					humidity: `空气湿度 ${data.humidity}`,
					dateTitle: '当前日期 年/月/日',
					icon: data.icon
				}
			},
			date() {
				const date = (formatStore.data.date.split('-')).map((item, index) => {
					let label = '';
					switch (index) {
						case 0:
							label = 'Year';
							break;
						case 1:
							label = 'Month';
							break;
						case 2:
							label = 'Date';
							break;
					}
					return {
						value: item,
						label: label
					};
				});
				return date
			},
			time() {
				return formatStore.data.time;
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
				height: 250rpx;
			}

			@media screen and (max-width:375px) {
				height: 280rpx;
			}

			.item {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content-panel {
		margin-top: $ele-margin;
		width: $panel-width;

		.info__card {
			height: 220rpx;
			justify-content: space-between;

			.weather-info {
				width: 220rpx;
				position: relative;
				padding: 18rpx 28rpx;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				color: $uni-color-primary;


				.item-icon__weather {
					font-size: 80rpx;
				}

				.item-temp {
					font-size: 60rpx;
					padding-left: 10rpx;
				}

				.item-icon__temp {
					font-size: 32rpx;
				}

				.item-time {
					font-size: 22rpx;
				}

				.info-text {
					align-items: center;
					font-size: 25rpx;
				}
			}

			.date-info {
				flex: 1;
				margin-left: $ele-margin;
				background-color: #fff;
				border-radius: $ele-border-radius;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 20rpx;
				position: relative;

				.item-title {
					color: $uni-color-primary;
					font-size: 22rpx;
					margin: 20rpx;
					position: absolute;
					top: 0;
				}

				.item-date {
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
		}

		.btn-card {
			height: 260rpx;
			justify-content: space-between;
			background-color: #fff;
			margin-top: $ele-margin;
			border-radius: $ele-border-radius;
			padding: 20rpx;
			color: #fff;

			.button {
				position: relative;
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

			.main-btn {
				width: 49%;
				height: 100%;
			}

			.sub-btn__box {
				width: 49%;
				height: 100%;
				justify-content: space-between;

				.sub-btn {
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

	.btn-post {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: fixed;
		background-color: $uni-color-primary;
		justify-content: center;
		align-items: center;
		font-size: 80rpx;
		color: #fff;
		box-shadow: 0 2px 5px ragb(0, 0, 0, 0.5);
	}

	.tap-bar {
		margin-top: $ele-margin;
		border-radius: $ele-border-radius;
		background-color: #fff;
	}
</style>