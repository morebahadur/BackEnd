const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
// let createRandomUser = () => {
//     return {
//         userId: faker.string.uuid(),
//         username: faker.internet.username(), // before version 9.1.0, use userName()
//         email: faker.internet.email(),
//         avatar: faker.image.avatar(),
//         password: faker.internet.password(),
//         birthdate: faker.date.birthdate(),
//         registeredAt: faker.date.past(),
//     };
// }
let createRandomUser = () => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}
// console.log(createRandomUser());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'hello',
})
// const q = "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)";
const q = "INSERT INTO user (id, username, email, password) VALUES ?";
const values = [[["123c", "abcd4064c", "abcd@1234bc", "12345678c"], ["123b", "abcd4064b", "abcd@1234b", "12345678b"]]];

try {
    connection.query(q, values, (err, results) => {
        if (err) throw err;
        console.log(results);
        // console.log(results.length);
        // console.log(results[0]);
        // console.log(results[1]);
    }
    );
} catch (err) {
    console.log(err);
}
connection.end();