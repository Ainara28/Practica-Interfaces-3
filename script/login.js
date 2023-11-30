/*
Funciones auxiliares
*/

// Funcion de validacion del DNI con formato español
function validatePassword(password){

    var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regexPassword.test(password)
}

// Función de validación de números del correo
function validateMail(mail) {
    var regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexMail.test(mail);
}

// Función de validación del nombre con uno o mas apellidos
function validateName(name) {
    var regexName = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    return regexName.test(name);
}

/*
Función del formulario de registro de usuarios
*/
$(document).ready(function() {
    // Función cuando se clickea en ek botón de volver atras de iniciar sesion
    $("#back-log").click(function() {
        if (confirm("No se guardarán los datos")){
            window.location.href = "home.html";
        }
    });
    
    // Función cuando se clickea en el botón de vaciar celdas de iniciar sesion
    $("#empty-log").click(function() {

        var mail = $("#mail-log").val();
        var password = $("#password-log").val();

        if (mail !== "" || password !== ""){
            $("#mail-log").val("");
            $("#password-log").val("");
            return;
        }
    });

    // Función cuando se clickea en el botón de iniciar sesion
    $("#log").click(function() {

        var mail = $("#mail-log").val();
        var password = $("#password-log").val();

        var mensajeDiv = $("#mensaje-log");

        // Validar los campos del formulario
        if (mail === "" || password === "") {
            mensajeDiv.text("Usuario no encontrado.");
            return
        }
        else if(!validateMail(mail)){
            mensajeDiv.text("Usuario no encontrado.");
            return;
        }
        else if(!validatePassword(password)){
            mensajeDiv.text("Usuario no encontrado.");
            return;
        }
        else{
            mensajeDiv.text("");

            alert("Inicio de sesión correcto.");
            window.location.href = "home.html"; 
        }
    });

    // Función cuando se clickea en ek botón de volver atras de registro
    $("#back").click(function() {
        if (confirm("No se guardarán los datos")){
            window.location.href = "home.html";
        }
    });
    
    // Función cuando se clickea en el botón de vaciar celdas del registro
    $("#empty").click(function() {

        var name = $("#name").val();
        var mail = $("#mail").val();
        var password = $("#password").val();

        if (name !== "" || mail !== "" || password !== ""){
            $("#name").val("");
            $("#mail").val("");
            $("#password").val("");
            return;
        }
    });

    // Función cuando se clickea en el botón de registro
    $("#sign").click(function() {

        var name = $("#name").val();
        var mail = $("#mail").val();
        var password = $("#password").val();

        var mensajeDiv = $("#mensaje");

        // Validar los campos del formulario
        if (name === "" || mail === "" || password === "") {
            mensajeDiv.text("Por favor, complete todos los campos.");
            return
        }
        else if(!validateName(name)){
            mensajeDiv.text("Por favor, ingrese nombre y apellido(s) válidos.");
            return;
        }
        else if(!validateMail(mail)){
            mensajeDiv.text("Por favor, ingrese un correo válido.");
            return;
        }
        else if(!validatePassword(password)){
            mensajeDiv.text("La contraseña debe de tener una letra y un numero, con longitud minima de 8.");
            return;
        }
        else{
            mensajeDiv.text("");
            
            // Concatenar la información del usuario en una sola cadena
            var userInfo = name + "|" + mail;
            document.cookie = mail + "=" + userInfo;

            alert("Usuario registrado.");
            window.location.href = "home.html"; 
        }
    });
});