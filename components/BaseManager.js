export { BaseManager }

import { DateTime } from "luxon";

import * as API from "~/components/API.js"

class BaseManager {
  constructor() {
    this.lastid = -1;
    this.data = {};
    this.datetimeFormat = DateTime.TIME_24_SIMPLE;
    this.fetchInterval = 1000; //[ms]
    this.sources = [];
  }

  run() {
    this.getAll();
    setInterval(function () {
      this.getNew();
    }, this.fetchInterval);
  }

  getAll() {
    for (let src of this.sources) {
      API.requestDBData(src).then(function (res) {
        this.saveData(src, res.data);
      });
    }
  }

  getNew() {
    for (let src of this.sources) {
      API.requestDBData(src).then(function (res) {
        this.saveData(src, res.data);
        this.newDataAttrReply(src, res.data);
      });
    }
  }

  newDataAttrReply(src, newDatas) {
    //Empty
  }

  saveData(src, newDatas) {
    if (!this.data[src]) {
      this.data[src] = [];
    }
    for (let data of newDatas) {
      let dt = data.datetime;
      if (dt) {
        try {
          data.datetime = DateTime.fromSQL(dt).toLocaleString(this.datetimeFormat)
        } catch (e) {
          // Pass
        }
      }
      this.data[src].push(data);
    }
    if (newDatas.length > 0) {
      this.lastid = newDatas[newDatas.length - 1].id;
    }
  }
}