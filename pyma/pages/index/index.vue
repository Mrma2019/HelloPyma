<template>
	<view class="content">
		<view class="logo-wrapper">
			<image class="logo" :src="pageInfo.logo"></image>
		</view>
		<view>
			<text class="app-name">{{pageInfo.appName}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		watch,
		ref
	} from 'vue';
	import {
		weatherStore
	} from '@/store/weatherStore.js';
	import {
		getPageInfo
	} from './index.js'

	const pageInfo = ref({});

	onMounted(async () => {
		pageInfo.value = await getPageInfo();
	})
	watch(() => weatherStore.loading, (newVal) => {
		if (!newVal) {
			setTimeout(() => {
				uni.switchTab({
					url: pageInfo.value.pagepath
				});
			}, 1000)
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
			margin-top: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: $uni-color-primary;
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