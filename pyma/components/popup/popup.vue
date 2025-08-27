<template>
	<view :class="['popup', show ? 'show':'']">
		<view class="header flex-row">
			<text @click="close">关闭</text>
		</view>
		<slot name="content"></slot>
	</view>
</template>

<script>
	export default {
		name: "popup",
		data() {
			return {

			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			close() {
				this.$emit('update:show', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		height: 1000rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: #fff;
		border-top-right-radius: 50rpx;
		border-top-left-radius: 50rpx;
		transform: translateY(100%);
		transition: transform 0.3s ease;
	}

	.popup.show {
		transform: translateY(0);
	}
	
	.header{
		width: 100%;
		height: 100rpx;
		padding: 0 50rpx;
		box-sizing: border-box;
		overflow: hidden;
		justify-content: flex-end;
		align-items: center;
		font-weight: bold;
		font-size: 30rpx;
		color: $uni-color-primary;
	}
</style>