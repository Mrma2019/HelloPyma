"use strict";
const store_formatStore = require("../store/formatStore.js");
async function formatDate() {
  return new Promise((resolve, reject) => {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear().toString().substr(2, 2);
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formatDate2 = `${year}:${month}:${day}`;
    const formatTime = `${hours}:${minutes}`;
    store_formatStore.formatStore.data = {
      date: formatDate2,
      time: formatTime
    };
  });
}
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/format.js.map
