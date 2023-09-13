const express = require("express");
const dotenv = require('dotenv');


// Importing routes
const DbConnection = require("./databaseConnection");
const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")


dotenv.config();

const app = express();

DbConnection();

const PORT = 8082;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        massage: "Server is up and running",
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);



app.get('*', (req, res) => {
    res.status(404).json({
        massage: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});