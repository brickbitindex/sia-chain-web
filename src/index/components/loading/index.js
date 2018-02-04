import Base from '../base';

import './style.scss';

export default class Loading extends Base {
  init() {
    this.$bar = window.$('.bar', this.$dom).first();
  }

  update(per) {
    this.$bar.css('width', `${per * 200}px`);
  }

  remove() {
    window.$('body').removeClass('loading');
    this.$dom.addClass('hide');
    setTimeout(() => {
      super.remove();
    }, 1100);
  }
}
