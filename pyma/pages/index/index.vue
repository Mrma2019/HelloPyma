<template>
	<view class="content">
		<view class="logo-wrapper">
			<image class="logo" src="/static/logo.jpg"></image>
		</view>
		<view>
			<text class="app-name">{{appName}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		watch
	} from 'vue';
	import {
		weatherStore
	} from '@/store/weatherStore.js'

	const appName = 'HelloPyma'
	const pagepath = '/pages/home/home'
	watch(() => weatherStore.loading, (newVal) => {
		if (!newVal) {
			uni.switchTab({
				url: `${pagepath}`
			});
		}
	});
</script>


<style lang="scss" scoped>
	.content {
		justify-content: center;
		align-items: center;

		.logo-wrapper {
			width: 120rpx;
			height: 120rpx;
			position: relative;
			border-radius: 50%;

			.logo {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				display: block;
				object-fit: cover;
			}

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 3px solid #aaa;
				border-top: 3px solid $uni-color-primary;
				border-radius: 50%;
				box-sizing: border-box;
				animation: spin 1s linear infinite;
			}
		}

		.app-name {
			margin-top: 20rpx;
			font-size: 25rpx;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>