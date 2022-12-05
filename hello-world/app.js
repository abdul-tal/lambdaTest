// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const { S3Client, ListObjectsCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client();
const bucketName = 'test-bucket-for-lambda-01';

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        const bucketParams = { Bucket: bucketName };
        const data = await s3Client.send(new ListObjectsCommand(bucketParams));
        let noOfObjects = data.Contents;
        for (let i = 0; i < noOfObjects.length; i++) {
        await s3Client.send(
            new DeleteObjectCommand({
            Bucket: bucketParams.Bucket,
            Key: noOfObjects[i].Key,
            })
        );
        }
        console.log("Success. Objects deleted.");
        // return data;
        response = data;
        // const s3put = await s3Client.send(new PutObjectCommand(uploadParams));
        // console.log('s3put', s3put);
        // response = {
        //     'statusCode': 200,
        //     'body': JSON.stringify({
        //         message: 'hello world - local lambda function',
        //         // location: ret.data.trim()
        //     })
        // }
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};
