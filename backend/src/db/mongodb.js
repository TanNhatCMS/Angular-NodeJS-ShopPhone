
const mongoose = require('mongoose');
const {MONGODB_URI, MONGODB_DB_NAME} = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DB_NAME,
            useNewUrlParser: true
        });
        console.info('[Service:Database]✅ Đã Kết Nối Cơ Sở Dữ Liệu đến MongoDB.');
    } catch (error) {
        console.error(`[Service:Database]❌ Connect database is failed with error which is ${error}`);
        process.exit(1);
    }
};
// If mongoose gets disconnected, show this message
mongoose.connection.on('disconnected', () => {
    console.info('[Service:Database] Đã Ngắt Kết Nối Cơ Sở Dữ Liệu đến MongoDB.');
    // [optional] exit app when database is disconnected
    // process.exit(1);
});

// If node exits, terminate mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close().then( () => {
        console.info('INFO: Node is down. So the Mongoose.');
        process.exit(0);
    });
});

module.exports = connectDB;
