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


//var btnElement = document.getElementById('new');

var newElement = document.getElementById('new_equi');
var equipamentosElement = document.getElementById('equipamentos');


function getDados(dados){
  return document.getElementById(dados).value
}

function inputTask(id,result){
  return document.getElementById(id).value = result
}

function innerHTML(id,result){
  return document.getElementById(id).innerHTML += result

}

function arrayJson(id,nome,descricao,tempo){
  var data = {
    id: id,
    nome: nome,
    descricao: descricao,
  }
  return data
}

function insertTask(){
  var modal = document.getElementById("myModal");
  var id = getDados("idAtiv")
  var nome = getDados("nomeAtiv")
  var descricao = getDados("desAtiv")
  

  if (id.length == 0 || nome.length == 0){
    alert("PREENCHA TODOS OS CAMPOS")
  } else {
    var arrayData = arrayJson(id,nome,descricao,tempo)
    var task = firebase.database().ref("atividade/"+id)
    task.set(arrayData)
    modal.style.display = "none"

    alert("Atividade Cadastrada!")
  }
}

function table(id,nome,descricao){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+nome+'</td>'+
    '<td>'+descricao+'</td>'+
    '<td><input type="button"  class="close btn btn-danger" onclick="remove('+id+')" value="Excluir"></td>'+
  '</tr>'
}


function verAtividades(){
  var task = firebase.database().ref("atividade/")
  task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.nome,taskValue.descricao)
    innerHTML("loadAtiv",result)
  })
}


function remove(id){
  confirma = confirm("Tem certeza que deseja excluir atividade "+id+"?")
  if (confirma == true){
    var task = firebase.database().ref("atividade/"+id)
    task.remove()
    location.reload()
    alert("Item excluído")
  } else {
    alert("Item não excluido")
  }
    
}