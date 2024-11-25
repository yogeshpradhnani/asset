const express = require('express');
const { createAsset, getAllAssets,getById, updateById,getAssetByParams,deleteMultiple} = require('../controller/assets.controller.js');
const upload = require('../middleware/multer.middlerware.js');
const router = express.Router();

router.post('/create',upload.single(
    'imageString'
), createAsset);

router.get('/', getAllAssets);
router.get('/filter', getAssetByParams);
router.get('/:id', getById);
router.put('/update/:id',upload.single(
    'imageString'
), updateById);
router.delete('/delete/:id', deleteMultiple);


module.exports = router;
