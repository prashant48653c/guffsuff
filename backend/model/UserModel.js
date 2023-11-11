const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    firstname:{
        type:String
    },
    secondname:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
}
)

const UserModel=mongoose.model("Messege",UserSchema)

module.exports=UserModel