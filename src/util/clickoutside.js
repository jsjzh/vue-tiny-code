import Vue from 'vue';
import {
  on,
  off
} from './dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;
let i = 0;

function handleStart(e) {
  console.log(123);
  startClick = e
}

function handleEnd(e) {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
}

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    if (i === 0) {
      !Vue.prototype.$isServer && on(document, 'mousedown', handleStart);
      !Vue.prototype.$isServer && on(document, 'mouseup', handleEnd);
      i++;
    }

    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];

    if (nodeList.length === 0) {
      !Vue.prototype.$isServer && off(document, 'mousedown', handleStart);
      !Vue.prototype.$isServer && off(document, 'mouseup', handleEnd);
      i = 0;
    }
  }
};