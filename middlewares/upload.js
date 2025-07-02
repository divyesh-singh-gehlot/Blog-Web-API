const multer = require("multer");
const  path  = require("path");
const generateCode = require("../utils/generateCode");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        //orignal_filename_12DigitRandomCode.extension
        const orignalName = file.originalname;
        const extension = path.extname(orignalName);
        const fileName = orignalName.replace(extension,"");
        const compressedName = fileName.split(" ").join("_");
        const lowerCaseName = compressedName.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowerCaseName}_${code}${extension}`;

        callback(null,finalFile);
    }
})

const upload = multer({
    storage,
    fileFilter : (req, file , callback) => {
        const mimeType = file.mimetype;
        if(mimeType==="image/jpg" || mimeType==="image/jpeg" || mimeType==="image/png" || mimeType==="application/pdf"){
            callback(null,true);
        }else{
            callback(new Error("Only .jpg , .jpeg, .png or .pdf format is allowed"));
        }
    }
})

module.exports = upload;