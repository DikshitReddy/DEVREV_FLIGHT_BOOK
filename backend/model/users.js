const {Schema, model, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    email:String,
    name:String,
    roles:String,
    password:String,
    token:String,
    flights:[{type:mongoose.SchemaTypes.ObjectId, ref:'Flight'}]
});

const User = model("User", userSchema);
module.exports = User;