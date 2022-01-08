import React, { useState } from 'react';
import './login.css'
import { useFormik} from 'formik';
import api from '../../api';
import {useHistory} from 'react-router-dom';
import Loading from '../common/Loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey , faUser} from "@fortawesome/free-solid-svg-icons";



// import sha1 from 'sha1';
const Login = (props) => {
const routerHistory = useHistory();
const [jsonState,setJsonState] = useState(null);
const [istFetching,setIsfetching] = useState(false);

const tokenJson = {
	token: ""
}


//Creo Form y sus validaciones y envio al back.
const formFormik = useFormik({

	initialValues: {email: '', password : ''},
	
	validate(){
		const errors = {};

		const email = formFormik.values.email;
		const password =formFormik.values.password;
	
		if(!email) errors.email = "Requerido";
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
                errors.email = "Ingrese un mail valido";
		if(!password) errors.password = "Requerido";
	
		return errors;
		
	},
	async onSubmit  (values){
		setIsfetching(true);
		const envioBack =  await api.post('/users', values);
		const result = await api.post("http://challenge-react.alkemy.org/", values).then(
			(res)=>{
				sessionStorage.setItem('token',res.data.token);
				localStorage.setItem('token', res.data.token);
				tokenJson.token = res.data.token;
				setJsonState(jsonState, tokenJson);
				
				
				
				
			}).catch(
				(err)=>{
					alert('Verifique Email y password');
					formFormik.resetForm();
				}
			)

		//envio el token al back para su verifcacion.
		const envioToken  =  await api.get(`/users/${tokenJson.token}`);
	
		if (envioToken.data===true){
			setIsfetching(false);
			routerHistory.push('/home');
		
		}else{
			console.log("Sin autorizacion para este sitio")
		}
	},
})



    return ( <>

    	<div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" className="brand_logo" alt="Logo" />
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={formFormik.handleSubmit} noValidate > 
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
							</div>
							<input
							type="text"
							name="email"
							className="form-control"
							value={formFormik.values.email}
							onChange={formFormik.handleChange} 
							placeholder="username"
							 />
								
						</div>
						<span className="text-danger">{formFormik.errors.email}</span>
						
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
							</div>
							<input
							type="password"
							name="password"
							className="form-control"
							value={formFormik.values.password}
							onChange={formFormik.handleChange}
							placeholder="password" />
						</div>
						<span className="text-danger">{formFormik.errors.password}</span>
							<div className="d-flex justify-content-center mt-3 login_container">
				 	        <button type="submit"  className="btn login_btn" disabled={formFormik.isSubmitting}>
							
								 Ingresar</button>
					
								
								
                            </div>
							<div className="m-0 row  justify-content-center">

							{istFetching && <Loading props="✅"/>}
							</div>
					</form>
				</div>
		
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <a href="#" className="ml-2">Sign Up</a>
					</div>
					<div className="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div>
			</div>
		</div>
	</div>

    </> );
}
 
export default Login;