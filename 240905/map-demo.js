// map 객체가 아니라 map 함수에 대해 알아보자

const arr = ['a','b','c','d']

arr.forEach((value,index,object)=>{
    console.log("forEach")
    console.log(`${index} , ${value}, ${object}`)
})

arr.map((value,index,object)=>{
    console.log("map")
    console.log(`${index} , ${value}, ${object}`)
})