export default { init, buildTimelineItem, STATUS_NORMAL, STATUS_OBSTACLE }

import { DateTime } from "luxon";

import * as API from './API.js'

const STATUS_NORMAL = 0;
const STATUS_OBSTACLE = 1;

let latestId = -1;
let vueObj = undefined;

const STATUS = {
  0: {
    status: '正常',
    detail: '列車は正常に運行しています',
    detailImage: 'check.png',
    icon: "●",
    iconTextColor: "green",
  },
  1: {
    status: '異物検知',
    detail: '車輪に異物が挟まっている可能性があります',
    detailImage: 'wheelzoom.png',
    icon: '▲',
    iconTextColor: 'red',
  }
}

const DL = {
  labels: ["針金", "抵抗", "アイテム3"],
  images: ["/針金.png", "/抵抗.jpg", "/針金.png"]
}

function buildTimelineItem(data) {
  const s = data.status;

  let builtItem = {
    status: s,
    id: data.id ? data.id : -1,
    time: data.datetime ? DateTime.fromSQL(data.datetime).toLocaleString(DateTime.TIME_24_SIMPLE) : "LIVE",
    icon: STATUS[s].icon,
    iconTextColor: STATUS[s].iconTextColor,
    contentAttr: {
      status: STATUS[s].status,
      detail: STATUS[s].detail,
      detailImage: STATUS[s].detailImage
    }

    /*
      detail: "車輪に異物が挟まっている可能性があります",
      detailImage: "wheelzoom.png",
      dlDataSet: {
        labels: ["針金", "抵抗", "アイテム3"],
        datas: [10, 81, 9],
        images: ["/針金.png", "/抵抗.jpg", "/針金.png"]
      },
      rangeDataSet: {
        startPos: [136.90104246139526, 35.142985260896246],
        endPos: [136.91048383712769, 35.12066327340687]
      }
    */
  }

  if (data.obstacle) {
    let obstacle = [];
    for (let o of data.obstacle) {
      obstacle.push(o);
    }

    builtItem['contentAttr']['dlDataSet'] = {
      labels: DL.labels,
      datas: obstacle,
      images: DL.images,
    }
  }

  return builtItem;
}

function addItemToTimeline(item) {
  vueObj.timelineBuffer.unshift(item);
}

function init(_vueObj) {
  vueObj = _vueObj;
  // addItemToTimeline(buildTimelineItem({ status: STATUS_NORMAL }));
  fetchData();
  window.setInterval(() => {
    fetchData();
  }, 1000);
}

function fetchData() {
  API.requestDBData('ytwStatus').then(function (res) {
    const datas = res.data;
    for (let data of datas) {
      if (data.id > latestId) {
        addItemToTimeline(buildTimelineItem(data));
        latestId = data.id;
      }
    }
  });
}