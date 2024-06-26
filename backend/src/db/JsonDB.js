const APIError = require("../utils/error");
const { readFileContent, writeFileContent } = require('../utils/fileUtils');

class JsonDB {
    constructor(filename) {
        this.filename = filename;
    }

    save(data) {
        data.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        readFileContent(this.filename, (err, result) => {
            if (err) {
                 throw new APIError(`Save failed: ${err.message}`, 500);
            }
            result.push(data);
            writeFileContent(this.filename, result, (err) => {
                if (err) {
                     throw new APIError(`Save failed: ${err.message}`, 500);
                }
                return  { insertedId: data.id };
            });
        });
    }

    fetchAll() {
        readFileContent(this.filename, (err, result) => {
            if (err) {
                 throw new APIError(`Fetch failed: ${err.message}`, 500);
            }
            return result;
        });
    }

    findById(id) {
        if (!id || id.length < 1) {
             throw new APIError(`Invalid product ID`, 400);
        }
        readFileContent(this.filename, (err, result) => {
            if (err) {
                 throw new APIError(`Fetch failed: ${err.message}`, 500);
            }
            const data = result.find(p => p.id === id);
            if (!data) {
                 throw new APIError(`Product not found`, 404);
            }
            return data;
        });
    }

    deleteById(id) {
        if (!id || id.length < 1) {
             throw new APIError(`Invalid product ID`, 400);
        }
        readFileContent(this.filename, (err, result) => {
            if (err) {
                 throw new APIError(`Delete failed: ${err.message}`, 500);
            }
            const updated = result.filter(p => p.id !== id);
            writeFileContent(this.filename, updated, (err) => {
                if (err) {
                     throw new APIError(`Delete failed: ${err.message}`, 500);
                }
                return true;
            });
        });
    }

    updateById(id, data) {
        if (!id || id.length < 1) {
             throw new APIError(`Invalid product ID`, 400);
        }
        readFileContent(this.filename, (err, result) => {
            if (err) {
                 throw new APIError(`Update failed: ${err.message}`, 500);
            }
            const resultIndex = result.findIndex(p => p.id === id);
            if (resultIndex === -1) {
                 throw new Error(`Update failed: Product not found`, 404);
            }
            result[resultIndex] = { ...result[resultIndex], ...data };
            writeFileContent(this.filename, result, (err) => {
                if (err) {
                     throw new Error(`Update failed: ${err.message}`, 500);
                }
                return true;
            });
        });
    }

}

module.exports = JsonDB;
