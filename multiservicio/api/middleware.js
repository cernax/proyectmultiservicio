const multer = require("multer");
const util = require("util");
const GridFsStorage = require("multer-gridfs-storage");

const uri = 'mongodb://localhost:27017';
const dbName = 'multiservicio';

const storage = new GridFsStorage({
    url: uri + '/' + dbName,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = multer({ storage });
