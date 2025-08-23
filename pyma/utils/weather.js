import config from "@/config/config";
import {
	weatherStore
} from '@/store/weatherStore.js';

export async function getWeather() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			success: (res) => {
				const {
					latitude,
					longitude
				} = res;
				uni.request({
					url: `${config.adCodeUrl}`,
					data: {
						key: `${config.apiKey}`,
						location: `${longitude},${latitude}`
					},
					success: (res) => {
						if (res.data.code == 200) {
							const location = res.data.location[0];
							// console.log('位置信息',location);
							weatherStore.location = location;
							const adcode = location.id;
							getWeatherByAdcode(adcode).then(resolve).catch(reject);
						}
					},
					fail: reject
				})
			},
			fail: reject
		})
	})
}

export async function getWeatherByAdcode(code) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${config.weatherUrl}`,
			data: {
				key: `${config.apiKey}`,
				location: code
			},
			success: (res) => {
				if (res.data.now) {
					const weatherInfo = res.data.now;
					weatherStore.data = weatherInfo;
					weatherStore.loading = false;
					resolve(weatherInfo);
				} else {
					reject('天气数据为空');
				}
			},
			fail: reject
		})
	})
}