import mongoose from "mongoose";
import userSchema from "./userModel";
import bookSchema from "./bookModel";
import categorySchema from "./categoryModel";
import borrowSchema from "./borrowModel";

//connect to DB
//cloud mongodb
const uri = "mongodb+srv://super:super@clusterbook.wljvnyy.mongodb.net/?retryWrites=true&w=majority";
//local mongodb
//const uri = "mongodb://localhost:27017/book-data"

async function main() {
  await mongoose.connect(uri)
}

main()
  .then(() => {
    console.log("MaongoDB Connected");

  }).catch((err) => {
    console.log(err);

  })

const Book = mongoose.model('Book', bookSchema)
const Category = mongoose.model('Category', categorySchema)
const Borrow = mongoose.model('Borrow', borrowSchema)
const User = mongoose.model('User', userSchema)
export { Book, Category, Borrow, User }