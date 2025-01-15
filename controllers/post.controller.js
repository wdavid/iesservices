const Post = require('../models/post.model');
const controller = {};
const Mongoose = require('mongoose');
const debug = require('debug')('app:post-controller');


// Crear un nuevo post
controller.create = async (req, res, next) => {
    try {
        const { userId, title, description, fecha } = req.body;

        // Validar que los datos necesarios estén presentes
        if (!userId || !title || !description) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        // Crear el registro del post
        const post = new Post({
            userId,
            title,
            description,
            fecha: fecha || Date.now(),
            images: req.files?.map(file => file.path) || [], // Aquí se agregan las URLs de las imágenes si están presentes
        });

        // Guardar en la base de datos
        const postSave = await post.save();
        if (!postSave) {
            return res.status(400).json({ error: "Error creando el post" });
        }

        return res.status(201).json(postSave);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


// Obtener todos los registros de consumo
controller.findAll = async (req, res, next) => {
    try {
        // Buscar registros con información del usuario
        const posts = await Post.find().populate('userId', 'username email');
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: "Posts not found" });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Obtener un registro de consumo por ID
controller.findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('userId', 'username email');
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Eliminar un registro de consumo por ID
controller.deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = controller;
