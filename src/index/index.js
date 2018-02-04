import Loading from './components/loading';
import Logo from './components/logo';
import Home from './components/home';
import Scroll from './components/scroll';
import images from './images';

import './style.scss';
import './pages.scss';

const $ = window.$;

// TODO:
// const preImages = Object.keys(images).map(k => images[k]).concat([
//   'https://www.heeds.eu/wp-content/themes/heeds/assets/images/cssda.png',
//   // 'https://www.heeds.eu/wp-content/uploads/heeds-img-home-2.jpg',
// ]);
const preImages = Object.keys(images).map(k => images[k]);

export default function () {
  const logo = new Logo($('#logo'));
  const loading = new Loading($('#loading'));

  new Home($('#home'));
  new Scroll($('body'));
  $.imgpreload(preImages, {
    each(arr) {
      loading.update(arr.length / preImages.length);
    },
    all() {
      // loading完成
      logo.stopLoading();
      loading.remove();
    },
  });

  // nav
  $('#nav li a').click((e) => {
    const goto = parseInt($(e.target).attr('data-p'), 10);
    $('html,body').animate({
      scrollTop: `${window.innerHeight * goto}px`,
    }, 500);
  });
}
