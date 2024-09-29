var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

var token = jwt.sign({foo:'bar'},process.env.PRIVATE_KEY);
// 토큰을 생성한것임. payload 와 private key 암호화 알고리즘에다가 나만의 암호키를 넣음. + SHA256
console.log(token);
// 토큰 발행이 됨 실행할때마다 계속

var decoded = jwt.verify(token,process.env.PRIVATE_KEY);
console.log(decoded);