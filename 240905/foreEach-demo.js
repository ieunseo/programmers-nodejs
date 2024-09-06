//콜백함수
const arr = ['a','b','c','d']

arr.forEach((value => {
    //출력은 1,2,3,4,5 (밸류값) 만 출력
    console.log(value)
}))
// 객체 (또는 배열) 에서 요소를 하나 꺼낸다음
// 매개변수로 그 요소를 전달해 호출되는 콜백함수 

arr.forEach((key,value)=>{
    // 여기서 key 는 데이터값이고 value는 인덱스값
    console.log(`index:${value}, value:${key}`)
})

arr.forEach((key,value,object)=>{
console.log(`index : ${value} , value : ${key}, object: ${object}`)
})

//map 과 forEach

let map = new Map()
map.set(6,"초콜릿")
map.set(7,"우유")

map.forEach((value,index,object) =>{
    console.log(` ${index} : ${value} , ${object}`)
})
// 마지막 매개변수는 객체가 통째로 들어갔다. 그래서 [object Map] 으로 출력됨.