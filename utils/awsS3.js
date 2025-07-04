const {PutObjectCommand, S3Client , GetObjectCommand} = require("@aws-sdk/client-s3");
const {awsAccessKey , awsSecretAccessKey , awsRegion , awsBucketName} = require("../config/keys");
const generateCode = require("./generateCode");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
    region:awsRegion,
    credentials:{
        accessKeyId:awsAccessKey,
        secretAccessKey:awsSecretAccessKey
    }
})

const uploadFileToS3 = async ({file, ext}) => {
    const Key = `${generateCode(12)}_${Date.now()}${ext}`

    const params = {
        Bucket:awsBucketName,
        Body: file.buffer,
        Key,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params);

    try {
        await client.send(command);
        return Key;
    } catch (error) {
        console.log(error);
    }
}

const signedUrl = async (key) => {
    const params = {
        Bucket: awsBucketName,
        Key: key, // ✅ Capitalized 'Key'
    };

    const command = new GetObjectCommand(params);

    try {
        const url = await getSignedUrl(client, command, { expiresIn: 60 }); // expires in 60 seconds
        return url;
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw new Error("Failed to generate signed URL");
    }
}

module.exports = {
    uploadFileToS3,
    signedUrl
}