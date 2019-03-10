// THE API ROUTE TO GET THE NECESSARY USER INFORMATION

const router = require("express").Router();
// pull in the rates controller
const userController = require("../../controllers/userController");

// matches with "api/user"
router.route("/create")
  .post(userController.createUser);
// export the router
module.exports = router;