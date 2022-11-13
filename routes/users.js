const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/*  Route: /users
    Method: Get
    Description: Get all users
    Access: Public
*/

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});



/*  Route: /users:id
    Method: Get
    Description: Get single users by ID
    Access: Public
    Parameters: id
*/

router.get('/:id', (req, res) => {
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
    Access: Public
    Parameters: none
*/

router.post('/', (req, res) => {
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



/*  Route: /users/:id
    Method: Put
    Description: Updating userdata
    Access: Publish
    Parameters: id
*/

router.put("/:id", (req, res) => {
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



/*  Route: /users/:id
    Method: Delete
    Description: Delete a user by ID
    Access: Public
    Parameters: id
*/

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, massage: "User to be deleted was not found" });

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({ success: true, data: users });
});


/*  Route: /users/subscription-deatils/:id
    Method: Delete
    Description: Get all user subscription details
    Access: Public
    Parameters: id
*/

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({
            success: false,
            message: "User not found",
        });

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {

            date = new Date();
        } else {

            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    // Subscription expiration calculatio 01/01/1970, UTC. //// milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration <= currentDate
                ? 0
                : subscriptionExpiration - currentDate,
    };

    res.status(200).json({
        success: true,
        data,
    });
});





module.exports = router;