import React, { useContext, useState } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [userInfo, setUserInfo] = useContext(UserContext)  
    const [newUser, setNewUser] = useState(true)
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            var user = userCredential.user;
            setUserInfo(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    };

    const handleFacebookLogin=()=>{
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var user = result.user;
    setUserInfo(user);
    history.replace(from);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage, errorCode);
    });
    }

    const handleGoogleSignIn=()=>{
        var GlProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(GlProvider)
        .then((result) => {
            var user = result.user;
            setUserInfo(user)
            history.replace(from);
            console.log(user);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
        }

    const handleLogin=(data)=>{
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            
            var user = userCredential.user;
            setUserInfo(user);
            history.replace(from);            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("login error",errorMessage, errorCode);
        });
    }

    console.log(userInfo?.email);
    return (
        <div className="container">
            
           { newUser &&
            <div className="create-account">
            <h2>Create an account</h2>

            <form >

            <label for="exampleInputName">Name</label>
           <input type="text" class="form-control" id="exampleInputName" {...register("name", { required: true})} />

           <label for="exampleInputEmail">Username or Email</label>
           <input type="email" class="form-control" id="exampleInputEmail"   {...register("email", { pattern: /\S+@\S+\.\S+/i }, { required: true})}/>
           {errors.email?.type === 'required' && "First name is required"}

           <label for="exampleInputPassword">Password</label>
           <input type="password" class="form-control" id="exampleInputPassword"  {...register("password", { pattern: /(?=.*[0-9])/i }, { required: true})}/>

           <label for="exampleInputConfirmPassword">Confirm Password</label>
           <input type="password" class="form-control" id="exampleInputConfirmPassword"  {...register("password", { pattern: /(?=.*[0-9])/i }, { required: false})}/>

            <button onClick={handleSubmit(onSubmit)}>Create an account</button>
            
            <div className="already-have-account-text-area">
                <p>Already have an account?</p>
                <p onClick={()=>setNewUser(!newUser)} className="show-login-field-button">login</p>
            </div>
            </form>
        </div>
           }


           {!newUser &&
           <div className="create-account">
           <h2>Login</h2>

           <form>

          <label for="exampleInputEmail">Username or Email</label>
          <input type="email" class="form-control" id="exampleInputEmail"   {...register("email", { pattern: /\S+@\S+\.\S+/i }, { required: true})}/>
          {errors.email?.type === 'required' && "First name is required"}

          <label for="exampleInputPassword">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword"  {...register("password", { pattern: /(?=.*[0-9])/i }, { required: true})}/>

           <button className="login-button" onClick={handleSubmit(handleLogin)}>login</button>
           
           <div className="already-have-account-text-area">
               <p>Don't have an account?</p>
               <p onClick={()=>setNewUser(!newUser)} className="show-login-field-button">Create an account</p>
           </div>
           <div className="success-message">
                {
                    userInfo?.email && <p>Login Successfully</p>
                }
            </div>
           </form>
            </div>
           }


            <div className="login-with-another-field">
                <div className="or-text">
                    <p>Or</p>
                </div>
                <div className="login-with-another">
                    <button onClick={handleFacebookLogin}><span className="social-icon fb-icon"><FontAwesomeIcon icon={faFacebook} /></span> Continue with Facebook</button>
                    <button onClick={handleGoogleSignIn}> <span className="social-icon gl-icon"><FontAwesomeIcon icon={faGoogle} /></span> Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;