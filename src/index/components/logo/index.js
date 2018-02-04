import Base from '../base';

import './style.scss';

const $ = window.$;
const color = {
  light: '#EAE4F0',
  dark: '#6E4195',
};


export default class Logo extends Base {
  init() {
    this.$part = [$('#logo1'), $('#logo2'), $('#logo3')];
    this.step = 0;
    this.update = this.update.bind(this);
    this.handler = setInterval(this.update, 150);
  }

  update() {
    this.step = (this.step + 1) % 3;
    this.$dom.removeClass('s0 s1 s2');
    this.$dom.addClass('s' + this.step);
  }

  stopLoading() {
    clearInterval(this.handler);
    this.$dom.addClass('soft');
    this.$dom.removeClass('loading');
    this.$dom.addClass('home');
  }
}
