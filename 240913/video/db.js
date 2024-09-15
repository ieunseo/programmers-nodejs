// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database: 'alogger',
    dateStrings : true
});

// A simple SELECT query
try {
    const [results, fields] = await connection.query(
        'SELECT * FROM `users`'
    );

    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available

    // 안에있는 내용을 꺼내기.
    console.log('-------------------')
    console.log(results[0]) // id가 1인 사용자의 내용 전체출력
    console.log('-------------------')
    console.log(results[0].id);
    console.log(results[0].name);
    console.log(results[0].email);
    console.log('-------------------')
    const { id , email , name, created_at} = results[2];
    console.log(id,'+',email,'+',name,'+',created_at);

} catch (err) {
    console.log(err);
}