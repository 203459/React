import axios from "axios";
import './Profile.css';

function Profile() {

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('id_user');
    let image_profile = "";
    let usernameR, first_nameR, last_nameR, emailR;

    const change_image = () => {
        let postData = new FormData();
        postData.append('id_user', user);
        postData.append('url_img', document.getElementById('img').files[0]);

        axios.post("http://localhost:8000/api/v1/user/perfil", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            if (error.response.data === "Metodo post no permitido") {
                console.log("Enviar a un metodo put");
                put_image();
            }
        })
    }

    let put_image = () => {
        let putData = new FormData();
        putData.append('url_img', document.getElementById('img').files[0]);

        axios.put("http://localhost:8000/api/v1/user/lista_perfil/" + user + "/", putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            image_profile = "http://localhost:8000" + response.data.url_img;
            document.getElementById('preview').src = image_profile;
            window.location.reload();
        }).catch((error) => {
            alert("No se pudo actualizar la imagen");
        });
    }

    let delete_image = () => {
        axios.delete("http://localhost:8000/api/v1/user/lista_perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            alert("Imagen eliminada");
            image_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            document.getElementById('preview').url = image_profile;
            window.location.reload();
        });
    }

    window.onload = function visualize_data() {
        axios.get("http://localhost:8000/api/v1/user/lista_perfil/" + user + "/", {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            if (response.data.url_img != null) {
                image_profile = "http://localhost:8000" + response.data.url_img;
                document.getElementById('preview').src = image_profile;
            } else {
                document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
        }).catch((error) => {
            document.getElementById('preview').src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        });

        axios.get("http://localhost:8000/api/v1/user/data/" + user, {
            headers: {
                'Authorization': 'Token ' + token,
            },
        }).then((response) => {
            usernameR = response.data.username;
            first_nameR = response.data.first_name;
            last_nameR = response.data.last_name;
            emailR = response.data.email;
            document.getElementById("firstName").value = first_nameR;
            document.getElementById("lastName").value = last_nameR;
            document.getElementById("email").value = emailR;
            document.getElementById("username").value = usernameR;
        }).catch((error) => {
            alert("No se pudieron obtener los datos");
        })
    }

    let change_profile = () => {
        let putData = new FormData();
        let usernamePut = document.getElementById("username").value;
        let lastNamePut = document.getElementById("lastName").value;
        let firstNamePut = document.getElementById("firstName").value;
        let emailPut = document.getElementById("email").value;

        if (usernamePut === "") {
            usernamePut = usernameR;
        }
        if (lastNamePut === "") {
            lastNamePut = last_nameR;
        }
        if (firstNamePut === "") {
            firstNamePut = first_nameR;
        }
        if (emailPut === "") {
            emailPut = emailR;
        }
        putData.append("first_name", firstNamePut);
        putData.append("last_name", lastNamePut);
        putData.append("username", usernamePut);
        putData.append("email", emailPut);

        axios.put("http://localhost:8000/api/v1/user/data/" + user, putData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            window.location.reload();
        }).catch((error) => {
            alert("No se pudieron actualizar los datos");
        })
    }

    let cerrar_sesion = () => {
        localStorage.clear();
        window.location = "/"
    }

    return (
        <div >
            <section class="seccion-perfil-usuario">
                <div class="perfil-usuario-header">
                    <div class="perfil-usuario-portada">
                        <div class="perfil-usuario-avatar">
                            <img alt="img-avatar" id="preview" />
                            <button type="button" className="boton-avatar" >{user}
                                <i class="far fa-image"></i>
                            </button>
                        </div>
                        <button type="button" className="boton-portada" onClick={cerrar_sesion}>Cerrar sesion</button>
                    </div>
                </div>
                <div class="perfil-usuario-body">
                    <div class="perfil-usuario-bio">
                        <div className="file-input">
                            <input accept="image/*" type="file" id="img" className="inputImage" ></input>
                            <button type="button" className="btn btn-success" onClick={change_image}>Cambiar imagen</button>
                            <button type="button" className="btn btn-danger" onClick={delete_image}>Eliminar imagen</button>
                        </div>
                    </div>
                    <div class="perfil-usuario-footer">
                        <ul class="lista-datos">
                            <p className="text"><b>First name: </b></p><input id="firstName"></input>
                            <p className="text"><b>Username: </b></p><input id="username"></input>

                        </ul>
                        <ul class="lista-datos">
                            <p className="text"><b>Last name:</b></p><input id="lastName"></input>
                            <p className="text"><b>E-mail: </b></p><input id="email"></input>
                        </ul>
                         <div className="change_profile" onClick={change_profile}>
                            <button type="button" className="btn btn-success">Cambiar perfil</button>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile;