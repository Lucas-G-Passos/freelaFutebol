import React from 'react';
import "./login.css";

export default function Login(){
    function login(event){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const password = formData.get("password"); 
        alert(formData.get('password'));
    }
    
    return(
        <div id='root'>
            <div id='login-form'>
                <form id='form' onSubmit={login}>
                    <input type='text' placeholder='Username' className='input'></input>
                    <input type='password' placeholder='Senha' className='input'></input>
                    <button type='submit' id='button-login' className='botao'>Login</button>
                </form>
            </div>
        </div>
    )
}