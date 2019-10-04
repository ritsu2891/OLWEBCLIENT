export { BaseManager }

import { DateTime } from "luxon";

import * as API from "~/components/API.js"

class BaseManager {
  constructor() {
    this.lastid = -1;
    this.data = {};
    this.datetimeFormat = DateTime.TIME_24_WITH_SECONDS;
    this.fetchInterval = 1000; //[ms]
    this.sources = [];
  }

  init() {
    for (let src of this.sources) {
      this.data[src] = [];
    }
  }

  run() {
    const self = this;
    self.getAll();
    setInterval(function () {
      self.getNew();
    }, self.fetchInterval);
  }

  getAll() {
    const self = this;
    for (let src of this.sources) {
      API.requestDBData(src).then(function (res) {
        self.saveData(src, res.data);
      });
    }
  }

  getNew() {
    const self = this;
    for (let src of this.sources) {
      API.requestNewDBData(src, this.lastid).then(function (res) {
        self.saveData(src, res.data);
        self.newDataAttrReply(src, res.data);
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