import React, { useEffect, useState } from 'react';
import { Card, Container,Row,Col, Button, ListGroup , ListGroupItem,Form} from 'react-bootstrap';
import {useParams, useHistory} from 'react-router-dom';
import api from './../../api';
import Loading from '../common/Loading';
import './homeheroe.css';


//Consumo datos de la api, creo funciones, renderizo resultados del JSON y creo funciones botones, etc.

const HomeHeroe = ({handle}) => {


const id = useParams();
const routerHistory = useHistory();
const resultSession = localStorage.getItem('token');
const [heroe,setHeroe] = useState(  );
const [isFetching,setIsFetching] = useState(false);
 useEffect(()=>{
    setIsFetching(true);
    const HereoById = async (id)=>{
        await api.post('/index', id).then((res)=>{
            console.log(res.data);
            setHeroe(res.data);
            setIsFetching(false);
            
        }).catch((err)=>{
            console.log(err);
        });
    };
    HereoById(id);
   
 },[]);


  const footerOut =(e)=>{
    if(e) handle(false);
  };
  const footerOn = (e)=>{
      if(e) handle(true);
  };

console.log("State",heroe)
    return (<>
    {!resultSession ? (alert("Sin autorizacion para el sitio, Ingrese"), routerHistory.push('/login')) :
        <>
            <div>
                <div className="m-0 row  justify-content-center">
                    <div className="col-auto">
                        <button onClick={footerOut} className='btn btn-block bg-success mb-2 mt-2 ml-2'>Quitar Footer</button>
                    </div>
                    <div className="col-auto">
                        <button onClick={footerOn} className='btn btn-block  bg-success mb-2 mt-2'>Ver Footer</button>
                    </div>
                   
                </div>
                <div className="m-0 row  justify-content-center">
                {isFetching && <Loading />}
                
                </div>
                <div className="text-center">
               
                <Button    onClick={()=>{routerHistory.push('/home')}}>Go to Home 👈</Button>
                </div>
               
            </div>

            <Container key={heroe?.id}>

               <Row className=' align-items-center mt-2'>
                   <Col className='align-self-start'>
                     <Card className='mb-2 mt-2 '>
                     <Card.Header>PowerStats 🌟🧨⚡〽 </Card.Header>
                     <Card.Body>
                     <blockquote className="blockquote mb-0">
                        <p>
                            <b>Inteligencia :</b> {heroe?.powerstats.intelligence}
                        </p>
                        <p>
                            <b> Durabilidad :</b> {heroe?.powerstats.combat}
                        </p>
                        <p>
                            <b>Combate :</b> {heroe?.powerstats.combat}
                        </p>
                        <p>
                            <b>Power :</b> {heroe?.powerstats.power}
                        </p>
                        <p>
                            <b>Speed :</b> {heroe?.powerstats.speed}
                        </p>
                        <p>
                            <b>Fuerza :</b> {heroe?.powerstats.strength}
                        </p>
                        <Card.Header>Caracteristicas  👨‍⚕️👩‍⚕️ </Card.Header>
                        <p>
                            <b>Peso :</b> 
                                <p>Pulgadas : {heroe?.appearance.height[0]}</p>
                                <p>CM : {heroe?.appearance.height[1]}</p>  
                        </p>
                        <p>
                            <b>Altura :</b> 
                                <p>Libras : {heroe?.appearance.weight[0]}</p>
                                <p>KG : {heroe?.appearance.weight[1]}</p>  
                        </p>

                    <footer className="blockquote-footer">
                        <b>Agencia :</b> <cite title="Source Title">{heroe?.biography.publisher}</cite>
                    </footer>
                    </blockquote>
                    </Card.Body>


                    
                     </Card>
                 
                   </Col>


                <Col className='align-self-center'>
                <Card className='mb-2 mt-2 cardHero' style={{ width: '20rem' }}>
                <Card.Header className='mb-2 mt-2' >Nombre : <b>{heroe?.name}</b>
                   
                 </Card.Header>
                 <Card.Header className='mb-2 mt-2' >
                 Alias : <b>{heroe?.biography.aliases[0]}</b>
                 </Card.Header>
                   
                
                    <Card.Body>
                     
                     <Card.Img src={heroe?.image.url} alt="Imagen" />
                    <Card.Header>Genero : <b>{heroe?.appearance.gender}</b></Card.Header>
                    <Card.Header> Nombre Completo : <b>{heroe?.biography["full-name"]}</b></Card.Header>
                    <ListGroup >
                    <Card.Title className='text-center bg-white mt-2'>Trabajos</Card.Title>
                        <ListGroupItem > <h5>Principal :</h5> <b>{heroe?.work.base}</b></ListGroupItem>
                        <ListGroupItem > <h5>Ocupacion :</h5> <b>{heroe?.work.occupation}</b></ListGroupItem>
                    </ListGroup>
                    </Card.Body>
                 </Card>
                </Col>

               <Col className ='align-self-start'>


               <Card className='mb-2 mt-2 cardHero' style={{ width: '20rem' }}>
                    <Card.Body>
                     
                    <Card.Header>Equipo: <b>{heroe?.appearance.race}</b></Card.Header>
                    <Button className="mt-2"> Ver Algo mas</Button>
                    </Card.Body>
                 </Card>
               </Col>
                </Row>
                
            </Container>
        
             </>
       

    }
    </>);
}
 
export default HomeHeroe;