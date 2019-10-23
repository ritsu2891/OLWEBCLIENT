import { BaseManager } from "~/components/BaseManager.js"

class RAFManager extends BaseManager {
  constructor() {
    super();
    this.sources = ['ars', 'fft', 'rawsig'];
    super.init();
  }
}