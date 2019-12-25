
var wq1 = 20
function modeOut() { 
    var name; 
    var v1 = 10
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = modeOut 