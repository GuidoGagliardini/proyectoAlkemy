var express = require('express');
var axios = require('axios')
var router = express.Router();


const cargaDatos = async (req,res,next)=>{
  //tuve algunas complicaciones para consumir la API, por ende tome una forma medio "sucia", de hacer el
  //el recorrido de la api, y lo hice buscando por LETRA A para que me de los ID ordenados.
  //ya que la API no le encontre la forma de que me de todos los superHeroes por ID sin search ni por ID.
  const result = await  axios.get("https://superheroapi.com/api.php/10227107990104693/search/a");
  console.log(result.data.results);
  res.json(result.data);
 
}



router.get('/',cargaDatos)



module.exports = router;
