
class ModelProduct {
    constructor(db) {
        this.db = db;
    }

    save(product, cb) {
        this.db.save(product, cb);
    }

    fetchAll(cb) {
        this.db.fetchAll(cb);
    }

    findById(id, cb) {
        this.db.findById(id, cb);
    }

    deleteById(id, cb) {
        this.db.deleteById(id, cb);
    }

    updateProduct(id, updatedProduct, cb) {
        this.db.updateProduct(id, updatedProduct, cb);
    }
}

module.exports = ModelProduct;
