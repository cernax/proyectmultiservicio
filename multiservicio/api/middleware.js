const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dvdvnsjv0',
    api_key: '481121985867285',
    api_secret: 'VcxL4snzHjluap1CNc4pEA2-x2k',
    secure: true
});

async function uploadImage(filepath, nameuser){
    return await cloudinary.uploader.upload(filepath, {
        folder: nameuser
    });
}

async function deleteImage(imgid){
    return await cloudinary.uploader.destroy(imgid);
}

module.exports = {uploadImage, deleteImage};
