"use strict";
const common_vendor = require("../common/vendor.js");
const config_config = require("../config/config.js");
const store_weatherStore = require("../store/weatherStore.js");
async function getWeather() {
  return new Promise((resolve, reject) => {
    common_vendor.index.getLocation({
      type: "gcj02",
      success: (res) => {
        const {
          latitude,
          longitude
        } = res;
        common_vendor.index.request({
          url: `${config_config.config.adCodeUrl}`,
          data: {
            key: `${config_config.config.apiKey}`,
            location: `${longitude},${latitude}`
          },
          success: (res2) => {
            if (res2.data.code == 200) {
              const location = res2.data.location[0];
              const adcode = location.id;
              store_weatherStore.weatherStore.data.location = location;
              getWeatherByAdcode(adcode).then(resolve).catch(reject);
              getGridWeatherByAdcode(longitude, latitude).then(
                resolve
              ).catch(reject);
              getIndices(longitude, latitude).then(resolve).catch(
                reject
              );
            }
          },
          fail: reject
        });
      },
      fail: reject
    });
  });
}
async function getWeatherByAdcode(code) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${config_config.config.weatherUrl}`,
      data: {
        key: `${config_config.config.apiKey}`,
        location: code
      },
      success: (res) => {
        if (res.data.code == 200) {
          const weatherInfo = res.data.now;
          store_weatherStore.weatherStore.data = {
            ...weatherInfo,
            ...store_weatherStore.weatherStore.data
          };
          store_weatherStore.weatherStore.loading = false;
          resolve(weatherInfo);
        } else {
          reject("获取天气数据失败");
        }
      },
      fail: reject
    });
  });
}
async function getGridWeatherByAdcode(lon, lat) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${config_config.config.gridWeatherUrl}`,
      data: {
        key: `${config_config.config.apiKey}`,
        location: `${lon},${lat}`
      },
      success: (res) => {
        if (res.data.code == 200) {
          const girdInfo = res.data;
          store_weatherStore.weatherStore.girdInfo = girdInfo;
          resolve(girdInfo);
        } else {
          reject("获取天气信息失败");
        }
      },
      fail: reject
    });
  });
}
async function getIndices(lon, lat) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${config_config.config.indicesUrl}`,
      data: {
        key: `${config_config.config.apiKey}`,
        type: 1,
        location: `${lon},${lat}`
      },
      success: (res) => {
        if (res.data.code == 200) {
          const indices = res.data;
          store_weatherStore.weatherStore.indices = indices;
          resolve(indices);
        } else {
          reject("获取指数信息失败");
        }
      },
      fail: reject
    });
  });
}
exports.getWeather = getWeather;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/weather.js.map
