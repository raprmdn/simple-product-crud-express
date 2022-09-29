const multer = require('multer');
const { extensionSupport } = require('../helpers/extensions.helper');
const fs = require('fs');
const { response } = require('../utils/response.utils');

const upload = (path) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const filePath = `./public/uploads/${path}`;
            fs.mkdirSync(filePath, { recursive: true });
            cb(null, filePath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (!extensionSupport(file.mimetype) || !file) {
            cb(new Error('File format is not supported'), false);
        }

        cb(null, true);
    },
    limits: { fileSize: 2000000 }
});

module.exports = {
    uploadProductImage: (req, res, next) => {
        upload('products').fields([
            { name: 'full_image', maxCount: 1 },
            { name: 'half_image', maxCount: 1 }
            // eslint-disable-next-line consistent-return
        ])(req, res, (err) => {
            if (err instanceof multer.MulterError) return response(res, 422, false, err.message);
            if (err) return response(res, 422, false, err.message);

            next();
        });
    }
};
