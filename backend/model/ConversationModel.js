const mongoose=require("mongoose")

const ConversationSchema=mongoose.Schema({
    members:{
        type:Array
    }
},{
    timestamps:true
})

const ConversationModel=mongoose.model("Messege",ConversationSchema)

module.exports=ConversationModel