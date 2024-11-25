const createUser = async (req, res) => {
    try {
        const { name, email,passord} = req.body;
        let result = await Asset.findOne({ name: name})
        if(result){
            return res.status(409).json({ success: false, message: 'Asset already exists',data:[] });
        }
   
        const newAsset = new User({
            name, email,passord
        });
    
        await newUser.save();
        return res.status(201).json({
            message: 'Asset created successfully!',
            asset: newAsset
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false, message: 'Error creating asset' });
    }
};

module.exports={
    createUser,
}