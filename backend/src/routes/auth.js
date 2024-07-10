const router = require('express').Router();
const { validateBody } = require('../decorators');
const authController = require('../controllers/authController.js');
const { isEmptyBody, authenticate
  //, upload
  } =   require('../middleware');
const {
  userSignupAuthSchema,
  userSigninAuthSchema,
  updateSubscriptionSchema,
//  verificationEmailSchema,
} =  require('../schemas/auth.js');



router.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupAuthSchema),
  authController.signUp
);

router.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninAuthSchema),
  authController.signIn
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logOut);


// router.patch(
//   "/avatars",
//   upload.single("avatar"),
//   // isEmptyBody,
//   authenticate,
//   authController.updateAvatar
// );

module.exports = router;
