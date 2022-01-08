import e from 'cors';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const NavComponent = ({navFlag}) => {
const routerHistory = useHistory();
return (<> 
    <Navbar bg="secondary" >
     <Container>
             <Nav className="mr-auto">
                <NavLink to="/login" >Login</NavLink>
            </Nav>
                {navFlag ?
              <button onClick={()=>{
                  const limpieza =(e)=>{
                      localStorage.removeItem('token');
                      sessionStorage.removeItem('token');
                      routerHistory.push('login')
                  }
                  limpieza(e);
              }} className='btn justify-content-end'>Salir</button>  : null  }
              
    </Container>
    </Navbar>
    
    </>  );
}
 
export default NavComponent;