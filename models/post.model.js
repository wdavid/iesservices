const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        validate: {
            validator: function(value) {
                return Array.isArray(value) && value.every(url => typeof url === 'string');
            },
            message: 'Las imágenes deben ser un arreglo de cadenas.'
        }
    }
}, { timestamps: true });

module.exports = Mongoose.model('Post', PostSchema);