<script>
	import {
		weatherStore
	} from '@/store/weather.js';
	import {
		dateStore
	} from '@/store/date.js';

	export default {
		globalData: {
			key: 'd2885a769f0a4646b8c934f5fdef054f'
		},

		onLaunch: function() {
			console.log('App Launch');

			//天气
			this.getWeatherInfo();
			setInterval(() => {
				this.getWeatherInfo();
			}, 60 * 60 * 1000);
			
			setInterval(()=>{
				this.formatDate();
			}, 600)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

			getWeatherInfo() {
				uni.getLocation({
					type: 'gcj02', // 返回国测局坐标，可用于 wx.openLocation
					success: (res) => {
						const {
							latitude,
							longitude
						} = res;
						this.getWeather(longitude, latitude);
					},
					fail: (err) => {
						console.error('获取位置失败：', err);
					}
				})
			},

			getWeather(lon, lat) {
				const key = this.globalData.key;
				uni.request({
					url: `https://nj3jpfq5xf.re.qweatherapi.com/geo/v2/city/lookup`,
					data: {
						key,
						location: `${lon},${lat}`
					},
					success: (res) => {
						const adcode = res.data.location[0].id;
						// console.log(adcode);
						this.getWeatherByAdcode(key, adcode);
					},
					fail: (err) => {
						console.log('未获取到城市信息', err);
					}
				})
			},

			getWeatherByAdcode(key, code) {
				weatherStore.loading = true;
				uni.request({
					url: `https://nj3jpfq5xf.re.qweatherapi.com/v7/weather/now`,
					data: {
						key: `${key}`,
						location: `${code}`
					},
					success: (res) => {
						console.log(res.data.now);
						weatherStore.data = res.data.now;
					},
					complete: () => {
						weatherStore.loading = false
					}
				})
			},

			formatDate() {
				const date = new Date();

				const year = date.getFullYear();
				const month = date.getMonth().toString().padStart(2, "0");
				const day = date.getDate().toString().padStart(2, "0");
				const hours = date.getHours().toString().padStart(2, "0");
				const minutes = date.getMinutes().toString().padStart(2, "0");

				const formatDate = `${year}:${month}:${day}`;
				const formatTime = `${hours}:${minutes}`;

				dateStore.date = formatDate;
				dateStore.time = formatTime;
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/common/style.css";
	@import "@/common/iconfont.css";
</style>