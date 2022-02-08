import dbConnect from "../../../db/mongo";
import Order from "../../../models/Order";


const handler = async (req, res) => {
    const { method, query:{id}} = req;

    if( method === "GET"){
        
    }

    if( method === "PUT"){
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true, // return newest version
            });
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if( method === "DELETE"){

    }
}

export default handler;