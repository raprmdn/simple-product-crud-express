const multer = require('multer');
const { extensionSupport } = require('../helpers/extensions.helper');
const fs = require('fs');
const { responseValidationErrors } = require('../utils/response.utils');
const { StatusCodes: status } = require('http-status-codes');

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
        if (!extensionSupport(file.mimetype)) {
            cb(new Error('File format is not supported'), false);
        } else {
            cb(null, true);
        }
    },
    limits: { fileSize: 2000000 }
});

const uploadProductImg = upload('products').fields([
    { name: 'full_image', maxCount: 1 },
    { name: 'half_image', maxCount: 1 }
]);

const uploadItemImg = upload('items').single('icon');

module.exports = {
    uploadProductImage: async (req, res, next) => {
        // eslint-disable-next-line consistent-return
        uploadProductImg(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(status.UNPROCESSABLE_ENTITY).json(responseValidationErrors(err.message));
            } else if (err) {
                return res.status(status.UNPROCESSABLE_ENTITY).json(responseValidationErrors(err.message));
            }

            next();
        });
    },
    uploadItemImage: (req, res, next) => {
        // eslint-disable-next-line consistent-return
        uploadItemImg(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(status.UNPROCESSABLE_ENTITY).json(responseValidationErrors(err.message));
            } else if (err) {
                return res.status(status.UNPROCESSABLE_ENTITY).json(responseValidationErrors(err.message));
            }

            next();
        });
    }
};
