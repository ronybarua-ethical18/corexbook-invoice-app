// const MarchantModel = require("../models/marchant");
// const { ErrorHandler } = require("../../../helpers/errors");
// const jwt = require("jsonwebtoken")

// const createMarchant = async (req, res, next) => {
//   try {
//     const marchant = await MarchantModel.create(req.body);
//     var token = jwt.sign(marchant, 'shhhhh');
//     console.log(token)

//     res.send({
//       status: true,
//       marchant,
//     });
//   } catch (err) {
//     console.log(err)
//     next(err);
//   }
// };
// const verifyMarchant=async(req,res,next)=>{
//   try{
//     const info=jwt.decode(req.params.token);
//     if(!info){
//       throw new ErrorHandler("Invalid Token",401)
//     }
//     const {first_name,last_name,password}=req.body

//     res.send({
//       info
//     })

//   }catch(err){
//     next(err)
//   }
// }

// module.exports = {
//   createMarchant,
//   verifyMarchant
// };
