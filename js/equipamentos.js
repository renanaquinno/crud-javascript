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
firebase.analytics();

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

function arrayJson(id,nome,descricao,dtEntrega){
  var data = {
    id: id,
    nome: nome,
    descricao: descricao,
    dtEntrega: dtEntrega,
   }
  return data
}

function insertTask(){
  var id = getDados("idAtiv")
  var nome = getDados("nomeAtiv")
  var descricao = getDados("descricaoAtiv")
  var dtEntrega = getDados("dtEntrega")

  if (id.length == 0 || nome.length == 0 || descricao.length == 0 || dtEntrega.length == 0){
    alert("PREENCHA TODOS OS CAMPOS")
  } else {
    var arrayData = arrayJson(id,nome,descricao,dtEntrega)
    var task = firebase.database().ref("atividades/"+id)
    task.set(arrayData)
    modal.style.display = "none"

    alert("Equipamento Cadastrado!")
    
    inputTask("id","")
    inputTask("nome","")
    inputTask("descricao","")
    inputTask("dtEntrega","")
  }
}

function table(id,nome,marca,local,patrimonio,serie){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+nome+'</td>'+
    '<td>'+marca+'</td>'+
    '<td>'+local+'</td>'+
    '<td>'+patrimonio+'</td>'+
    '<td>'+serie+'</td>'+
    '<td><input type="button"  class="close btn btn-light" onclick="detalhes('+id+')" value="Detalhes"></td>'+
    '<td><input type="button"  class="close btn btn-danger" onclick="remove('+id+')" value="Excluir"></td>'+
  '</tr>'

}


function verEquipamentos(){
  var task = firebase.database().ref("app/usuario/")
  task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.nome,taskValue.marca,taskValue.local,taskValue.patrimonio,taskValue.serie)
    innerHTML("loadEquip",result)

  })
}

function remove(id){
  confirma = confirm("Tem certeza que deseja excluir item de ID "+id+"?")
  if (confirma == true){
    var task = firebase.database().ref("equipamentos/"+id)
    task.remove()
    location.reload()
    alert("Item excluído")
  } else {
    alert("Item não excluido")
  }
    
}

function teste(){
  alert("Funcionou")
}
