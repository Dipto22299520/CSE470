const express = require('express');
const { videoUpload } = require('../middlewares/videoUpload'); 
const router = express.Router();

// Handle GET /api
router.get('/', (req, res) => {
    res.send({ message: 'GET /api is working!' });
});

// Handle POST /api/upload
router.post('/upload', videoUpload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No video uploaded' });
    }
    res.status(200).send({ message: 'Video uploaded successfully', file: req.file });
});

module.exports = router;
