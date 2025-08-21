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
            var _a;
            if (((_a = res2.data.location) == null ? void 0 : _a.length) > 0 && res2.data.location[0].id != null) {
              const adcode = res2.data.location[0].id;
              getWeatherByAdcode(adcode).then(resolve).catch(reject);
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
        if (res.data.now) {
          const weatherInfo = res.data.now;
          store_weatherStore.weatherStore.data = weatherInfo;
          store_weatherStore.weatherStore.loading = false;
          resolve(weatherInfo);
        } else {
          reject("天气数据为空");
        }
      },
      fail: reject
    });
  });
}
exports.getWeather = getWeather;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/weather.js.map
