const express = require("express");

const {
    getAllUsers,
    getSingleUserById,
    deleteUser,
    updateUserById,
    createNewUser,
    getSubscriptionDetailsById,
} = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const router = express.Router();

/*  Route: /users
    Method: Get
    Description: Get all users
    Access: Public
*/

router.get("/", getAllUsers);



/*  Route: /users:id
    Method: Get
    Description: Get single users by ID
    Access: Public
    Parameters: id
*/

router.get("/:id", getSingleUserById);



/*  Route: /users
    Method: Post
    Description: Create new user
    Access: Public
    Parameters: none
*/

router.post("/", createNewUser);


/*  Route: /users/:id
    Method: Put
    Description: Updating userdata
    Access: Publish
    Parameters: id
*/

router.put("/:id", updateUserById);



/*  Route: /users/:id
    Method: Delete
    Description: Delete a user by ID
    Access: Public
    Parameters: id
*/

router.delete("/:id", deleteUser);


/*  Route: /users/subscription-deatils/:id
    Method: Delete
    Description: Get all user subscription details
    Access: Public
    Parameters: id
*/

router.get("/subscription-details/:id", getSubscriptionDetailsById);





module.exports = router;