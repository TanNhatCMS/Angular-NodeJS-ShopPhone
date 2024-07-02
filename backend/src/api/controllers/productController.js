const {apiError, HttpError} = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const Product = require('../models/Products');

async function getAllProducts(req, res, next) {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

    const products = await Product.find({ isDeleted: false  }, "-createdAt -updatedAt -isDeleted -deletedAt", {
      skip,
      limit,
    });
    if (!products.length) {
      throw apiError(
          404,
          "No Product found"
      );
    }
    res.status(200).json(products);
}
// async function getAllProductsByAdmin(req, res, next) {
//   //const { role } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;
//   try {
//     const products = await Product.find({  }, "-createdAt -updatedAt", {
//       skip,
//       limit,
//     });
//
//     if (!products.length) {
//       throw new HttpError(404, "No Product found");
//     }
//
//     res.status(200).json(products);
//   }
//   catch (error) {
//     next(error);
//   }
//
// }
// async function getProductById(req, res, next) {
//   const { contactId: _id } = req.params;
//   //const { _id: owner } = req.user;
//   const contactById = await Product.findOne({ _id });
//   if (contactById) {
//     res.json(contactById);
//   } else {
//     throw HttpError(404, "Contact not found");
//   }
// }
//
async function addNewProduct(req, res, next) {
  const { _id: owner } = req.user;
  const newContact = await Product.create({ ...req.body, owner });
  res.status(201).json(newContact);
}
//
// async function deleteProduct(req, res, next) {
//   const { contactId: _id } = req.params;
//   const { _id: owner } = req.user;
//   const deleteContact = await Product.findOneAndDelete({ _id, owner });
//   if (deleteContact) {
//     res.json({ message: "contact deleted" });
//   } else {
//     throw HttpError(404);
//   }
// }
//
// async function editProduct(req, res, next) {
//   const { contactId: _id } = req.params;
//   const { _id: owner } = req.user;
//   const updatedContact = await Product.findOneAndUpdate(
//     { _id, owner },
//     req.body,
//     {
//       new: true,
//     }
//   );
//   if (!updatedContact) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(updatedContact);
// }
//
// async function updateProduct(req, res, next) {
//   const { contactId: _id } = req.params;
//   const { _id: owner } = req.user;
//   const updatedContact = await Product.findOneAndUpdate(
//     { _id, owner },
//     req.body,
//     {
//       new: true,
//     }
//   );
//
//   if (!updatedContact) {
//     throw HttpError(404, "Not found");
//   }
//
//   res.json(updatedContact);
// }

module.exports =  {
  getAllProducts: ctrlWrapper(getAllProducts),
  // getContactsById: ctrlWrapper(getProductById),
   addNewProduct: ctrlWrapper(addNewProduct),
  // deleteContact: ctrlWrapper(deleteProduct),
  // editContact: ctrlWrapper(editProduct),
  // updateContact: ctrlWrapper(updateProduct),
};
