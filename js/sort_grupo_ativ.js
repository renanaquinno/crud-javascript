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

function arrayJson(id,nomeAlun,nomeAtiv,numGrupo){
  var data = {
    id: id,
    nomeAlun: nomeAlun,
    nomeAtiv: nomeAtiv,
    numGrupo: numGrupo,
  }
  return data
}

var nome
var nomeAlun = []
var idAtiv 
var gruplab 
var nomeAtiv 
var numGrupo 

function sortGrupoAtiv() {
  nomeAlun = []
	var numeros = [];
	var qtd;
	var grupo = window.document.getElementById("grupo");
     idAtividade = window.document.getElementById('idAtiv');
     idAtiv = Number(idAtividade.value);
    var gruplab = window.document.getElementById("grupolab");
    var qtdGrupo;

    if (idAtiv < 1){
      alert("Informe o ID da Atividade")
    } else {
    qtdGrupos = firebase.database().ref("grupo_aluno/")
    qtdGrupos.on("value",function(data){
      qtdGrupo = data.val()
    })

    var sorteado = Math.floor((Math.random() * qtdGrupo.length));
    grupo.innerHTML = ""; 
    numGrupo = sorteado
      var task = firebase.database().ref("grupo_aluno/"+sorteado)
      task.on("value",function(data){
      var taskValue = data.val()
      var result = table(taskValue.id,taskValue.integrantes,taskValue.atividades)
      grupolab.innerHTML = " "; 

        qtdGrupos = firebase.database().ref("grupo_aluno/")
        qtdGrupos.on("value",function(data){
        qtdGrupo = data.val()
        qtd = ((qtdGrupo.length)-1)
        qtd = 45/qtd

        grupo.innerHTML = '' 
        for (i = 0; i < qtd ; i++){
        var tasknome = firebase.database().ref("aluno/"+taskValue.integrantes[i])
        tasknome.on("value",function(data){
        var tasknomeValue = data.val()
        nomeAlun.push(tasknomeValue.nome)
        grupolab.innerHTML = "Grupo " + sorteado
        grupo.innerHTML = nomeAlun
        })
      }
    })
    })

    var tasknome = firebase.database().ref("grupo_aluno/"+sorteado)
    tasknome.on("value",function(data){
        var tasknomeValue = data.val()
        nome = tasknomeValue.integrantes})
}

nomeAtividade(idAtiv);
function nomeAtividade(idAtiv){
  var nomeAtividade = firebase.database().ref("atividade/"+idAtiv)
    nomeAtividade.on("value",function(data){
    var tasknomeValue = data.val()
    nomeAtiv = tasknomeValue.nome}) 
}
}


function insertGrupoAtiv(){
  var modal = document.getElementById("myModal");
  var id = getDados("idAtiv")
  if (id.length == 0 || nome.length == 0){
    alert("PREENCHA TODOS OS CAMPOS")
  } else {
    var arrayData = arrayJson(id,nomeAlun,nomeAtiv,numGrupo)
    var task = firebase.database().ref("atividade_grupo/"+id)
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
    var task = firebase.database().ref("atividade_grupo/"+id)
    task.remove()
    location.reload()
    alert("Associação excluída")
  } else {
    alert("Associação não excluida")
  }  
}


var qtd = 0

qtdGrupos = firebase.database().ref("grupo_aluno/")
      qtdGrupos.on("value",function(data){
        qtdGrupo = data.val()
        qtd = (45/((qtdGrupo.length)-1))
      })

function detalhes(id){
      var nomeAlun
      var numGrupo = document.getElementById('numGrupo')
      var NomeAlunos = document.getElementById('NomeAlunos')
      c = 0
      
      var task = firebase.database().ref("atividade_grupo/"+id)
      task.on("value",function(data){
      var taskValue = data.val()
      nomeAlun = taskValue.nomeAlun
      numGrup = taskValue.numGrupo

      })
      

      var task = firebase.database().ref("atividade_grupo/"+id)
      task.on("value",function(data){
      var taskValue = data.val()
      var result = table(taskValue.id,taskValue.nomeAlun,taskValue.nomeAtiv,taskValue.numGrupo)

      var modalAlunos = document.getElementById("modalAlunos");
      var btnClose = document.getElementById("BntClose");
      modalAlunos.style.display = "block";
      
      btnClose.onclick = function() {
        modalAlunos.style.display = "none";
      }

      NomeAlunos.innerHTML = ''
      for (i = 0; i < (qtd) ; i++){
        console.log(qtd)
        numGrupo.innerHTML = 'Grupo ' + numGrup + '<br>'
        NomeAlunos.innerHTML += nomeAlun[i] + '<br>'

      }
    })
    
}


