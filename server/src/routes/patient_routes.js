const express = require("express");

const {
  create_patient,
  get_patients,
  get_single_patient,
  update_patient,
  delete_patient,
} = require("../controllers/patient_controller");

const auth_middleware = require("../middlewares/auth_middleware");

const authorize_roles = require("../middlewares/role_middleware");

const router = express.Router();

router.post(
  "/",
  auth_middleware,
  authorize_roles("admin", "doctor", "receptionist"),
  create_patient,
);

router.get("/", auth_middleware, get_patients);

router.get("/:id", auth_middleware, get_single_patient);

router.put(
  "/:id",
  auth_middleware,
  authorize_roles("admin", "doctor", "receptionist"),
  update_patient,
);

router.delete(
  "/:id",
  auth_middleware,
  authorize_roles("admin"),
  delete_patient,
);

module.exports = router;
