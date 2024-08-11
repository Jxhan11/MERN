// Home Logic
const home = async (req,res)=>{
    try {
        res.status(200).send("Welcome to MERN using controller home")
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"Error in your code"})
    }
};
// Register Logic
const register = async (req,res)=>{
    try {
        res.status(200).send({messgae:"Welcome To reg page"})

    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"Error in code"})

    }
};

module.exports = {home,register};
