const fs = require('fs');

module.exports = {
    removeFieldsUploadedFile: ({ ...uploadedFiles }) => {
        const uploadedFilesKeys = Object.keys(uploadedFiles);
        uploadedFilesKeys.forEach((key) => {
            uploadedFiles[key].forEach((file) => {
                fs.unlinkSync(file.path);
            });
        });
    }
};
