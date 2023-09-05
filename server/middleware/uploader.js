const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename: function(req,file,cb) {
        const ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})

const upload = multer({
    storage:storage,
    fileFilter:function(req,file,callback) {
        if (
            file.mimetype == "application/pdf"
        ) {callback(null,true)}
        else {
        console.log('Wrong data type')
        callback(null,false)
    }
}
})

module.exports = upload