export { YTWManager, STATUS, DL, STATUS_NORMAL, STATUS_OBSTACLE }

import { DateTime } from "luxon";

import { BaseManager } from "~/components/BaseManager.js"

const STATUS_NORMAL = 0;
const STATUS_OBSTACLE = 1;

const STATUS = {
  0: {
    status: '正常',
    detail: '列車は正常に運行しています',
    detailImage: '/check.png',
    icon: "●",
    iconTextColor: "green",
  },
  1: {
    status: '異物検知',
    detail: '車輪に異物が挟まっている可能性があります',
    detailImage: '/wheelzoom.png',
    icon: '▲',
    iconTextColor: 'red',
  }
}

const DL = {
  labels: ["針金", "抵抗", "アイテム3"],
  images: ["/針金.png", "/抵抗.jpg", "/針金.png"]
}

class YTWManager extends BaseManager {
  constructor() {
    super();
    this.sources = ['ytwStatus'];
    super.init();
  }
}