import express from "express";
import { register, getProfile, updateProfile, deleteProfile, changePassword } from "../controllers/users";
import { authenticate } from "../middleware/auth";
import {  validate, registrationSchema, updateSchema, passwordSchema} from "../middleware/validate";

const router = express.Router();

router.post("/register", validate(registrationSchema), register);
router.get("/profile/:profileId", authenticate, getProfile);
router.put("/profile/:profileId", authenticate, validate(updateSchema.partial()), updateProfile);
router.delete("/profile/:profileId", authenticate, deleteProfile);
router.patch("/profile/:profileId/password", authenticate, validate(passwordSchema), changePassword);

export default router;
