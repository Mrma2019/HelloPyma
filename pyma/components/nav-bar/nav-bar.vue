<template>
	<view class="nav-bar border-box flex-row"
		:style="{height: navBarHeight + 'px', paddingBottom: navBarHeight - menuInfo.bottom + 'px', color: color}">
		<view class="title-wrapper flex-row"
			:style="{height: menuInfo.height + 'px', paddingLeft: titlePaddingLeft + 'px'}">
			<text class="iconfont icon-fanhui1" v-if="isBack" @click="goBack"></text>
			<text class="title" :style="[titleStyle, {lineHeight: menuInfo.height + 'px'}]">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "nav-bar",
		data() {
			return {
				navBarHeight: 0,
				titlePaddingBottom: 0,
				titlePaddingLeft: 15,
				menuInfo: {},
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			align: {
				type: String,
				default: 'center'
			},
			isBack: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: '#000'
			}
		},
		mounted() {
			const sysInfo = uni.getWindowInfo();
			const menuInfo = uni.getMenuButtonBoundingClientRect();
			this.menuInfo = menuInfo;

			this.navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
			// console.log('导航栏高度：' + this.navBarHeight);
			this.titlePaddingBottom = menuInfo.top - sysInfo.statusBarHeight;
			//获取胶囊的宽度
			this.$emit("sendNavBarHeight", this.navBarHeight);
		},
		computed: {
			titleStyle() {
				const menuWidth = this.menuInfo.width + 10;

				if (this.align == 'left') {
					return {
						textAlign: this.align,
						left: this.titlePaddingLeft + 5 + 'px',
						right: menuWidth + 'px'
					}
				} else {
					return {
						textAlign: this.align,
						left: menuWidth + 'px',
						right: menuWidth + 'px'
					}
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		width: 100%;
		background-color: $uni-color-primary;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		align-items: flex-end;
		font-size: 32rpx;

		@media screen and (min-width: 768px) {
			font-size: 22rpx;
		}

		.title-wrapper {
			width: 100%;
			align-items: center;
			position: relative;

			.title {
				position: absolute;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>