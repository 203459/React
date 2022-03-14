import axios from "axios";
import './Login.css';
// import { NavLink} from "react-router-dom";
import NavBar from '../Nav/NavBar';

function Login() {
    const consumir_login = () => {
        var postData = {
            username: document.getElementById('user_l').value,
            password: document.getElementById('password_l').value
        }
        axios.post("http://localhost:8000/api/v1/login/", postData, {
            headers:
            {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert("Inicio de sesion exitoso, Bienvenido usuario"+ response.data.user_id)
            console.log(response.data.user_id);
            localStorage.setItem('token', response.data['token']);
            localStorage.setItem('id_user', response.data['user_id']);
             window.location = "/profile"
        }).catch((error) => {
            alert("Error"+ error.response.data)
            console.log(error.response.data); //non_field_errors[0]
           
        });
    };
    return (
        <div>
            <div><NavBar/> </div>
            {/* <div className={"form1"}> */}
            <form>
            <div className={"form"}>
                        <h1>Login</h1>
                        <div className={"grupo"}>
                            <input type="text" id="user_l" required /> <span className={"barra"}></span>
                            <label>Ingrese su usuario</label>
                            </div>
                            <div className={"grupo"}>
                            <input type="password" id="password_l" required /> <span className={"barra"}></span>
                            <label>Ingrese su contraseña</label>
                            </div>
                        {/* <p>
                            Registrarse
                            <NavLink to="/register" >  Registrate</NavLink>
                        </p> */}
                    <input type="button" value="Ingresar" onClick={consumir_login } className={"boton"}></input> 
                    </div>
                    </form>        
        </div>
    )
}
export default Login;