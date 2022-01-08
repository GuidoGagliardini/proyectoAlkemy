import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import NavComponent from './components/common/NavComponent';
import './App.css';
import FooterComponent from './components/common/FooterComponent';
import { useState } from 'react';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import 'font-awesome/css/font-awesome.min.css';
import HomeHeroe from './components/Home/HomeHeroe';


<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>





function App() {
  const [footerFlag,setFooterFlag] = useState(true)
  const [navFlag,setNavFlag] = useState(false);
  return (<>
    <Router>
     <NavComponent navFlag={navFlag}/>
      <Switch>
        
        <Route path="/" exact component={Login}  />
        <Route path="/home" render={(props)=>{
          return <Home {...props} handle={setFooterFlag} handle2={setNavFlag}/>
        }}  />
        <Route path='/heroe/:id' render={(props)=>{
          return <HomeHeroe {...props} handle={setFooterFlag} />
        }} />
        <Route path='/login' exact component={Login} />
        

      </Switch>  
      
      <FooterComponent footerFlag={footerFlag} />
    </Router>  
  
  
  
  </>
   
  );
}

export default App;
