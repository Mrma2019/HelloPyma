<template>
	<view class="tap-bar flex-col">
		<view class="tap-list flex-row">
			<view :class="['item', 'flex-row', currentIndex === index ? 'active':'']" v-for="item, index in taps"
				:key="index" @click="onClick(index)">
				<text>{{item.name}}</text>
			</view>
		</view>
		<swiper class="content-panel" :current="currentIndex" @change="onChange" :style="{height: swiperHeight + 'px'}"
			indicator-dots="{{false}}">
			<swiper-item v-for="(tab, tabIndex) in taps" :key="tabIndex">
				<view class="tab-content" ref="tabContents">
					<view class="item flex-row" v-for="(item, index) in tab.list" :key="index" @click="navigatorTo">
						<text :class="['iconfont', item.icon]"></text>
						<view class="flex-col">
							<text class="text">{{item.text}}</text>
							<text class="desc">{{item.desc}}</text>
						</view>
						<text class="enter iconfont icon-jinru"></text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "tap-bar",
		data() {
			return {
				currentIndex: 0,
				swiperHeight: 0
			};
		},
		props: {
			taps: {
				type: Array,
				default: () => []
			}
		},
		mounted() {
			this.setSwiperHeight(this.currentIndex)
		},
		methods: {
			onClick(index) {
				this.currentIndex = index;
				this.$nextTick(() => {
					this.setSwiperHeight(index)
				})
			},
			onChange(e) {
				const index = e.detail.current;
				this.currentIndex = index;
				this.$nextTick(() => {
					this.setSwiperHeight(index)
				})
			},
			setSwiperHeight(index) {
				// 选择对应 tab 的内容节点，获取高度
				uni.createSelectorQuery().in(this).selectAll('.tab-content').boundingClientRect((rects) => {
					if (rects[index]) {
						this.swiperHeight = rects[index].height
					}
				}).exec()
			},
			navigatorTo() {}
		}
	}
</script>

<style lang="scss" scoped>
	$ele-padding: 20rpx;

	.tap-bar {
		color: $uni-color-primary;
	}

	.tap-list {
		width: 100%;
		height: 70rpx;
		align-items: center;
		padding: 0 $ele-padding;

		.item {
			height: 100%;
			align-items: center;
			margin: 0 10rpx;
		}
	}

	.content-panel {
		// height: max-content;
		padding: 0 $ele-padding;
		font-weight: normal !important;

		.swiper-item {
			height: max-content;
		}

		.item {
			width: 100%;
			border-bottom: 1px solid #eee;
			position: relative;
			align-items: center;
			padding: 15rpx 0;

			&:last-child {
				border-bottom: none;
			}
		}

		.iconfont {
			font-size: 70rpx;
			padding: 0 $ele-padding;
		}

		.text {
			font-size: 32rpx;
			font-weight: bold;
		}

		.desc {
			font-size: 24rpx;
			color: #aaa;
		}

		.enter {
			position: absolute;
			right: 0;
			font-size: 32rpx !important;
		}
	}

	.active {
		border-bottom: 6rpx solid $uni-color-primary;
	}
</style>