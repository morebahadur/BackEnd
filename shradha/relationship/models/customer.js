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

customerSchema.post("findOneAndDelete", async function (customer) {
    if (customer.orders.length) {
        let rst = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(rst);
    }
});
// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "rahul kumar",
//     });
//     let order1 = await Order.findOne({ items: "chips" });
//     let order2 = await Order.findOne({ items: "aalu" });
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//     let result = await cust1.save();
//     console.log(result);
// }
// addCustomer();
// const addUsers = async () => {
//     let result = await Order.insertMany([
//         { items: "samosa", price: 123 }, 
//         { items: "chips", price: 456 }, 
//         { items: "aalu", price: 789 }
//     ]);
//     console.log(result);
// }
const newCustomer = async () => {
    let cust1 = new Customer({
        name: "aran arjun",
    });

    let order1 = new Order({
        items: "Pizza",
        price: 123
    });

    cust1.orders.push(order1);
    await order1.save();
    await cust1.save();
    console.log("new customer added!");
}
const deleteCustomer = async () => {
    let data = await Customer.findByIdAndDelete('68292c09cd1e9fef70476277');
    console.log(data);
}
// newCustomer();
deleteCustomer();