const express = require("express");
const router = express.Router();
const passport = require("passport");

const msgAPIController = require("../controllers/msg-api");
const userAPIController = require("../controllers/user-api");

router
  .route("/msgs")
  .get(msgAPIController.getAllMessagesOrderedByLastPosted)
  .post(
    passport.authenticate("basic", { session: false }),
    msgAPIController.addNewMessage
  );

router.post("/users", userAPIController.registerNewUser);
router.get(
  "/users/login",
  passport.authenticate("basic", { session: false }),
  userAPIController.loginUser
);

router.route("/msgs/:messageid").get(msgAPIController.getSingleMessage);
router.route("/msgs/:messageid").put(msgAPIController.updateSingleMessage);

// Delete routers
router.route("/msgs/:messageid").delete(msgAPIController.deleteSingleMessage);
router.route("/msgs").delete(msgAPIController.deleteAllMessages);

module.exports = router;
