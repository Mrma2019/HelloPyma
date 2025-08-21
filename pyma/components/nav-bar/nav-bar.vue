<template>
	<view class="nav-bar flex-row" :style="{height: navBarHeight + 'px', justifyContent: algin, color: color}">
		<text class="title" :style="{bottom: titleBottom + 'px', maxWidth: 'calc(100% - ' + menuWidth + 'px)'}">{{title}}</text>
	</view>
</template>

<script>
	export default {
		name: "nav-bar",
		data() {
			return {
				navBarHeight: 0,
				titleBottom: 0,
				menuWidth: 0
			};
		},
		props: {
			title: String,
			algin: String,
			color: String
		},
		created() {
			const sysInfo = uni.getWindowInfo();
			const menuInfo = uni.getMenuButtonBoundingClientRect();

			this.navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
			// console.log('导航栏高度：' + this.navBarHeight);
			this.titleBottom = menuInfo.top - sysInfo.statusBarHeight;
			//获取胶囊的宽度
			this.menuWidth = menuInfo.width + 20;
			
			this.$emit("sendNavBarHeight", this.navBarHeight);
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		width: 100%;
		background-color: $uni-color-primary;
		box-sizing: border-box;
		padding: 0 10px;
		font-weight: bold;
		font-size: 18px;
		position: fixed;
		top: 0;
		z-index: 999;

		.title {
			position: absolute;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>