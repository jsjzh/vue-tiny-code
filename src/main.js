import Vue from 'vue/dist/vue.esm'
// import App from './App.vue'
// import router from './router'

import "../static/css/normalize.css";
import "../static/css/reset.css";

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

const vm = new Vue({
  el: '#app',
  template: '<div>{{a}}</div>',
  methods: {
    getData() {
      console.log("getData");
    }
  },
  data() {
    return {
      test: 1,
      a: "king"
    }
  }
})

const mutationMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

let arrayMethods = Object.create(Array.prototype);
let arrayProto = Array.prototype;
let arr = [];

mutationMethods.forEach(method => {

  // 实现数组方法变更
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function (...args) {
      console.log(`${method} is change`);
      return arrayProto[method].apply(this, args);
    }
  })

  // 实现数组方法变更
  // arrayMethods[method] = function (...args) {
  //   console.log(`${method} is change`);
  //   return arrayProto[method].apply(this, args);
  // }

  // 无法使用 __proto__ 的浏览器实现数组方法
  Object.defineProperty(arr, method, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: arrayMethods[method]
  })

  // 无法使用 __proto__ 的浏览器实现数组方法
  // arr[method] = arrayMethods[method]
})

arr.push(1);
arr.push(2);
arr.push(3);

console.log(arr);

// for in 不会遍历不可枚举属性
for (const key in arr) {
  console.log(key);
}

// 获取所有的属性
let keys = Object.getOwnPropertyNames(arr);
console.log(keys);