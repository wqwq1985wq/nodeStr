exports.getFuncStr = function({
    funcName,randomVal1,randomVal2,funcType,needRun,unUseStr
})
{
    let funcs = {
        //数学计算函数
"1":`
    let ${funcName} = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let opArr = ["+","-","*","/"]
        let ${randomVal1} = getRandomNum(1,100)
        let ${randomVal2} = getRandomNum(1,100)
        let result = ${randomVal1} +opArr[getRandomNum(0,opArr.length-1)] +${randomVal2}
        return result
    }
    ${funcName}()
`,
//字符串连接
"2":`
    let ${funcName} = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let getRandomStr = function()
        {
            return Math.random().toString(36).slice(-getRandomNum(2,30))
        }
        let ${randomVal1} =getRandomStr()
        let ${randomVal2} = getRandomStr()
        let result = ${randomVal1} +${randomVal2}
        return result
    }
    ${funcName}()
`,
//递归调用
"3":`
    let ${funcName} = function()
    {
        let getRandomNum = function(n1,n2)
        {
            var Range = n2 - n1 + 1;
            return (n1 + Math.floor(Math.random() * Range))
        }
        let times = getRandomNum(2,5)
        let recFunc = function(times)
        {
            if(times--<=0) {
                return;
            }
            else{
                recFunc(times)
            }
        }
        recFunc(times)
    }
    if(${needRun}){
        ${funcName}()
    }
    
 `,
// //不调用的杂质
// "4":`\`${unUseStr}\``,
    }
    
    return funcs[funcType]
}