const express = require("express");

const app = express();

const PORT = 8082;

app.use(express.json());

app.get('*', (req, res) => {
    res.status(404).json({
        massage: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})