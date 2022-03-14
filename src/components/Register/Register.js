import axios from "axios";
import './Register.css';
//import React, {Component} from "react";
import NavBar from '../Nav/NavBar';
function App() {

  /*const obtener_local = () =>{

    alert(localStorage.getItem('tokenLocal'))
  }*/
  //una interfaz
  //evento
  const consumir_register = () => {
    var postData = {
      username: document.getElementById('user').value,
      password: document.getElementById('password').value,
      password2: document.getElementById('password2').value,
      email: document.getElementById('email').value,
      first_name: document.getElementById('nombres').value,
      last_name: document.getElementById('apellidos').value,
    }

    axios
      .post("http://localhost:8000/api/v1/registro/add/", postData, {
        Headers: { "Content-Type": "application/json", "Authorization": "Bearer my-token", },
      })
      .then((response) => {
        alert("Registro exitoso");
        console.log(response.data);
        window.location = "/"
      })
      .catch((error) => {
        console.log(error.response.data.non_field_errors[0]); //non_field_errors[0]
      })
  }

  return (

    <div>
      <div><NavBar /> </div>
      <form>
        <div className={"form"}>
          <h1>Registro</h1>
          <div className={"grupo"}>
            <input type="text" id="user" required />
            <label>
              Ingrese el nombre de usuario:
            </label>
          </div>
          <div className={"grupo"}>
            <input type="password" id="password" required /><span className={"barra"}></span>
            <label>
              ingrese la contraseña
            </label>
          </div>
          <div className={"grupo"}>
            <input type="password" id="password2" required /><span className={"barra"}></span>
            <label>
              confirme su contraseña
            </label>
          </div>
          <div className={"grupo"}>
            <input type="text" id="email" required /><span className={"barra"}></span>
            <label>
              ingrese su correo
            </label>
          </div>
          <div className={"grupo"}>
            <input type="text" id="nombres" required /><span className={"barra"}></span>
            <label>
              ingrese sus nombres
            </label>
          </div>
          <div className={"grupo"}>
            <input type="text" id="apellidos" required /><span className={"barra"}></span>
            <label>
              ingrese sus apellidos
            </label>
          </div>
          {/* <p>
            iniciar sesion
            <NavLink to="/" >  Registrate</NavLink>
          </p> */}
          {/* <button type="submit" className={"boton"} onClick={consumir_register}>Registrar</button> */}
          <input type="button" value="Registrar" onClick={consumir_register} className={"boton"}></input>
        </div>
      </form>
    </div>
  );
}

export default App;