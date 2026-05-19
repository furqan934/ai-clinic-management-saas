const express = require("express");

const {
  register_user,
  login_user,
  get_current_user,
} = require("../controllers/auth_controller");

const auth_middleware = require("../middlewares/auth_middleware");

const router = express.Router();

router.post("/register", register_user);

router.post("/login", login_user);

router.get("/me", auth_middleware, get_current_user);

module.exports = router;