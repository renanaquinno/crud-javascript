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


var numeroAluno = 0;

function getDados(dados){
  return document.getElementById(dados).value
}

function inputTask(id,result){
  return document.getElementById(id).value = result
}

function innerHTML(id,result){
  return document.getElementById(id).innerHTML += result
}

function innerHTMLvazio(id,result){
  return document.getElementById(id).innerHTML = result
}


function atividade(atividade){
  return '<tr>'+
    '<td>'+atividade+'</td>'+
  '</tr>'
}

function grupoLista(grupo){
  return '<tr>'+
    '<td>'+'Grupo '+grupo+'</td>'+
  '</tr>'
  
}
function grupoNota(grupo){
  return '<tr>'+
    '<td>'+'Grupo '+grupo+'</td>'+
  '</tr>'
  
}
function notaGrupo(nota){
  return '<tr>'+
    '<td>'+nota+'</td>'+
  '</tr>'
  
}

var nomeLista
var comboCidades = document.getElementById("cboCidades");
document.getElementById("btnCarregar").onclick = function() {
  button = document.getElementById("btnCarregar").remove()

  for(i = 1; i <= 45; i++){ 
    var task = firebase.database().ref("aluno/"+i)
    task.on("value",function(data){
    var taskValue = data.val()
    nomeLista = taskValue.nome
    var comboCidades = document.getElementById("cboCidades");
    var opt0 = document.createElement("option");
    opt0.value = i+1;
    opt0.text = nomeLista;
    comboCidades.add(opt0, comboCidades.options[i]);
  
  })
}
};



var grupo = []
var grupoNumero
function eventoLista(descricao,id){
  return '<tr>'+
          '<td><input type="button" onclick="detalhe('+id+')" class="btn btn-dark" value='+descricao+'>'+id+'</td>'+
          '</tr>'
}


function detalhe(id){
  innerHTMLvazio("Atividade",'')
  innerHTMLvazio("Grupo",'')
  innerHTMLvazio("GrupoNota",'')
  innerHTMLvazio("notaGrupo",'')
  innerHTMLvazio("dataInicio",'')
  innerHTMLvazio("dataFim",'')

  var tempoTotal = document.getElementById('tempoTotal')
  var tempoParcial = document.getElementById('tempoParcial')

  
  var task = firebase.database().ref("evento/"+id)
  task.on("value",function(data){
  var taskValue = data.val()
  statusEvento = taskValue.status
  

  var taskatividade = firebase.database().ref("evento/"+id+"/atividades/")
    taskatividade.on("child_added",function(data){
    var taskInfo = data.val()
    var tabela = atividade(taskInfo)
    innerHTML("Atividade",tabela)})

  var dataInicio = firebase.database().ref("evento/"+id+"/data_inicio/")
      dataInicio.on("value",function(data){
      var taskInfo = data.val()
      var data = taskInfo
      var formatoBr = data.split('-').reverse().join('-');
      innerHTML("dataInicio",formatoBr)})

  var dataFim = firebase.database().ref("evento/"+id+"/data_fim/")
      dataFim.on("value",function(data){
      var taskInfo = data.val()
      var data = taskInfo
      var formatoBr = data.split('-').reverse().join('-');
      innerHTML("dataFim",formatoBr)})

  var taskgrupo = firebase.database().ref("evento/"+id+"/grupos/")
    taskgrupo.on("child_added",function(data){
    var taskInfo = data.val()
    var tabela = grupoLista(taskInfo)
    innerHTML("Grupo",tabela)})

  var TempoParcial = firebase.database().ref("evento/"+id+"/TempoParcial/")
    TempoParcial.on("value",function(data){
    var taskInfo = data.val()
    var TempoParcial = taskInfo
    tempoParcial.innerHTML= TempoParcial + " Minutos"})

  var tempTotal = firebase.database().ref("evento/"+id+"/tempoTotal/")
    tempTotal.on("value",function(data){
    var taskInfo = data.val()
    var tempTotal = taskInfo
    tempoTotal.innerHTML= tempTotal + " Minutos" })


    if (statusEvento == 0){
      var taskgrupo = firebase.database().ref("evento/"+id+"/notas/grupo/")
      taskgrupo.on("child_added",function(data){
      var taskInfo = data.val()
      var tabela = grupoNota(taskInfo)
      innerHTML("GrupoNota",tabela)})

      var tasknota = firebase.database().ref("evento/"+id+"/notas/nota/")
      tasknota.on("child_added",function(data){
      var taskInfo = data.val()
      var tabela = notaGrupo(taskInfo)
      innerHTML("notaGrupo",tabela)})
      var tabelas = document.getElementById('notas')
      tabelas.style.display = "block";
    }

})
  var modalAlunos = document.getElementById("modalAlunos");
  var btnClose = document.getElementById("BntClose");
  modalAlunos.style.display = "block";

  btnClose.onclick = function() {
    modalAlunos.style.display = "none";
  }  
}      


