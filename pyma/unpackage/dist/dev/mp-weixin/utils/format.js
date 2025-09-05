"use strict";
const store_formatStore = require("../store/formatStore.js");
function formatDate(dateStr) {
  const date = new Date(dateStr ?? Date.now());
  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const prefix = date.getFullYear().toString().substr(0, 2);
  const year = date.getFullYear().toString().substr(2, 2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const date_ = date.getDate().toString().padStart(2, "0");
  const day = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const data = {
    date: `${year}-${month}-${date_}`,
    time: `${hours}:${minutes}`,
    day,
    prefix
  };
  store_formatStore.formatStore.setData(data);
  return data;
}
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
