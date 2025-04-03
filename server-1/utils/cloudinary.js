import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    timeout:60000
})


const uploadToCloudinary=async(fileUri)=>{
    try{
        const response=await cloudinary.uploader.upload(fileUri)
        return response
    }
    catch(err){

        console.log(err)
        throw new Error("FAILED TO UPLOAD IMAGE TO CLOUDINARY")
    }
}

export { uploadToCloudinary, cloudinary };