document.getElementById("btnInfo").onclick = function() {
  var comboCidades = document.getElementById("cboCidades");
  var infoGrupo = document.getElementById("infoGrupo");
  var eventos = document.getElementById("evento");
  var qtd 
  var qtdGrupo
  var qtdGrupos
  var um = 1;
  var nomeLista;
  var numerodoGrupo = 0;
  infoGrupo.innerHTML = ''
    
    // PEGAR QUANTIDADE DE GRUPOS
      qtdGrupos = firebase.database().ref("grupo_aluno/")
      qtdGrupos.on("value",function(data){
      qtdGrupo = data.val()
      qtd = ((qtdGrupo.length)-1)
    
    for(i = 1; i <= qtd; i++){
    var task = firebase.database().ref("grupo_aluno/"+i)
    task.on("value",function(data){
    var taskValue = data.val()
    nomeLista = taskValue.integrantes
    numeroAluno = (comboCidades.selectedIndex + parseInt(um))
    var grupoNum = i
      for (j = 0; j < (45/qtd); j++){
      if (nomeLista[j] == numeroAluno ){
        grupo = (nomeLista)
        grupoNumero = grupoNum
        infoGrupo.innerHTML = "Grupo " + grupoNumero

      }
      }
    })
    }

    innerHTMLvazio("informacoes",'')
    innerHTMLvazio("atividade",'')
    innerHTMLvazio("atividadeGrupo",'')
    innerHTMLvazio("evento",'')
    innerHTMLvazio("dataInicio",'')
    innerHTMLvazio("dataFim",'')

    for (i = 0; i < (45/qtd); i++){
    var nomeintegrante = firebase.database().ref("aluno/"+grupo[i])
    nomeintegrante.on("value",function(data){
    var taskValue = data.val()
    var result = tablenome(taskValue.nome)
    innerHTML("informacoes",result)
    })}

    for (i = 0; i < (10); i++){
      var nomeintegrante = firebase.database().ref("atividade_aluno/"+ i)
      nomeintegrante.on("value",function(data){
      var taskValue = data.val()
      var numero = taskValue.numAluno
      var atividade = taskValue.nomeAtiv
      if (numero == numeroAluno){
          atividade = atividade
          result = atividade
          innerHTML("atividade",result)}})
    }

    for (var c = 0; c < (10); c++){
      var ativgrupo = firebase.database().ref("atividade_grupo/"+ c)
      ativgrupo.on("value",function(data){
      var taskValue = data.val()
      var nomeAtiv = taskValue.nomeAtiv
      var numeroGrupo = taskValue.numGrupo

      if (grupoNumero == numeroGrupo){
          nomeAtiv = nomeAtiv
          result = nomeAtiv
          numerodoGrupo = numeroGrupo
          innerHTML("atividadeGrupo",result)}})
    }

})

    for (var c = 1; c < (10); c++){
      var evento = firebase.database().ref("evento/"+c)
      evento.on("value",function(data){
      var taskValue = data.val()
      var grupo = taskValue.grupos
      var id = c
      var nome = eventoLista(taskValue.descricao,id)
      for (var i = 0; i < grupo.length; i++){
        if (grupo[i] == grupoNumero){
         innerHTML("evento", nome)
        }}
      })
};



function tablenome(nome){
    return '<tr>'+
    '<td>'+nome+'</td>'+
    '</tr>'
}

function tableativ(atividade){
    return '<td>'+atividade+'</td>'
}

function atividadeGrupo(result){
    return '<td>'+result+'</td>'
}

}