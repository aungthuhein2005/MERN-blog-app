const { connectToDb, getDb } = require("./db");
const authors =() => {
    db.collection("authors")
    .find()
    .then(response=>{return response})
    .catch(err=>{return err})
}


module.exports = {
    authors: authors
}