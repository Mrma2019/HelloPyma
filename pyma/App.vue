<script>
	import config from '@/config/config.js';
	import {
		getWeather
	} from '@/utils/weather.js';
	import {
		formatDate
	} from '@/utils/format.js';

	export default {
		onLaunch: function() {
			console.log('App Launch');
			//天气
			getWeather();
			//时间
			formatDate();
		},
		onShow: function() {
			console.log('App Show');
			this.weatherTimer = setInterval(() => {
				getWeather();
			}, 24 * 60 * 60 * 1000);
			this.formatTimer = setInterval(()=>{
				formatDate();
			}, 600);
		},
		onHide: function() {
			console.log('App Hide');
			clearInterval(this.weatherTimer);
			clearInterval(this.formatTimer);
		},
		methods: {

		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/common/style.css";
	@import "@/common/iconfont.css";
</style>