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
							const adcode = location.id;

							weatherStore.data.location = location;
							getWeatherByAdcode(adcode).then(resolve).catch(reject);
							getGridWeatherByAdcode(longitude, latitude).then(
								resolve).catch(reject);
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
				if (res.data.code == 200) {
					const weatherInfo = res.data.now;
					weatherStore.data = {
						...weatherInfo,
						...weatherStore.data
					};
					weatherStore.loading = false;

					resolve(weatherInfo);
				} else {
					reject('获取天气数据失败');
				}
			},
			fail: reject
		})
	})
}

export async function getGridWeatherByAdcode(lon, lat) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${config.gridWeatherUrl}`,
			data: {
				key: `${config.apiKey}`,
				location: `${lon},${lat}`
			},
			success: (res) => {
				if (res.data.code == 200) {
					const weatherInfo = res.data;

					weatherStore.girdData = weatherInfo;
					resolve(weatherInfo);
				} else {
					reject('获取天气信息失败')
				}
			},
			fail: reject
		})
	})
}