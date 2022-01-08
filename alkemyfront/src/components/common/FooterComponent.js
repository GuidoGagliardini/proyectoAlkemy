import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faAddressCard, faLink, faUser } from '@fortawesome/free-solid-svg-icons';
const FooterComponent = ({footerFlag}) => {
    
    return ( <>
    
    {footerFlag ? 
        <footer className="page-footer font-small bg-success pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
      
              <h5 className="text-uppercase">Footer Content</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur natus explicabo iste. Facere error iure distinctio voluptates nobis natus perferendis quaerat molestiae quod voluptas repellat beatae porro animi, dolores possimus?</p>
      
            </div>
      
            <div className="col-md-3 mb-md-0 mb-3">
      
            <FontAwesomeIcon icon={faAddressCard} />
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
      
              <FontAwesomeIcon icon={faAddressBook}/>
            </div>
          </div>
      
      
        </div>
        
      
        
        <div className="footer-copyright text-center py-3">© GuidoGagliardini con ayuda de
          <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
        </div>
      
      
      </footer>

: null

}


    
    </> );
}
 
export default FooterComponent;