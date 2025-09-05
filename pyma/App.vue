<script>
	import config from '@/config/config.js';
	import {
		getWeather
	} from '@/utils/weather.js';
	import {
		formatDate
	} from '@/utils/format.js';
	import {
		getSystemInfo
	} from '@/utils/system.js'

	export default {
		onLaunch: function() {
			console.log('App Launch');
			//天气
			getWeather();
			getSystemInfo();
			formatDate();
			this.formatTimer = setInterval(() => {
				formatDate();
			}, 600);
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
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
	@import "@/static/stylesheet.css";
</style>