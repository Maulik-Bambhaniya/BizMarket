import mongoose, {Schema} from "mongoose";


const agencySchema = new Schema(
    {
        agencyName: { 
            type: String, 
            required: true 
        },
        agencyOwner: { 
            type: String, 
            required: true 
        },
        agencyDescription: { 
            type: String 
        },
        agencyEmail: { 
            type: String, 
            required: true 
        },
        agencyWebsite: { 
            type: String 
        },
        services: [
            { type: String }
        ]
    },
    { timestamps: true }
  );

  export const Agency = mongoose.model("Agency", agencySchema);