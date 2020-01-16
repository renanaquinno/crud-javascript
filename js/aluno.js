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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getDados(dados){
  return document.getElementById(dados).value
}

function inputTask(id,result){
  return document.getElementById(id).value = result
}

function innerHTML(id,result){
  return document.getElementById(id).innerHTML += result

}

function arrayJson(id,nome){
  var data = {
    id: id,
    nome: nome,
  }
  return data
}
var um = 1

function table(id,nome){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+nome+'</td>'+
    '<td><input type="button"  class="close btn btn-danger" onclick="remove('+id+')" value="Excluir"></td>'+
  '</tr>'

}


function verAlunos(){
  var task = firebase.database().ref("aluno/")
  task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.nome)
    innerHTML("loadAlunos",result)})
}

function remove(nome){
	console.log("Teste")
	confirmar = confirm("Tem certeza que deseja excluir aluno de ID "+id+"?")
  if (confirmar == true){
    var task = firebase.database().ref("aluno/"+id)
    task.remove()
    location.reload()
    alert("Aluno excluído")
  } else {
    alert("Aluno não excluido")
  }
}

const input = document.querySelector('input[type="file"')
var lines
var alunos
var id = 1

function arrayJsonAlunos(id,nome){
    var data = {
      id: id,
      nome: nome,  
    }
    return data
  }

var listaAlunos = window.document.getElementById('listaAlunos')

input.addEventListener('change', function (e) {
    const reader = new FileReader()
    reader.onload = function (){
        lines = reader.result.split('\r').map(function (lines){
            return lines.split(',')
        })
        alunos = Number(lines.length)
        for (var i = 0; i < alunos; i++){
        listaAlunos.innerHTML += lines[i] + '<br>'
      }

    }
    reader.readAsText(input.files[0])
}, false)

function inserirAlunos(){
  var modal = document.getElementById("myModal");
  while (id < (alunos+1)){
    var arrayData = arrayJsonAlunos(id,lines[id-1][0])
    var task = firebase.database().ref("aluno/" + (id))
    task.set(arrayData)
    id++
}
alert("Alunos Cadastrado!")
modal.style.display = "none"
}    

function apagarAlunos(){
  confirma = confirm("Tem certeza que deseja excluir todos os Alunos?")
  if (confirma == true){
    var task = firebase.database().ref("aluno")
    task.remove()
    location.reload()
  }
}