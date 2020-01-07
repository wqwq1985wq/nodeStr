function foo({x, y = 5}={}) {
    console.log(x, y);
  }
  
  foo({}) // undefined 5
  foo({x: 1}) // 1 5
  foo({x: 1, y: 2}) // 1 2
  foo() // undefined 5
  foo({x:null,y:3}) //null 3
