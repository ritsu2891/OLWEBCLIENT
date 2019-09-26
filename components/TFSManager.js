export { TFSManager }

import { DateTime } from "luxon";

import * as API from "~/components/API.js"

const STATUS = {
  0: { label: "警戒", color: "linear-gradient(135deg, #ff3019 0%,#cf0404 100%)" },
  1: { label: "解除", color: "linear-gradient(135deg, #22b09c 0%, #00b050 100%)" }
};

const STATUS_VIGILANCE = 0;
const STATUS_NORMAL = 1;

class TFSManager {
  constructor(status, dest) {
    this.status = status;
    this.lastid = -1;
    this.dest = dest;
  }

  getAll() {
    const self = this;
    API.requestDBData('tfs').then(function (res) {
      for (let data of res.data) {
        data.datetime = DateTime.fromSQL(data.datetime).toLocaleString(DateTime.TIME_24_SIMPLE);
        self.dest.timeline.unshift(data);
      }
      self.lastid = res.data[res.data.length - 1].id;
    });
  }

  getNew() {
    const self = this;
    API.requestNewDBData('tfs', this.lastid).then(function (res) {
      if (res.data.length > 0) {
        for (let data of res.data) {
          API.postDataToDB('tfsStatusReg', {id: data.id, status: self.status});
          data.datetime = DateTime.fromSQL(data.datetime).toLocaleString(DateTime.TIME_24_SIMPLE);
          data.status = self.status;
          self.dest.timeline.unshift(data);
        }
        self.lastid = res.data[res.data.length - 1].id;
      }
    });
  }
}