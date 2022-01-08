import axios from 'axios'

export default axios.create({
    baseURL:"http://localhost:3000/"
});

//creo la peticion al back con la base URL de mi back.