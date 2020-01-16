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

function arrayJson(id,nome,nomeAtiv,numAluno){
  var data = {
    id: id,
    nome: nome,
    nomeAtiv:nomeAtiv,
    numAluno: numAluno,
  }
  return data
}

var nome
var numAluno
var nomeAtiv
var idAtividade = 0
var idAtiv = 0

function sortAlunoAtiv() {
	var numeros = [];
	var aluno = window.document.getElementById("aluno");
  idAtividade = window.document.getElementById('idAtiv')
  idAtiv = Number(idAtividade.value);
  nomeAtiv = window.document.getElementById('nomeAtiv');
  if (idAtiv < 1){
    alert("Informe o ID da Atividade")
  } else {
  numAluno = Math.floor((Math.random() * 45) + 1);
  aluno.innerHTML = " "; 
  var tasknome = firebase.database().ref("aluno/"+numAluno)
    tasknome.on("value",function(data){
    var tasknomeValue = data.val()
    nome = tasknomeValue.nome
    aluno.innerHTML += nome}) 
}

nomeAtividade(idAtiv);
function nomeAtividade(idAtiv){
  var nomeAtividade = firebase.database().ref("atividade/"+idAtiv)
    nomeAtividade.on("value",function(data){
    var tasknomeValue = data.val()
    nomeAtiv = tasknomeValue.nome}) 
}
}


function insertAlunoAtiv(){
  var modal = document.getElementById("myModal");
  var id = getDados("idAtiv") 
  if (id.length == 0 || nome.length == 0){
    alert("PREENCHA TODOS OS CAMPOS")
  } else {
    var arrayData = arrayJson(id,nome,nomeAtiv,numAluno)
    var task = firebase.database().ref("atividade_aluno/"+id)
    task.set(arrayData)
    modal.style.display = "none"
    alert("Atividade Associada!")
    
  }
}

function table(id,nome,descricao){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+nome+'</td>'+
    '<td>'+descricao+'</td>'+
    '<td><input type="button"  class="close btn btn-light" onclick="detalhes('+id+')" value="Detalhes"></td>'+
    '<td><input type="button"  class="close btn btn-danger" onclick="remove('+id+')" value="Excluir"></td>'+
  '</tr>'

}


function verAtiv(){
  var task = firebase.database().ref("atividade/")
  task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.nome,taskValue.descricao)
    innerHTML("loadAtiv",result)

  })
}

function remove(id){
  confirma = confirm("Tem certeza que deseja excluir associação da atividade "+id+"?")
  if (confirma == true){
    var task = firebase.database().ref("atividade_aluno/"+id)
    task.remove()
    location.reload()
    alert("Associação excluída")
  } else {
    alert("Associação não excluida")
  }  
}

function detalhes(id){
    var task = firebase.database().ref("atividade_aluno/"+id)
    task.on("value",function(data){
		var taskValue = data.val()
		var result = taskValue.nome
	alert(result)})
}



