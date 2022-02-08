import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 60,
    },

    desc :{
        type: String,
        required: true,
        maxlength: 200,
    },

    img :{
        type: String,
        required: true,
    },

    price:{
        type: [Number],
        required: true
    },

    extraOptions:{
        type: [
            {
                text:{type:String, required:true}, 
                price:{type:Number, required:true}
            },
        ],
        /* Example: 
            text:{ extra Cheese} 
            price:{ $5.00 } 
        */
    },
},
    { timestamps: true }
);

                // validation to check if there is a model product already created on the db
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);