const {mongoose, Schema} = require('mongoose')
const userModel = require('./user.model')


const assetSchema = Schema({
    name: {type: String},
    description: {type: String},
    assignedTo: { type: Schema.Types.ObjectId, ref:mongoose.model('User', userModel.userSchema) ,default: undefined},
    assignedDate: {type: String},
    submittedDate: {type: String},
    imageString: {type: String}
})

module.exports = mongoose.model('Asset', assetSchema)