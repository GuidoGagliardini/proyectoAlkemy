var express = require('express');
var router = express.Router();
const userModel =  require ('./../models/users');
var tokenUserBd = "";

//simulo una verificacion de token.
// en un caso real habria que decodificar el token, y machearlo con una base de datos.
const tokenUser = async (req,res,next)=>{
  const {token}  = req.params;
  tokenUserBd = token;
  res.send(true);

}
//registro el usuario y lo guardo de forma estatica en la base de datos
const registroUser = async (req,res,next) =>{
  try {
    const {email,password} = req.body;

    const obj = {
      email,
      password,
      activado : "1",
      token_verify : tokenUserBd
    }
    userModel.createUser(obj);
    res.json("Usuario okey");
    
  } catch (error) {
    console.log(error);
  }


}
router.get('/:token', tokenUser);
router.post('/', registroUser);
module.exports = router;
