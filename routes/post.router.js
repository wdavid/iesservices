const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const postController = require('../controllers/post.controller');
const { createPostValidators } = require('../validators/post.validators');
const { authentication } = require('../middlewares/auth.middlewares');


router.get('/', postController.findAll);

router.post('/', 
    createPostValidators,
    authentication,
    postController.create,
    upload.array('images', 5)
);

router.get('/:id', postController.findOneById);

router.delete('/:id', postController.deleteById);



module.exports = router;

