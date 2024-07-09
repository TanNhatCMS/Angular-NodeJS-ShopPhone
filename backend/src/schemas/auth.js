const Joi = require('joi');
const Auth = {};

Auth.userSignupAuthSchema = Joi.object({
  password: Joi.string().min(6).max(20).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Enter a valid email address",
    }),
});
Auth.userSigninAuthSchema = Joi.object({
  password: Joi.string().min(6).max(20).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
  }),
  email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "any.required": "Email is required",
        "string.email": "Enter a valid email address",
      }),
});
Auth.updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

Auth.verificationEmailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = Auth;
