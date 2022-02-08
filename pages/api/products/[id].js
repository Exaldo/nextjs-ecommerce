import dbConnect from "../../../db/mongo"
import Product from "../../../models/Product"

export default async function handler(req, res){
    
    const {
        method, 
        query:{ id },
        cookies
    } = req;

    const token = cookies.token; // extract admin token from cookies


    dbConnect();


    if(method === "GET"){
        try {
            const product = await Product.findById(id);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }


    
    if(method === "PUT"){

        /* Validate if user is admin*/
        if(!token || token !== process.env.token){
            return res.status(401).json("You don't have permission for this")
        }

        try {
            await Product.findByIdAndUpdate(id, req.body, {
                new: true, // return newest version
            });
            res.status(201).json("The product has been deleted!")
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === "DELETE"){

        /* Validate if user is admin*/
        if(!token || token !== process.env.token){
            return res.status(401).json("You don't have permission for this")
        }

        try {
            const product = await Product.findOneAndDelete(id );
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}