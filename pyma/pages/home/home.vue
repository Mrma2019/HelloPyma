<template>
	<view class="content">
		<uni-nav-bar class="nav-bar__component" :title="title" :algin="algin" :color="color"
			@sendNavBarHeight="getNavBarHeight" />
		<scroll-view id="page-content" scroll-y enable-flex :style="{paddingBottom: scrollViewPaddingBottom + 'px'}">
			<view class="box flex-row" :style="{height: navBarHeight + swiperHeight/2 + 'px'}">
				<swiper class="swiper" :style="{top: navBarHeight + 'px'}">
					<swiper-item>
						<image class="image" src="/static/logo.png" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="panel" :style="{marginTop: swiperHeight/2 + 10 + 'px'}">
				<view>{{scrollViewPaddingBottom}}</view>
				<view v-for="i in 100" :key="i">行号：{{i}}</view>
			</view>
		</scroll-view>
		<uni-tab-bar class="tab-bar__component" @sendTabBarHeight="setScrollViewPaddingBottom"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "HelloPyMa",
				algin: "left",
				color: "white",
				navBarHeight: 0,
				swiperHeight: 0,
				scrollViewPaddingBottom: 0
			}
		},
		methods: {
			getNavBarHeight(height) {
				this.navBarHeight = height;
				// console.log(this.navBarHeight);
			},
			setScrollViewPaddingBottom(height){
				console.log(height);
				this.scrollViewPaddingBottom = height;
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select(".swiper").boundingClientRect(rect => {
				this.swiperHeight = rect.height;
			}).exec();
		}
	}
</script>

<style lang="scss">
	$panel-width: 95%;
	$ele-border-radius: 10px;

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

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.panel {}
</style>