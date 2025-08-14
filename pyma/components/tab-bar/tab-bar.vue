<template>
	<view class="tab-bar flex-row" :style="{paddingBottom: tabBarPaddingBottom + 'px'}">
		<view :class="['tab-item', 'flex-col', {active: item.pagePath === currentPagePath}]"
			v-for="(item, index) in tabList" :key="index" @click="switchTab(index)">
			<icon :class="['iconfont', item.iconfont]"></icon>
			<text class="text">{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	import tabList from "./index.js";

	export default {
		name: "tab-bar",
		data() {
			return {
				tabList: tabList,
				tabBarPaddingBottom: 0,
				tabBarHeight: 0
			};
		},
		created() {
			const sysInfo = uni.getSystemInfoSync();
			this.tabBarPaddingBottom = sysInfo.safeAreaInsets.bottom;
			// console.log(this.tabBarPaddingBottom);
			
			const query = uni.createSelectorQuery().in(this);
			query.select(".tab-bar").boundingClientRect(rect => {
				this.tabBarHeight = rect.height;
				// console.log('tab-bar高度：' + this.tabBarHeight);
				this.$emit("sendTabBarHeight", this.tabBarHeight);
			}).exec();
		},
		computed: {
			currentPagePath() {
				// console.log("获取当前页面");
				const pages = getCurrentPages();
				// console.log(pages);
				const currentPage = pages[pages.length - 1];
				// console.log(currentPage.route);
				return currentPage.route;
			}
		},
		methods: {
			switchTab(index) {
				const url = this.tabList[index].pagePath;
				// console.log("路由：" + url);

				uni.switchTab({
					url: `/${url}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		width: 100%;
		position: fixed;
		bottom: 0;
		justify-content: space-around;
		background-color: #fff;
		box-shadow: 0 2px 8px rgb(0, 0, 0, 0.5);

		.tab-item {
			align-items: center;
			flex: 1;

			.text {
				font-size: 20rpx;
			}
		}

		.active {
			color: $uni-color-primary;
		}
	}
</style>