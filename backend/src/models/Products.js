const {Schema, model} = require('mongoose');
const {handleSaveError} = require('./hooks');


const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String},
    description: {type: String, required: true},
    screen: { type: String },
    backCamera : { type: String },
    frontCamera: { type: String },
    productStatus: { type: String },
    color: { type: String },
    ram: { type: String },
    storage: { type: String },
    price: { type: Number },
    promotionalPrice: { type: Number },
    promotionStatus: { type: Boolean },
    stockQuantity: { type: Number },
    thumbnail: {type: String},
    category: {type: String},
    images: [
        {
            _id: false,
            url: { type: String }
        }
    ],
    brand: {
        type: String,
        enum: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Nokia', 'OnePlus', 'Sony']
    },
    ratings: {
        averageRating: {type: Number},
        totalRatings: {type: Number}
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date},
}, {
    timestamps: true,
    versionKey: false
});

productSchema.post("save", handleSaveError);

productSchema.pre("findOneAndUpdate", function (next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
});

productSchema.post("findOneAndUpdate", handleSaveError);

const Product = model('product', productSchema);

module.exports = Product;
