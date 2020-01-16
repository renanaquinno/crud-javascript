var firebaseConfig = {
    apiKey: "AIzaSyDMo8kiAjIDfyp6NW1s3stlZr0ew3kh5NY",
    authDomain: "engsoft-1.firebaseapp.com",
    databaseURL: "https://engsoft-1.firebaseio.com",
    projectId: "engsoft-1",
    storageBucket: "engsoft-1.appspot.com",
    messagingSenderId: "907495113926",
    appId: "1:907495113926:web:d284fa8b68bb12fada83c7",
    measurementId: "G-0YMP7QGW4S"
};
firebase.initializeApp(firebaseConfig);

const input = document.querySelector('input[type="file"')
var lines
var alunos
var id = 0

function arrayJson(id,nome){
    var data = {
      id: id,
      nome: nome,  
    }
    return data
  }

input.addEventListener('change', function (e) {
    console.log(input.files)
    const reader = new FileReader()
    reader.onload = function (){
        lines = reader.result.split('\n').map(function (lines){
            return lines.split(',')
        })
        console.log(lines.length)
        alunos = Number(lines.length)
        while (id < alunos){
            console.log(id +' '+ lines[id])
            var arrayData = arrayJson(id,lines[id])
            var task = firebase.database().ref("alunoTeste/"+id)
            task.set(arrayData)
            id++
        }
        alert("Alunos Cadastrado!")
    }
    reader.readAsText(input.files[0])
}, false)

    