// import {firstName, lastName, year } from './profile.js';
//node 并不完全支持import语法
// import { area, circumference } from './circle';

// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));
// 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
// js 标准在此之前没有模块体系
// CommonJS模块
// let { stat, exists, readFile } = require('fs');

// // 等同于
// let _fs = require('fs');
// let stat = _fs.stat;
// let exists = _fs.exists;
// let readfile = _fs.readfile;
//这种方法属于动态加载，模块的实质是一个对象，运行时加载。只有运行时才会产生这个对象
//es6的初衷是要实现静态加载，在编译时就能确定模块的依赖关系
//严格模式，是es5引入的概念，几个主要的点：
//变量必须声明后再使用，
//this不能指向全局对象，顶层的this指向undefined，即不应该在顶层代码使用this
