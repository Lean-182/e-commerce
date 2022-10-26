const cloudinary = require('../source/cloudinarySource.js');
const express = require('express');
const router = express();
var cors = require('cors');

router.use(express.static('public'));

router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ limit: '10mb', extended: true }));

router.use(cors());

router.get('/images', async (req, res) => {
    const { folder } = req.query;
    const search=`folder:${folder}`
    const { resources } = await cloudinary.search
        .expression(search)
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    console.log(resources)
    //const publicIds = resources.map((file) => file.public_id);
    res.send(resources);
});
router.post('/upload', async (req, res) => {
    const { file, folder, name } = req.body;
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'zt3zbmga',
            folder: folder,
            public_id: name
        });
        console.log(uploadResponse);
        res.json(uploadResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

// const port = process.env.PORT || 3001;
// router.listen(port, () => {
//     console.log('listening on 3001');
// });

module.exports = router;
