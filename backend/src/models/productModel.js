const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Giá gốc
    discountPrice: { type: Number }, // Giá giảm
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    technicalInfo: {
        //Màn hình
        screen: {
            technology: { type: String },//Công nghệ màn hình
            resolution: { type: String },//Độ phân giải
            size: { type: String },//Màn hình rộng
            maxBrightness: { type: String },//Độ sáng tối đa
            touchGlass: { type: String }//Mặt kính cảm ứng
        },
        rearCamera: {//Camera sau
            resolution: { type: String }, //Độ phân giải
            videoRecording: { type: String },//Quay phim
            flash: { type: String },//Đèn Flash
            features: { type: String }//Tính năng
        },
        frontCamera: {//Camera trước
            resolution: { type: String },//Độ phân giải
            features: { type: String }//Tính năng
        },
        osCpu: {//Hệ điều hành và CPU
            os: { type: String },//Hệ điều hành
            cpu: { type: String },//CPU
            cpuSpeed: { type: String },//Tốc độ CPU
            gpu: { type: String }//GPU
        },
        memoryStorage: {//Bộ nhớ và lưu trữ
            ram: { type: String },//RAM
            storage: { type: String },//Bộ nhớ trong
            availableStorage: { type: String },//Bộ nhớ khả dụng
            memoryCard: { type: String },//Thẻ nhớ ngoài
            contacts: { type: String }//Danh bạ
        },
        connectivity: {//Kết nối
            mobileNetwork: { type: String },//Mạng di động
            sim: { type: String },//SIM
            wifi: { type: String },//Wifi
            gps: { type: String },//GPS
            bluetooth: { type: String },//Bluetooth
            chargingPort: { type: String },//Cổng sạc
            headphoneJack: { type: String },//Jack tai nghe
            otherConnections: { type: String }//Kết nối khác
        },
        batteryCharging: {//Pin và sạc
            capacity: { type: String },//Dung lượng
            type: { type: String },//Loại
            maxChargingSupport: { type: String },//Hỗ trợ sạc nhanh
            includedCharger: { type: String },//Sạc kèm theo
            batteryTechnology: { type: String }//Công nghệ pin
        },
        utilities: {//Tiện ích
            advancedSecurity: { type: String },//Bảo mật nâng cao
            specialFeatures: { type: String },//Tính năng đặc biệt
            waterDustResistance: { type: String },//Chống nước bụi
            recording: { type: String },//Ghi âm
            radio: { type: String },//Radio
            movieWatching: { type: String },//Xem phim
            musicListening: { type: String }//Nghe nhạc
        },
        generalInfo: {//Thông tin chung
            design: { type: String },//Thiết kế
            material: { type: String },//Chất liệu
            dimensionsWeight: { type: String },//Kích thước và trọng lượng
            releaseTime: { type: String }//Thời điểm ra mắt
        }
    },
    brand: { type: String , required: true},//Thương hiệu
    mainImage: { type: String }, // URL của ảnh đại diện sản phẩm
    detailedImages: { type: [String] }, // URL của các ảnh chi tiết sản phẩm
    colors: { type: [String] } // Màu sắc sản phẩm
});

class ProductModel {
    constructor() {
        this.model = mongoose.model('Product', ProductSchema);
    }

    async createProduct(data) {
        const product = new this.model(data);
        return await product.save();
    }

    async getProductById(id) {
        return await this.model.findById(id).exec();
    }

    async updateProduct(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteProduct(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAllProducts() {
        return await this.model.find().exec();
    }
}

module.exports = new ProductModel();
