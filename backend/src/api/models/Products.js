const {Schema, model} = require('mongoose');
const {handleSaveError} = require('./hooks');


const productSchema = new Schema({
    technicalInfo: [
        {
            _id: false,
            title: { type: String },
            content: [
                {
                    _id: false,
                    name: { type: String },
                    description: { type: String }
                }
            ]
        }
    ],
    variants: [
        {
            _id: false,
            productStatus: {type: String},
            color: {type: String},
            ram: {type: String},
            storage: {type: String},
            price: {type: Number},
            promotionalPrice: {type: Number},
            promotionStatus: {type: Boolean},
            stockQuantity: {type: Number},
            images: {
                mainImage: {type: String},  // URL to the main image
                imageGallery: {type: [String]}  // Array of URLs to other images
            }
        }
    ],
    ratings: {
        averageRating: {type: Number}
    },
    brand: {
        type: String,
        enum: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Nokia', 'OnePlus', 'Sony']
    },
    category: {type: String},
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {type: String, required: true, unique: true},
    shortDescription: {type: String, required: true},
    detailedDescription: {type: String, required: true},
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
