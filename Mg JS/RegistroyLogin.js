function registro() {
    let mail = document.getElementById("mail").value;
    let contra = document.getElementById("contra").value;

    if (mail  === "" || contra === "") {
            alert("Todos los campos son obligatorios");
            
        } else {
            let users = {
                correo: mail,
                password: contra
            };
            localStorage.setItem("datosUsers", JSON.stringify(users));

             alert("Usuario registrado correctamente");
 }

}

function login() {
    let mailingresado=document.getElementById("mail").value
    let contraingresada=document.getElementById("contra").value
    let datosGuardados=localStorage.getItem("datosUsers")

    if (datosGuardados){
        let mailObjeto=JSON.parse(datosGuardados);
        
        if (mailingresado === mailObjeto.correo && contraingresada === mailObjeto.password){
            alert("¡Bienvenido al sistema ISSS!");
    
        } else {
            alert("Usuario o contraseña incorrectos.")
        }
    } else {
            alert("No hay ningun usuario registrado.")
        }
 }





