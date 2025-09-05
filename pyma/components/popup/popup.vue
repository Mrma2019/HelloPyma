<template>
	<template>
		<view>
			<!-- 遮罩 -->
			<view v-if="show" class="overlay" @click="close"></view>
			<!-- 弹窗 -->
			<view :class="['popup-box']" :style="[style]">
				<view class="header border-box flex-row" @touchmove.stop.prevent>
					<view class="drag-bar"></view>
					<text class="iconfont icon-guanbi1" @click="close"></text>
				</view>
				<scroll-view class="content-box" scroll-y>
					<slot></slot>
				</scroll-view>
			</view>
		</view>
	</template>
</template>

<script>
	export default {
		name: "popup",
		data() {
			return {
				translateY: 0
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			height: {
				type: String,
				default: 50
			}
		},
		methods: {
			close() {
				this.$emit('update:show', false);
			}
		},
		computed: {
			style() {
				let translateY = 0;

				if (!this.show) {
					// console.log('show的值', this.show);
					translateY = 100;
				}
				return {
					height: `calc(100vh - (100% - ${this.height}%))`,
					transform: `translateY(${translateY}%)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	$ele-border-radius: 50rpx;
	$header-height: 80rpx;

	.popup-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: #fff;
		border-top-right-radius: $ele-border-radius;
		border-top-left-radius: $ele-border-radius;
		transition: transform 0.3s ease;
		box-shadow: 0 2px 8px rgb(0, 0, 0, 0.5);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3); // 半透明
		backdrop-filter: blur(8px); // 毛玻璃
		-webkit-backdrop-filter: blur(8px); // 兼容 Safari / 微信小程序
		z-index: 999; // 弹窗 z-index: 1000
	}

	.header {
		width: 100%;
		height: $header-height;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: $uni-color-primary;
		position: relative;

		.drag-bar {
			width: 72rpx;
			height: 8rpx;
			background: #ccc;
			border-radius: 4rpx;
			margin: 0 auto;
		}

		.iconfont {
			position: absolute;
			right: calc(#{$header-height} / 2);
		}
	}

	.content-box {
		width: 100%;
		height: calc(100% - #{$header-height});
	}
</style>