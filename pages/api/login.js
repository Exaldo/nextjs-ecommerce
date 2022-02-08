import cookie from 'cookie';



const handler = (req, res) => {
    if(req.method ==="POST"){
        const { username, password } = req.body;

        /* Username and password validation */
        if(
            username === process.env.ADMIN_USERNAME && 
            password === process.env.ADMIN_PASSWORD
            ){
            /* put a token in cookies that last 1 hour */
            res.setHeader("Set-Cookie", cookie.serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60, // time cookie is valid
                sameSite: "strict",
                path: "/",
            }));
        };

        res.status(200).json("Succesfull")
    } else {
        res.status(400).json("Wrong credentials!")
    }
}

export default handler;