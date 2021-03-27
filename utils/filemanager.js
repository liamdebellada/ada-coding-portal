const fs = require('fs')

exports.folderList = () => { //returns a list of folders & files under a given directory
    return new Promise((resolve, reject) => {
        fs.readdir('./userspace', {withFileTypes: true},(error, data) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    }).then(data => {
        return data
    }).catch(error => error)
}

exports.renameFsObject = (path, name, newName) => { //renames any fs object (files, folders) based on original path and oldname + newname
    return new Promise((resolve, reject) => {
        fs.rename(`${path}/${name}`, `${path}/${newName}`, function(error) {
            if (error) {
                reject(error)
            } else {
                resolve(true)
            }
        })
    })
}


exports.moveFsObject = (path, newPath) => { //moves file or folder based on original path and new path
    return new Promise((resolve, reject) => {
        fs.rename(path, newPath, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve(true)
            }
        })
    })
}

exports.createNewFile = (directory, file) => { //creates a new file with a given directory and file name
    return new Promise((resolve, reject) => {
        fs.open(`${directory}/${file}`, 'w', (error) => {
            error == null ? resolve(true) : resolve(error)
        })
    })
}

exports.createFolder = (directory, name) => { //create a new folder with a given directory and folder name
    return new Promise((resolve, reject) => {
        fs.mkdir(`${directory}/${name}`, { recursive: true },(error) => {
            error == null ? resolve(true) : reject(error)
        })
    })
}
