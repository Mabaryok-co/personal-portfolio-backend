const express = require("express");
const router = express.Router();
const { upload } = require("../../middleware/multerUpload");
const { verifyToken } = require("../../middleware/token");
const userHandler = require("../../handler/user_handler");
const { errorHandlers } = require("../../handler/errorHandlers");

const privateRoute = express.Router();
const publicRoute = express.Router();

router.use("", publicRoute);
publicRoute.get("/profile/public", errorHandlers(userHandler.getProfilePublic));
publicRoute.get("/download/cv", errorHandlers(userHandler.downloadCV));

router.use("", verifyToken, privateRoute);
privateRoute.put(
  "/profile/update",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  userHandler.updateProfile
);
privateRoute.get("/profile", errorHandlers(userHandler.getProfile));

router.put("/profile/account/update", errorHandlers(userHandler.updateAccount));

module.exports = router;
