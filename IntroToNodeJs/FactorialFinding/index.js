let {fact} = require("../FactorialFinding/factorial")

let elements = [5,7,10]

for(let ele of elements){
    if(ele<0){
        console.log("Enter Valid Positive Number!!")
        return
    }
    if(typeof ele !="number"){
        console.log("Enter the Valid Number!!")
        return
    }
    console.log(`Factorial of ${ele} is : ${fact(ele)}`)
}
