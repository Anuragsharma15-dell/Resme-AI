import express from "express";
import passport from "passport";

export const router = express.Router();

/* GOOGLE LOGIN */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  }
);

/* GITHUB LOGIN */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  }
);
 export default router