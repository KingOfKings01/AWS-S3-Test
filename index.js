import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import "dotenv/config";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command)
  //Todo: If you want url get expires in 5 seconds
//   const url = await getSignedUrl(s3Client, command, { expiresIn: 5 }); 
  return url;
}

async function main() {
  console.log(
    "Url for my file: ",
    await getObjectURL("pexels-iriser-1408221.jpg")
  );
}

main();

// console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.BUCKET_NAME);
