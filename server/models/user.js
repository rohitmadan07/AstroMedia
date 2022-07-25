import mongoose from "mongoose";

//creating mongoose schema

const userSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    id: {type:String},

}); //each user will have these things

const UserModel = mongoose.model('UserModel',userSchema);
export default UserModel;