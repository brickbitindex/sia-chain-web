import Base from '../base';

const $ = window.$;

class ScrollHandler {
  constructor($dom) {
    this.$dom = $dom;
  }

  update() {}
}

class LogoScrollHandler extends ScrollHandler {
  constructor() {
    super($('#borderLogo'));
  }
  update(pos) {
    // active
    this.$dom.attr('data-p', parseInt(pos + 0.5, 10));
  }
}

class BorderScrollHandler extends ScrollHandler {
  constructor() {
    super($('.border-container').first());
  }
  update(pos) {
    if (pos > 1) {
      this.$dom.addClass('fixed');
    } else {
      this.$dom.removeClass('fixed');
    }
    // active
    this.$dom.attr('data-p', parseInt(pos + 0.5, 10));
  }
}

class NavScrollHandler extends ScrollHandler {
  constructor() {
    super($('#nav'));
  }
  update(pos) {
    if (pos > 0.5) {
      this.$dom.addClass('show');
    } else {
      this.$dom.removeClass('show');
    }
    // active
    this.$dom.attr('data-p', parseInt(pos + 0.5, 10));
  }
}

class P1ScrollHandler extends ScrollHandler {
  constructor() {
    super($('.page.p1').first());
    this.$colorText = $('.color-text', this.$dom).first();
    this.$innerText = $('.inner-text', this.$dom).first();
    this.$innerTextDiv = $('.inner-text div', this.$dom).first();
    this.$mainPage = $('.main-page', this.$dom).first();
    this.$content = $('.content', this.$dom).first();
    this.$whitepaper = $('.white-paper', this.$dom).first();
  }
  update(pos) {
    if (pos > 2) return;
    const p = pos - 1;
    this.$mainPage.css('transform', `translate(${-p * 400}px, 0)`);
    this.$innerText.css('transform', `translate(${-p * 400}px, 0)`);
    this.$innerTextDiv.css('transform', `translate(${p * 400}px, ${-p * 400}px)`);
    this.$colorText.css('transform', `translate(0, ${-p * 400}px)`);
    this.$content.css('opacity', `${pos}`);
    this.$whitepaper.css('width', `${pos * 190}px`);
  }
}

class P2ScrollHandler extends ScrollHandler {
  constructor() {
    super($('.page.p2').first());
    this.$colorText = $('.color-text', this.$dom).first();
    this.$innerTextDiv = $('.inner-text div', this.$dom).first();
    this.$content = $('.content', this.$dom).first();
    this.$contentSlide = $('.content .slide-container', this.$dom).first();
  }
  update(pos) {
    if (pos < 1 || pos > 3) return;
    const p = pos - 2;
    this.$contentSlide.css('width', `${(pos - 1) * 100}%`);
    this.$content.css('transform', `translate(0, ${p * 200}px)`);
    this.$innerTextDiv.css('transform', `translate(0, ${-p * 400}px)`);
    this.$colorText.css('transform', `translate(0, ${-p * 400}px)`);
  }
}

class P3ScrollHandler extends ScrollHandler {
  constructor() {
    super($('.page.p3').first());
    this.$colorText = $('.member .color-text', this.$dom);
    this.$innerTextDiv = $('.member .inner-text div', this.$dom);
  }
  update(pos) {
    if (pos < 2 || pos > 4) return;
    const p = pos - 3;
    if (p > 0) {
      this.$innerTextDiv.css('transform', 'translate(0, 0)');
      this.$colorText.css('transform', 'translate(0, 0)');
    } else {
      this.$innerTextDiv.css('transform', `translate(0, ${-p * 200}px)`);
      this.$colorText.css('transform', `translate(0, ${-p * 200}px)`);
    }
  }
}

class P5ScrollHandler extends ScrollHandler {
  constructor() {
    super($('.page.p5').first());
    this.$input = $('.form input', this.$dom).first();
    this.$btn = $('.form button', this.$dom).first();
  }
  update(pos) {
    if (pos < 4 || pos > 6) return;
    const p = pos - 5;
    this.$input.css('transform', `translate(${p * 200}px, 0)`);
    this.$btn.css('transform', `translate(${-p * 200}px, 0)`);
  }
}

export default class Scroll extends Base {
  init() {
    this.handlers = [
      new LogoScrollHandler(),
      new BorderScrollHandler(),
      new NavScrollHandler(),
      new P1ScrollHandler(),
      new P2ScrollHandler(),
      new P3ScrollHandler(),
      new P5ScrollHandler(),
    ];
    window.onscroll = () => {
      this.update(window.pageYOffset);
    };
    this.update(window.pageYOffset);
  }

  update(top) {
    const wh = window.innerHeight;
    const pos = top / wh;
    for (let i = 0; i < this.handlers.length; i += 1) {
      this.handlers[i].update(pos);
    }
  }
}
