const fs = require('fs');
const path = require('path');
const fileUtils = {};
const getFilePath = (filename) => {
    return path.join(path.dirname(process.mainModule.filename), filename);
};


fileUtils.readFileContent = (filename,cb) => {
    const p = path.join(path.dirname(process.mainModule.filename), '../database', filename);
    fs.readFile(p, 'utf-8',(err, fileContent) => {
        if (err) {
            return cb(err, []);
        }
        try {
            fileContent = JSON.parse(fileContent);
        } catch (err) {
            return cb(err, []);
        }
        cb(null, fileContent);
    });
};

fileUtils.writeFileContent = (data, cb) => {
    fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return cb(err);
        }
        cb(null);
    });
};


fileUtils.updateDataToFile = async (fileName, newData) => {
    const baseDir = './database';
    const filePath = path.join(baseDir, fileName);

    try {
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8');
        console.log(`${fileName} has been updated successfully.`);
    } catch (error) {
        console.error(`Failed to update ${fileName}: ${error.message}`);
    }
};
fileUtils.getJsonFileContent = async (filename) => {
    const baseDir = '../database';
    try {
        const filePath =  getFilePath(path.join(baseDir, filename)); // Đường dẫn đến tệp JSON, thay đổi đường dẫn tùy vào vị trí tệp của bạn
        console.log(filePath);
        let fileContent;
        await fs.readFile(filePath, 'utf-8', (err, data) => {
            fileContent = data;
        });
        if (!fileContent) {
            throw new Error('Failed to read JSON file');
        }
        return JSON.parse(fileContent); // Chuyển đổi nội dung từ chuỗi JSON sang đối tượng JavaScript
    } catch (error) {
        throw new Error(`Failed to read JSON file '${filename}': ${error.message}`);
    }
}

module.exports = fileUtils;
