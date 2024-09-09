const emptyObj = {}
const obj = {id:1}

const number=1

const str = "1"
const emptyStr = ""
console.log(Object.keys(emptyObj).length === 0)
console.log(Object.keys(obj).length === 0)

console.log(Object.keys(number).length === 0)

console.log(Object.keys(str).length === 0)
console.log(Object.keys(emptyStr).length === 0)

console.log("====================")

console.log(isEmpty(emptyObj))
console.log(isEmpty(obj))
console.log(isEmpty(number))
console.log(isEmpty(str))
console.log(isEmpty(emptyStr))


function isEmpty(a) {
    if(Object.keys(a).length === 0){ return true;}
    else{ return false;}

}