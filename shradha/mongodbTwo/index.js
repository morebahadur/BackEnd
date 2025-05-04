const mongoose = require('mongoose');
main()
    .then(() => { console.log("connected Successfully!") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//This a schema for the user collection
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})

//This is a model for the user collection
// const User = mongoose.model('User', userSchema);