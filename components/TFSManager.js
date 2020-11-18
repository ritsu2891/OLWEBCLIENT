export { TFSManager, STATUS, STATUS_VIGILANCE, STATUS_NORMAL };

import * as API from "~/components/API.js";
import { BaseManager } from "~/components/BaseManager.js";

const STATUS = [
  {
    id: 0,
    label: "警戒",
    color: "linear-gradient(135deg, #ff3019 0%,#cf0404 100%)",
  },
  {
    id: 1,
    label: "解除",
    color: "linear-gradient(135deg, #22b09c 0%, #00b050 100%)",
  },
];

const STATUS_VIGILANCE = 0;
const STATUS_NORMAL = 1;

class TFSManager extends BaseManager {
  constructor(status) {
    super();
    this.status = status;
    this.sources = ["tfs"];
    super.init();
  }

  newDataAttrReply(src, newDatas) {
    switch (src) {
      case "tfs":
        for (let data of newDatas) {
          API.postDataToDB("tfsStatusReg", {
            id: data.id,
            status: this.status,
          });
          data.status = this.status;
        }
        break;
    }
  }
}
