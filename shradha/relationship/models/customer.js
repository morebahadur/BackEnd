const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
    .then(() => console.log("connection successfull"))
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const orderSchema = new Schema({
    items: String,
    price: Number,
});
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);
const addCustomer = async () => {
    let cust1 = new Customer({
        name: "rahul kumar",
    });
    let order1 = await Order.findOne({ items: "chips" });
    let order2 = await Order.findOne({ items: "aalu" });
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    let result = await cust1.save();
    console.log(result);
}
addCustomer();
// const addUsers = async () => {
//     let result = await Order.insertMany([
//         { items: "samosa", price: 123 }, 
//         { items: "chips", price: 456 }, 
//         { items: "aalu", price: 789 }
//     ]);
//     console.log(result);
// }

