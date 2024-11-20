const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 1000000 // 1MB
    },
    fileFilter(req, file, cb,error) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(error);
        }
        cb(null, true);
    },
    storage: multer.diskStorage({
        destination: './uploads/',
        filename(req, file, cb) {
            let date= new Date()
            let d= date.toDateString()

            cb(null,d  + '-' + file.originalname);
        }
    })
    
})

module.exports = upload;