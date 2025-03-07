import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        content: { 
            type: String, // cloudinary url
            required: true 
        },
        authorId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        }
    },
    { timestamps: true }
  );
  
  export const Post = mongoose.model("Post", postSchema);