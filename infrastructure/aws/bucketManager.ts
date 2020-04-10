import { Service } from "typedi";
import AWS from 'aws-sdk'
import mime from 'mime-types'
import { v4 as uuid } from 'uuid'
import { extname } from 'path'

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const bucketName = 'pedal-images'

@Service()
export class BucketManager {

    createObject(filename): { url: string, id: string } {
        const hash = uuid()
        const contentType = mime.contentType(filename)
        const ext = extname(filename)
        console.log(hash + ext)
        const url = s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: hash + ext,
            ContentType: contentType,
            Expires: 60 * 60
        })
        return { url, id: hash }
    }

    getObjectUrl(filename): string {
        return `https://pedal-images.s3.amazonaws.com/${filename}`
    }
}