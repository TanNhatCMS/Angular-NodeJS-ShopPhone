const {apiError, HttpError} = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const User = require('../models/Users');

async function getAllUsers(req, res, next) {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

    const users = await User.find({ isDeleted: false  }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
    if (!users.length) {
      throw apiError(
          404,
          "No User found"
      );
    }
    res.status(200).json(users);
}


async function getUserByID(req, res, next) {
  const { id: _id } = req.params;
  const user = await User.findOne({ _id });
  if (user) {
    res.status(200).json(user);
  } else {
    throw apiError(404, "Product not found");
  }
}
async function addNewUser(req, res, next) {
  const newUser = await User.create({ ...req.body });
  res.status(201).json(newUser);
}

async function deleteUser(req, res, next) {
  const { id: _id } = req.params;
  const deleteContact = await User.findOneAndDelete({ _id });
  if (deleteContact) {
    res.json({ message: "contact deleted" });
  } else {
    throw HttpError(404);
  }
}

async function updateUser(req, res, next) {
  const { id: _id } = req.params;
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedUser);
}


module.exports =  {
  getAllUsers: ctrlWrapper(getAllUsers),
   getUserByID: ctrlWrapper(getUserByID),
   addNewUser: ctrlWrapper(addNewUser),
  deleteUser: ctrlWrapper(deleteUser),
  updateUser: ctrlWrapper(updateUser),
};
