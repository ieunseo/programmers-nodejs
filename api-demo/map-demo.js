let express = require('express')
const app = express()
app.listen(3300)

// app.get('/:id',function(req,res){
//     let { id } = req.params;
//     id = parseInt(id);
    
//     if (p.get(id) === undefined) {
//         res.json({
//             message: "없는 상품!"
//         });
//     } else {
//         res.json({
//             id: id,
//             productName: db.get(id)
//         });
//     }
// })


app.get('/:id',function(req,res){
    let { id } = req.params;
    id = parseInt(id);
    
    // res.json(db.get(id))
        
    if (p.get(id) === undefined) {
        res.json({
            message: "없는 상품!"
        });
    } else {
        pro = p.get(id)
        pro.id = id
        res.json(pro)
    }
})

let p = new Map()

let chocolate = {
    productName : "초콜릿",
    price:1000
}

let milk = {
    productName : "우유",
    price:2000
}

let cup = {
    productName : "머그컵",
    price:3500
}

p.set(1,chocolate)
p.set(2,milk)
p.set(3,cup)

// console.log(p)

// console.log(p.get(1))
// console.log(p.get(2))
// console.log(p.get(3))

// localhost:1234/1 ==> 초콜릿
// localhost:1234/2 ==> 우유
// localhost:1234/3 ==> 머그컵
