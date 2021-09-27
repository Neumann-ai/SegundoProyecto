//Clases/////////////////////////////////////////////////////////////////////////

class User
{
    constructor(id, firstName, lastName, password, mail, birthDate, phone, friendsList, name, profilePic)
    {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.birthDate = birthDate;
        this.phone = phone;
        this.friendsList = friendsList;
        this.mail = mail;
        this.isActive = true;
        this.isAdmin = false;
        this.profilePic = profilePic;
    }
}
//clases/////////////////////////////////////////////////////////



// Inicializando variables necesarias para la creacion de ususarios////////////////////////////////
let defaultProfPic = new Image;
defaultProfPic.src = "https://www.sogapar.info/wp-content/uploads/2015/12/default-user-image.png";
let listaAmigos = [];
let usuarios = [];

let darkMode;

if(localStorage.getItem('darkMode'))
{
    darkMode = JSON.parse(localStorage.getItem('darkMode'));
}
else
{
    darkMode = false;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}

if(localStorage.getItem('usuarioLog') != "undefined")
{
   // document.location = "mainred.html";
}

if(localStorage.getItem('usuarios'))
{
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}

window.onload = detectTheme();
//Inicializando variables necesarias para la creacion de ususarios/////////////////////////////////

//Log In///////////////////////////////////////////////////////////////////////
function LogIn()
{
    //Tomar valores de los form
    usermail = document.getElementById("userMail").value;
    password = document.getElementById("password").value;
   
    //Encontrar coincidencias en el array de usuarios
    let currentUser = usuarios.find(usuario => usuario.mail == usermail && usuario.password == password);

    //Loguea o no segun el resultado anterior
    if(currentUser)
    {
        if(currentUser.isActive)
        {
            console.log("Login Succesfully");
            localStorage.setItem('usuarioLog', JSON.stringify(currentUser));
            document.location="mainred.html";
        }
        else
        {
           alert("!Atencion¡ este usuario se encuentra momentaneamente blockeado") 
        }
    }
    else
    {
        console.log("Error, wrong password or username");
        alert("Mail o Contraseña incorrectos!");
    }
}
//Log In///////////////////////////////////////////////////////////////////////

//Registro/////////////////////////////////////////////////////////////////////
function userRegister()
{
    //crea nuevo usuario a partir de 
    let userNew = new User;
    userNew.id = usuarios.length;
    userNew.firstName = document.getElementById("name").value;
    userNew.lastName = document.getElementById("lastname").value;
    userNew.password = document.getElementById("password").value;
    userNew.name = userNew.firstName + " " + userNew.lastName;
    userNew.mail = document.getElementById("mail").value;
    userNew.phone = document.getElementById("phone").value;
    userNew.birthDate = document.getElementById("birthdate").value;
    userNew.profilePic = defaultProfPic.src;
    userNew.friendsList = listaAmigos;
    if(userNew.mail == "admin" && userNew.password == "admin")
    {
        userNew.isAdmin = true;
    }
    else
    {
        userNew.isAdmin = false;
    }
   
    //Valida y Guarda el usuario en LocalStorage
    if(userNew.firstName != "" && userNew.password != "" && !validateMail(userNew.mail))
    {
        usuarios.push(userNew);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
       // document.location = "LogIn.html"
        console.log("susses");
        console.log(usuarios);
    }
    else
    {
        if(userNew.firstName == "")
        {
            alert("Por favor, ingresar un nombre.");
        }
        if(userNew.lastName == "")
        {
            alert("Por favor, ingresar un apellido.");
        }
        if(userNew.password == "")
        {
            alert("Por favor, ingresar una contraseña.");
        }
        if(userNew.mail == "")
        {
            alert("Por favor, ingresar una direccion de Correo.");
        }
        if(userNew.phone == "")
        {
            alert("Por favor, ingresar un numero de telefono.");
        }
        if(userNew.birthDate == undefined)
        {
            alert("Por favor, ingresar una fecha de nacimiento.");
        }
        if(validateMail(userNew.mail))
        {
            alert("Ya hay una cuenta registrada con esa direccion");
        }
        console.log("Error datos no validos");
        console.log(userNew.password);
    }
}

//validar Mail para que no puedan registrar mas de una cuenta con cada uno

function validateMail(mail)
{
    let valid = usuarios.find(usuario => usuario.mail == mail)
    
    console.log(valid);

    return valid;
    
}

//cancela la creacion de un usuario y vuelve a la pantalla de logIn
function goLogIn()
{
    if(confirm("¿Regresar a la pagina de inicio?") )
    {
      document.location="LogIn.html";
    }
    else
    {
        document.location="register.html";
    }
}
//Registro de Usuario//////////////////////////////////////////////////////////////


//Dark theme//////////////////////////////////////////////////
//validar Mail para que no puedan registrar mas de una cuenta con cada uno

function validateMail(mail)
{
    const valid = usuarios.find(usuario => usuario.mail == mail)


    return valid;
}





//Login

//Dark theme
function switchColor()
{
    darkMode = !darkMode; 
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  document.location = "LogIn.html"
}
function detectTheme()
{
    let logIn = document.getElementById("logIn");
    let welcome = document.getElementById("welcome");
    let logFourm = document.getElementById("logFourm");
    let mail = document.getElementById("userMail");
    let pass = document.getElementById("password");
    
    let divheader = document.getElementById("divHeader");
    let lighticon = document.getElementById("lightIcon");
    
    if(darkMode)
    {
        document.body.classList.toggle("dark");
    
        logIn.classList.toggle("dark");
        welcome.classList.toggle("dark");
        logFourm.classList.toggle("dark");
        mail.classList.toggle("dark");
        pass.classList.toggle("dark");
        divheader.classList.toggle("dark");
        lighticon.classList.toggle("dark");
    }
}

//Dark theme//////////////////////////////////////////////////

