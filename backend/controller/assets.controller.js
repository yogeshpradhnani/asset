const path = require('path');
const Asset = require('../models/assets.model.js');
const fs = require('fs');
const moment = require('moment');
const {ObjectId} = require('mongoose');
const User = require('../models/user.model.js');



const createAsset = async (req, res) => {
    try {
        const { name, description ,assignedTo,assignedDate,submittedDate} = req.body;
        let result = await Asset.findOne({ name: name})
        if(result){
            return res.status(409).json({ success: false, message: 'Asset already exists' });
        }
   
        const newAsset = new Asset({
            name,
            description,
        });
     
  
        if (req.body.assignedTo) {
            let username= await User.findOne
            ({ name: assignedTo });
            let todayDate = new Date(); 
            let todayDateFormat = moment(todayDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
            newAsset.assignedTo = username._id;
            newAsset.assignedDate = todayDateFormat;
            
        }
       
        
        let submit ;
        if (req.body.submittedDate) {
         let todayDate = new Date(); 
         let todayDateFormat = moment(todayDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
         submit = todayDateFormat;    
     }
    
        
        if (req.file) {   
            newAsset.imageString= req.file.path
        }
        await newAsset.save();
        return res.status(201).json({
            message: 'Asset created successfully!',
            asset: newAsset
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false, message: 'Error creating asset' ,data:[]});
    }
};
const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find().populate("assignedTo" ,"-email");
        return res.status(200).json({success:true,message:"Assets fetched successfully",data:assets});
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false, message: 'Error fetching assets',data:[] });
    }   
};
const getById = async (req, res,next) => {
    try {
        const ids =req.params.id;
    
        if (!ids) {
            return res.status(400).json({ success:false, message: 'No id provided' ,data:[]});   
        }
            const asset = await Asset.findById(ids).populate("assignedTo" ,"-email");  
        return res.status(200).json({ success:true, message: 'Assets found' ,data:asset});
    } catch (error) {
        
        return res.status(500).json({success:false, message: 'Error fetching assets' })
    }
};

const getAssetByParams= async (req, res, next) => {
    try {
        const { name, description, assignedTo, assignedDate, submittedDate} = req.query;
        let query = {};
        if (name) query.name = new RegExp(name, 'i');
        if (description) query.description = new RegExp(description, 'i');
        if (assignedTo) query.assignedTo = new RegExp(assignedTo, 'i');
        if (assignedDate) query.assignedDate = new RegExp(assignedDate, 'i');
        if (submittedDate) query.submittedDate = new RegExp(submittedDate, 'i');
        const assets = await Asset.find(query).populate("assignedTo" ,"-email");
        if (assets.length === 0) {
            return res.status(404).json({ success:false, message: 'No assets found' });
        } else {
            return res.status(200).json({ success:true, message: 'Assets found' ,data:assets});
        }

            
        }
    catch (error) {
        return next(error);
    }
}
const updateById = async (req, res,next) => {
    try {
        const ids = req.params.id;  
        const { name, description, assignedTo, assignedDate, submittedDate} = req.body;
        // let result = await Asset.findOne({ name: name})
        // if(result){
        //     return res.status(409).json({ success: false, message: 'Asset already exists',data:[] });
        // }
        let assigned ;
        let username
       if (req.body?.assignedTo) {
         username= await User.findOne
        ({ name: assignedTo });
      
        let todayDate = new Date(); 
        let todayDateFormat = moment(todayDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
         assigned = todayDateFormat;    
    }
    
    

    let submit ;
    if (req.body?.submittedDate) {
     let todayDate = new Date(); 
     let todayDateFormat = moment(todayDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
     submit = todayDateFormat;    
 }

    if (req.body?.assignedDate) {
        return res.status(406)
        .json({success: false, message: "Use can't change assignment date",data:[]})   
    }
    let image;
    if (req.file) {
   image=req.file
            
    }

    
    let updatingData={name:name,
        description:description,
        assignedTo:username,
        assignedDate :assigned,
        submittedDate,
        imageString:image || undefined}

        const asset = await Asset.findByIdAndUpdate(ids, updatingData, { new: true });
    
        
        if (!asset) {
            return res.status(404).json({success:false, message: 'Asset not found' ,data:[]});
        }
        return res.status(200).json({
            success:true,
            message :'data updated successfully',
            data:asset
        });
       
        
    } catch (error) {
        console.log(error);
        
   
        return next(error);
    }
}

const deleteMultiple =async (req,res)=>{
    try{
        const ids = req.body._id || req.params.id;
      
        let result;
        if(!ids){
            return res.status(400).json({success:false,message: 'ids are required',data:[]});
        }
      
        
        if(!Array.isArray(ids)){
       result= await Asset.findByIdAndDelete(ids);
        }
        else{
             result = await Asset.deleteMany({
                _id: { $in: ids }
            });
           
        }   
        // if(result.deletedCount>0){
        //     return res.status(200).json({success:true,message: 'Asset deleted',data:[]});
        // }
        // else{
        //     return res.status(500).json({success:false,message: 'Asset not found',data:[]});
        // }
        return res.status(200).json({success:true,message: 'Asset deleted',data:[]});

        }
            
        catch(error){
            console.log(error);
            
            return res.status(500).json({success:false,message: 'Error deleting assets',data:[]});
        }
        
    
}
module.exports = {
 
    getAssetByParams,
  
    updateById,
    createAsset,
    getAllAssets,
    getById,
    deleteMultiple,
   
};
