import Vue from 'vue/dist/vue.esm'
// import App from './App.vue'
// import router from './router'

import "../static/css/normalize.css";
import "../static/css/reset.css";

Vue.config.productionTip = false

// new Vue({
//   // router,
//   render: h => h(App)
// }).$mount('#app')

const vm = new Vue({
  el: '#app',
  template: ('<div id="bar"><div>{{foo}}{{foo}}{{foo}}{{foo}}</div></div>'),
  methods: {
    getData() {
      console.log("getData");
    }
  },
  mounted() {
    // console.log(this.$options);
    this.$watch("foo", function() {
      // console.log(arguments);
    })
  },
  data() {
    return {
      foo: "foo",
      bar: "bar",
      arr: [{ a: 1 }]
    }
  }
})

vm.foo = 123;

// const mutationMethods = [
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
// ]

// let arrayMethods = Object.create(Array.prototype);
// let arrayProto = Array.prototype;
// let arr = [];

// mutationMethods.forEach(method => {

//   // 实现数组方法变更
//   Object.defineProperty(arrayMethods, method, {
//     enumerable: false,
//     writable: true,
//     configurable: true,
//     value: function(...args) {
//       console.log(`${method} is change`);
//       return arrayProto[method].apply(this, args);
//     }
//   })

//   // 实现数组方法变更
//   // arrayMethods[method] = function (...args) {
//   //   console.log(`${method} is change`);
//   //   return arrayProto[method].apply(this, args);
//   // }

//   // 无法使用 __proto__ 的浏览器实现数组方法
//   Object.defineProperty(arr, method, {
//     enumerable: false,
//     writable: true,
//     configurable: true,
//     value: arrayMethods[method]
//   })

//   // 无法使用 __proto__ 的浏览器实现数组方法
//   // arr[method] = arrayMethods[method]
// })

// arr.push(1);
// arr.push(2);
// arr.push(3);

// console.log(arr);

// // for in 不会遍历不可枚举属性
// for (const key in arr) {
//   console.log(key);
// }

// // 获取所有的属性
// let keys = Object.getOwnPropertyNames(arr);
// console.log(keys);

// // 一个有点意思的函数 cached 的玩意儿（函数式编程），cached 的参数要求必须是纯函数，纯函数：输入 aaa-bbb 永远都会得到 aaaBbb 类似，即输入确定，输出也是确定的。
// // cached 不改变原函数的行为
// function cached(fn) {
//   let cache = Object.create(null);
//   return (function cachedFn(str) {
//     let hit = cache[str];
//     return hit || (cache[str] = fn(str))
//   })
// }

// let demo = cached(function(id) {
//   let el = "test"
//   return el
// });

setTimeout(function() {
  console.log('8 setTimeout')
}, 0)

async function async1() {
  console.log('3 async1 start')
  await async2()
  console.log('7 async1 end')
}

async function async2() {
  console.log('4 async2')
}

console.log('1 script start')


new Promise(function(resolve) {
  console.log('2 promise1')
  resolve();
}).then(function() {
  console.log('6 promise2')
})

async1();

console.log('5 script end')

console.log(1);
setTimeout(function() {
  console.log(2);
}, 0);
Promise.resolve().then(function() {
  console.log(3);
}).then(function() {
  console.log(4);
});