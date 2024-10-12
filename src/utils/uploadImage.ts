import { v2 as cloudinary } from 'cloudinary'

export const uploadImage = async (img: string) => {
  try {
    const imgObj = await cloudinary.uploader.upload(img, {
      height: 360,
      width: 640,
      crop: 'fit',
      quality: 95,
      folder: 'garden-hub'
    })
    return imgObj.secure_url
  } catch (error) {
    console.log(error)
    throw new Error('Could not upload image')
  }
}
