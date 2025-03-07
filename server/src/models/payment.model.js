import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        amount: { 
            type: Number, 
            required: true 
        },
        paymentDate: { 
            type: Date, 
            required: true 
        },
        paymentMethod: { 
            type: String, 
            required: true 
        },
        status: { 
            type: String, 
            required: true 
        }
    },
    { timestamps: true }
  );
  
  export const Payment = mongoose.model("Payment", paymentSchema);