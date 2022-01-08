import React, { useEffect,useState } from 'react';
import api from './../../api';
import Login from './../Login';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../common/Loading';
import { Container,Row,Col, ListGroup } from 'react-bootstrap';
import Search from '../Search/Search';
import lodash from 'lodash';
const Home = ({props,handle,handle2,data}) => {
    const routerHistory = useHistory();
    const [datos,setDatos] = useState([]);
    const infoHeroes = [];
    const [istFetching,setIsfetching] = useState(true);

    const totalPowerStats1 = [];
    const totalPowerStats2 = [];
    const totalPowerStats3 = [];
    const totalPowerStats4 = [];
    const totalPowerStats5 = [];
    const totalPowerStats6 = [];

    const passToken =(tokens)=>{
            console.log("HOME", tokens);
    }
    <Login passToken={passToken} />


    const resultSession = localStorage.getItem('token');

    
    const cargaDeDatos = async () =>{
        //Realizo la peticion al backEnd para evitar errores de CORS POLICY.
        //el back devuelve los heroes.
        //Otra forma y buena practica de hacerlo es haciendo un hook personalizado, que 
        //llame dieracemente a una funcion similar a la que estoy haciendo aqui abajo.
         
        let result =  await api.get("/index").then((res)=>{
            console.log(res.data);
            setDatos(res.data.results)
            infoHeroes.push(res.data.results);
            setIsfetching(false);
        })
        
       
    
    }

    //creo funciones en el useEffect, para ocultar el footer, y para ocultar y mostrar el boton salir del nav.
    //genero un useEffect asi cada vez que se renderiza el componente hace la peticion.

   
    useEffect(()=>{
        const footer = async ()=>{
            try {
                handle(true);
            } catch (error) {
                
            }
            return ()=>handle(true);
        }
        const nav = async ()=>{
            try {
                handle2(true);
            } catch (error) {
                
            }
            return ()=>handle2(false);
        }
    cargaDeDatos();
    footer();
    nav();
   
    },[handle,handle2])
   

    //funcion para ocultar el footer desde un boton.
    const footerOut =(e)=>{
      if(e) handle(false);
    };
    const footerOn = (e)=>{
        if(e) handle(true);
    };

    //Filtro los equipos por Race y armo 6 equipos, luego como pide el challenge, cada equipo tiene        un   max      de   6 integrantes.
    const filterByRace =(equipo, race="")=>
        equipo.filter((heroe)=> heroe.appearance.race === race);
    const teamHuman = filterByRace(datos, "Human");
    const teamHumanKree =  filterByRace(datos,"Human-Kree");
    const teamAlpha = filterByRace(datos,"Alpha");
    const teamMutant = filterByRace(datos,"Mutant");
    const teamTalokite= filterByRace(datos,"Talokite");
    const teamSinRace = filterByRace(datos, "null");

    const elimino=(e,id)=>{
      
        delete teamHuman[id];
    };
    return ( <>
    {!resultSession ? (alert("No tiene permisos para este sitio"), routerHistory.push('login')) :
    <><div>
                <div className="m-0 row  justify-content-center">
                    <div className="col-auto">
                        <button onClick={footerOut} className='btn btn-block bg-success mb-2 mt-2 ml-2'>Quitar Footer</button>
                    </div>
                    <div className="col-auto">
                        <button onClick={footerOn} className='btn btn-block  bg-success mb-2 mt-2'>Ver Footer</button>
                    </div>
                   
                </div>
                <div className="m-0 row  justify-content-center">
                {istFetching && <Loading /> }
                </div>
            </div>

        {/* muestro los equipos utilizando reactBoostrap. armando un Grid y filtrando las columnas por equipo */}
            <Container >
                <Search data ={datos}/>
                <Row>

                    {/* Equipo 1 */}
                    <Col border="primary" xs={{order : 'first'}}><h3>Team Human</h3>
                    <h5>Nombres</h5>
                    {teamHuman?.slice(0,6).map((heroe)=>   
                        <>
                        {totalPowerStats1.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))}
                       
                        <b>Ver 👉</b>  <Link  to={`/heroe/${heroe.id}`} key={heroe.id}> <b>{heroe.name} </b>    </Link>
                        
                        <button onClick={delete datos[heroe.id]} className='btn bg-danger mb-2'>Eliminar jugador</button>   
                        
                        </>  
                        )} 

                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats1)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamHuman.length}</p>
                        <p><b>Inteligencia total:</b></p>
                       
                        


                    </Col>

                    {/* Equipo 2 */}
                    <Col border="primary" xs={{order : 'first'}}><h3>Team HumanKree </h3>
                    <h5>Nombres</h5>
                    {teamHumanKree?.slice(0,6).map((heroe)=>   
                        <>
                        {totalPowerStats2.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))}
                        <div>
                        <b>Ver 👉</b> <Link  to={`/heroe/${heroe.id}`} key={heroe.id}>    <b>{heroe.name} </b> </Link>
                        <button className='btn bg-danger mb-2 align-self-end'>Eliminar jugador</button>
                        </div>  
                        </>  
                        )} 

                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats2)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamHumanKree.length}</p>
                        <p><b>Inteligencia total:</b></p>
                        


                    </Col>
                    {/* Equipo 3 */}

                    <Col border="primary" xs={{order : 'first'}}><h3>   Team  </h3>
                    <h3>Alpha</h3>
                    <h5>Nombres</h5>
                    {teamAlpha?.slice(0,6).map((heroe)=>   
                        <>
                        {totalPowerStats3.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))}
                        <div>
                        <b>Ver 👉</b>  <Link  to={`/heroe/${heroe.id}`} key={heroe.id}>   <b>{heroe.name} </b>  </Link>
                        <button className='btn bg-danger mb-2'>Eliminar jugador</button>
                        </div>  
                        </>  
                        )} 

                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats3)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamAlpha.length}</p>
                        <p><b>Inteligencia total:</b></p>
                       
                        


                    </Col>
            
                    {/* Equipo 4 */}   
                    <Col xs={{order : ''}}><h3>Team Mutant</h3>
                    <h5>Nombres</h5>
                    {teamMutant?.slice(0,6).map((heroe)=>   
                        <>
                        <div>
                        <b>Ver 👉</b> <Link  to={`/heroe/${heroe.id}`} key={heroe.id}>    <b>{heroe.name} </b>   </Link>

                        <button className='btn bg-danger mb-2'>Eliminar jugador</button> 
                        </div>
                         
                            {totalPowerStats4.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))} 

                         </>  
                        )} 
                        
                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats4)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamMutant.length}</p>
                        <p><b>Inteligencia total:</b></p>
                       
                    </Col>

                            {/* Equipo 5 */}   
                    <Col xs={{order : ''}}><h3>Team sin Raza </h3>
                    <h5>Nombres</h5>
                    {teamSinRace?.slice(0,6).map((heroe)=>   
                        <>
                        <div>
                        
                        <b>Ver 👉</b> <Link  to={`/heroe/${heroe.id}`} key={heroe.id}>   <b>{heroe.name} </b>   </Link>
                        <button className='btn bg-danger mb-2 align-self-end'>Eliminar jugador</button>
                        </div>
        
                            {totalPowerStats5.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))} 

                         </>  
                        )} 
                        
                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats5)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamSinRace.length}</p>
                        <p><b>Inteligencia total:</b></p>
                       
                    </Col>

                    
                            {/* Equipo 6 */}   
                    <Col xs={{order : ''}}><h3>Team Talokite </h3>
                    <h5>Nombres</h5>
                    {teamTalokite?.slice(0,6).map((heroe)=>   
                        <>
                        <div>

                        <b>Ver 👉</b> <Link  to={`/heroe/${heroe.id}`} key={heroe.id}>    <b>{heroe.name} </b>  </Link>
                        <button className='btn bg-danger mb-2'>Eliminar jugador</button>
                        </div>
        
                            {totalPowerStats6.push(Object.values(heroe.powerstats).reduce((prev,curr)=>
                             prev + Number(curr),0))} 

                         </>  
                        )} 
                        <h3><b>PowerStats del Equipo:  </b>{lodash.sum(totalPowerStats6)}</h3>
                        
                        <p><b>Jugadores disponibles:</b> {teamTalokite.length}</p>
                        <p><b>Inteligencia total:</b></p>
                       
                    </Col>
                   
                </Row>
              
            </Container>
            </>
     
        

        }
    
       
    </>);
}
 
export default Home;
