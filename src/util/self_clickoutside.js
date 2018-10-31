import {
  on,
  off
} from './dom';

let demo = function (el, binding) {
  return function (e) {
    if (!el.contains(e.target)) {
      binding.value();
    }
  }
}

export default {
  bind(el, binding, vnode) {
    on(document, 'click', demo(el, binding));
  },

  update(el, binding, vnode) {},

  unbind(el) {
    off(document, 'click', demo(el));
  }
};