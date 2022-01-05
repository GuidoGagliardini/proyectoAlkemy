const knex = require('./../utils/bd');

const createUser = async  (obj)=>{
    try {
            return consulta = await knex(process.env.T_USUARIOS)
                                .insert(obj);
    } catch (error) {
        console.log(error);
    }
}
module.exports={
    createUser
}