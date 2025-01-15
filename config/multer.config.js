const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary.config');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'posts', // Carpeta en Cloudinary donde se almacenarán las imágenes
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
        transformation: [{ width: 800, height: 600, crop: 'limit' }], // Opcional: ajustes de tamaño
    },
});

const upload = multer({ storage });

module.exports = upload;
