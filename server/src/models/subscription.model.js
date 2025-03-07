import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        planType: { 
            type: String, 
            required: true 
        },
        startDate: { 
            type: Date, 
            required: true 
        },
        endDate: { 
            type: Date, 
            required: true 
        },
        status: { 
            type: String, 
            required: true 
        }
    },
    { timestamps: true }
  );
  
  export const Subscription = mongoose.model("Subscription", subscriptionSchema);