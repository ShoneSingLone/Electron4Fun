const fs = require('fs');

export let writeFile = function writeFile(file, data, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, encoding, function (err) {
            if (err) reject(err);
            else resolve(file + ' write sucess.');
        })
    })
};

export let appendFile = function writeFile(file, data, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, data, encoding, function (err) {
            if (err) reject(err);
            else resolve(file + ' write sucess.');
        })
    })
};

export let readFile = function (file, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    })
};

export let readdir = function (file, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.readdir(file, encoding, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    })
};
export let stat = function (file, encoding = "utf-8") {
    return new Promise((resolve, reject) => {
        fs.stat(file, function (err, stat) {
            if (err) reject(err);
            else resolve(stat);
        })
    })
};

export let copyFile = function (source, destination, isDelete = false) {
    if (isDelete) {
        return (function () {
                return new Promise((resolve, reject) => {
                    fs.copyFile(source, destination, (err) => {
                        if (err) reject(err);
                        else resolve(source + ' was copied to' + destination);
                    });
                });
            })()
            .then((data) => {
                return unlink(source);
            })
    } else {
        return new Promise((resolve, reject) => {
            fs.copyFile(source, destination, (err) => {
                if (err) reject(err);
                else resolve(source + ' was copied to' + destination);
            });
        });
    }
};

// 删除文件
export let unlink = function (path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) reject(err);
            else resolve(path + ' was removed');
        });
    });
};
export let mkdir = function (path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, (exists) => {
            exists ? resolve(path + 'exist') : fs.mkdir(path, (err) => {
                if (err) reject(err);
                else resolve(path + 'exist');
            })
        });
    });
};
//删除非空文件目录，如果path是文件而非文件目录会报错
export let rmdir = function (path) {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(path + ' was removed');
            }
        });
    });
}

export let exists = function (path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, (exists) => {
            exists ? resolve(path) :
                reject(false);
        })
    });
};