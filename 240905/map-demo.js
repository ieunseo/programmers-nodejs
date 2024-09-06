// map 객체가 아니라 map 함수에 대해 알아보자

const arr = ['a','b','c','d']

const fEA = arr.forEach((value,index,object)=>{
    console.log("forEach")
    console.log(`${index} , ${value}, ${object}`)
})

const mA = arr.map((value,index,object)=>{
    console.log("map")
    console.log(`${index} , ${value}, ${object}`)
})

console.log(`forEach 로 return 하면 ${fEA}, map 으로 return 하면 ${mA}`)

//forEach 는 return 하면 값을 못받지만
// map 은 새로운 배열을 만들어서 리턴해준다.