
// Form Validation
function login(){
    var usuario = document.getElementById("user")
    var password = document.getElementById("password")
    var user = usuario.value
    var pass = password.value

    var msg = document.getElementById('msg')  
    if (user == "admin" && pass =="admin") {
        window.location="menu_professor.html";
    } else { 
        if (user != "admin"){
        alert(`Usuário Incorreto`)
        } else {
        alert(`Senha Incorreta`)
        }
    }
}
