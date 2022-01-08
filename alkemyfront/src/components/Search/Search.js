import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './search.css'

const Search = (props) => {
    const [busqueda,setBusqueda] = useState([]);
    const [datosBusqueda,setDatosBusqueda] = useState([]);
    const routerHistory = useHistory();
    const busquedaFuncion  = async (e)=>{
            setDatosBusqueda(props.data)
            await setBusqueda(e.target.value);
            datosBusqueda.filter((heroe)=>{
            console.log(busqueda.length)
             if ( heroe.name === busqueda ) {
                console.log("Se encontro el nombre");
                    alert(`sera redirigido al heroe buscado...
                            ${
                            routerHistory.push(`/heroe/${heroe.id}`)
                            }`)
             }else{

                console.log("No result")
                // implemetando algo de JS puro
                // const result =  document.getElementsByTagName('input');
                // result.setAttribute("placeholder","No se encontraron resultados");
             }
              
           });

    }
    return ( <>
        <div className="table-responsive">
                <div className="barraBusqueda">

                    <input type="text" 
                    type="text"
                    placeholder="2 toques barra espaciadora al terminar de escribir"
                    className="textField"
                    name="busqueda"
                    value={busqueda}
                    onChange={busquedaFuncion}
                    id='inputSearch'/>


                <button type="button" className="btnBuscar">

                <FontAwesomeIcon icon={faSearch} />
                </button>
                </div>


        </div>
    
    </>  );
}
 
export default Search;