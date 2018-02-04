export default class BaseCompoent {
  constructor($dom, store) {
    this.$dom = $dom;
    this.store = store;
    this.init();
  }

  init() {}

  remove() {
    this.$dom.remove();
  }
}
