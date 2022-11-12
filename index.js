const express = require("express");

const { users } = require("./data/users.json");

const app = express();

const PORT = 8082;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        massage: "Server is up and running",
    });
});



/*  Route: /users
    Method: Get
    Description: Get all users
    Access: Publish
*/

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});



/*  Route: /users:id
    Method: Get
    Description: Get single users by ID
    Access: Publish
    Parameters: id
*/

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            massage: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    })
});



/*  Route: /users
    Method: Post
    Description: Create new user
    Access: Publish
    Parameters: none
*/

app.post('/users', (req, res) => {
    const { id, name, surname, email, subscriptionType, subsciptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            massage: "User exist with this ID",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subsciptionDate,
    });
    return res.status(201).json({
        success: true,
        data: users,
    });
});



/*  Route: /users
    Method: Put
    Description: Updating userdata
    Access: Publish
    Parameters: id
*/

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, massage: "User not found" });

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }

        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedUser,
    })
});







app.get('*', (req, res) => {
    res.status(404).json({
        massage: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})