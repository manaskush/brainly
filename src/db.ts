import mongoose,{ model,Schema} from "mongoose"
import dotenv from "dotenv";

// Load env variables from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String
})


export const UserModel=model("User", UserSchema);

const ContentSchema= new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:"Tag"}],
    userId:{type:mongoose.Types.ObjectId, ref:"User",required:true}
})

export const ContentModel=model("Content",ContentSchema)