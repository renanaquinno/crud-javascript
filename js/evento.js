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
function innerHTMLvazio(id,result){
  return document.getElementById(id).innerHTML = result
}

function arrayJson(id,nome,descricao,atividades,grupos,data_inicio,data_fim,tempoTotal,TempoParcial,status){
  var data = {
    id: id,
    nome: nome,
    descricao: descricao,
    atividades: atividades,
    grupos: grupos,
    data_inicio: data_inicio,
    data_fim: data_fim,
    tempoTotal: tempoTotal,
    TempoParcial: TempoParcial,
    status: status,
  }
  return data
}

function arrayJsonNotas(grupo,nota){
  var data = {
    grupo: grupo,
    nota: nota,
  }
  return data
}


function cadastraEvento(){
  var modal = document.getElementById("myModal");
  var id = getDados("idEvento")
  var nome = getDados("nomeEvento")
  var descricao = getDados("desEvento")
  var data_inicio = getDados("dtIeven")
  var data_fim = getDados("dtFeven")
  var tempoTotal = getDados("TempoTotal")
  var status = 1
  var atividades = $('#cboAtividade').val();
  var grupos = $('#cboGrupo').val()
  var TempoParcial = Math.round(tempoTotal / Number(atividades.length))
  
 


  
  if (atividades.length != grupos.length){
    alert("INFORME A MESMA QUANTIDADE DE GRUPOS E ATIVIDADES")
  
  } else if (data_inicio > data_fim){
      alert("DATA INÍCIO NÃO PODE SER MAIOR QUE DATA FIM")
  }
   else if (id.length == 0 || nome.length == 0){
      alert("PREENCHA TODOS OS CAMPOS")
  } else {
      var arrayData = arrayJson(id,nome,descricao,atividades,grupos,data_inicio,data_fim,tempoTotal,TempoParcial,status)
      var task = firebase.database().ref("evento/"+id)
      task.set(arrayData)
      modal.style.display = "none"
      alert("Evento Cadastrado!")}
}

function table(id,nome,descricao){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+nome+'</td>'+
    '<td>'+descricao+'</td>'+
    '<td><input type="button"  class="close btn btn-light" onclick="detalhes('+id+')" value="Detalhes"></td>'+
    '<td><input type="button"  class="close btn btn-success" onclick="finalizar('+id+')" value="Finalizar"></td>'+
    '<td><input type="button"  class="close btn btn-danger" onclick="remove('+id+')" value="Cancelar"></td>'+
  '</tr>'
}


function atividade(atividade){
  return '<tr>'+
    '<td>'+atividade+'</td>'+
  '</tr>'
}

function grupo(grupo){
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

function grupoFinalizar(grupo){
  return '<tr>'+
    '<td>'+'Grupo '+grupo+'</td>'+
    '<td><input type="number" min="1" max="10" class="form-control-notas" name="nota" placeholder="Nota"></td>'+
    '<td><input type="button" class="close btn btn-success" onclick="inserirNotas('+grupo+')" value="Confirmar"></td>'+
  '</tr>'
}


function verEvento(){
  var task = firebase.database().ref("evento/")
  task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.nome,taskValue.descricao,taskValue.data)
    innerHTML("carregarEvento",result)
  })
}


function remove(id){
  confirma = confirm("Tem certeza que deseja cancelar o Evento "+id+"?")
  if (confirma == true){
    var task = firebase.database().ref("evento/"+id)
    task.remove()
    location.reload()
    alert("Evento cancelado")
  } else {
    alert("Evento não cancelado")
  }
    
}


function selecoes() {
    for(i = 1; i <= 45; i++){ 
      var task = firebase.database().ref("atividade/"+i)
      task.on("value",function(data){
      var taskValue = data.val()
      var nomeAtividade = taskValue.nome
      var comboAtividade = document.getElementById("cboAtividade");
      var opt0 = document.createElement("option");
      opt0.value = nomeAtividade;
      opt0.text = nomeAtividade;
      comboAtividade.add(opt0, comboAtividade.options[i]);
    })}

    for(i = 1; i <= 45; i++){ 
    var task = firebase.database().ref("grupo_aluno/"+i)
    task.on("value",function(data){
    var taskValue = data.val()
    var numGrupo = taskValue.id
    var comboGrupo = document.getElementById("cboGrupo");
    var opt0 = document.createElement("option");
    opt0.value = numGrupo;
    opt0.text = 'Grupo '+ numGrupo;
    comboGrupo.add(opt0,comboGrupo.options[i]);
    })}
}
  
function detalhes(id){
    innerHTMLvazio("Atividade",'')
    innerHTMLvazio("Grupo",'')
    innerHTMLvazio("GrupoNota",'')
    innerHTMLvazio("notaGrupo",'')
    innerHTMLvazio("dataInicio",'')
    innerHTMLvazio("dataFim",'')
    var NomeEvento = document.getElementById('NomeEvento')
    var DesEvento = document.getElementById('DesEvento')
    var status = document.getElementById('status')
    var tempoTotal = document.getElementById('tempoTotal')
    var tempoParcial = document.getElementById('tempoParcial')
    var statusEvento = 1
    
    var task = firebase.database().ref("evento/"+id)
    task.on("value",function(data){
    var taskValue = data.val()
    var Nome = taskValue.nome 
    var Des = taskValue.descricao
    statusEvento = taskValue.status
    
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



    var taskatividade = firebase.database().ref("evento/"+id+"/atividades/")
      taskatividade.on("child_added",function(data){
      var taskInfo = data.val()
      var tabela = atividade(taskInfo)
      innerHTML("Atividade",tabela)})

    var taskgrupo = firebase.database().ref("evento/"+id+"/grupos/")
      taskgrupo.on("child_added",function(data){
      var taskInfo = data.val()
      var tabela = grupo(taskInfo)
      innerHTML("Grupo",tabela)})

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
    
  
    NomeEvento.innerHTML = Nome + '<br>'
    DesEvento.innerHTML = Des + '<br>'
    var desbloquear = document.getElementById("desbloquear")

    if (statusEvento == 1){
      status.innerHTML = '<label class="alert alert-info" role="alert">ATIVO</label>' + '<br>'
      desbloquear.innerHTML = ''
    } else {
      status.innerHTML = '<label class="alert alert-warning" role="alert">FINALIZADO</label>' + '<br>'
      desbloquear.innerHTML = '<input type="button" onclick="editarNota('+id+')" class="btn btn-warning" value="Desbloquear para Editar Nota">'
    }

    
    })
    
    var modalAlunos = document.getElementById("modalAlunos");
    var btnClose = document.getElementById("BntClose");
    modalAlunos.style.display = "block";
	
   
    
    btnClose.onclick = function() {
      modalAlunos.style.display = "none";
    }   
    
    

}


var gruposArray = []
var notasArrey = []
var c = 0

function finalizar (id){
	var di = id
	var task = firebase.database().ref("evento/"+id+"/status")
	task.on("value",function(data){
	var status = data.val()
	if (status == 0){
		alert("O evento ja se encontra finalizado, para mais informações, clique em detalhes")
	} else {
	
	grupos = []
	innerHTMLvazio("GrupoFinalizar",'')
	var modalFinalizar = document.getElementById("finalEvento");
    var btnCloseFinalizar = document.getElementById("BntCloseFinalizar");
	modalFinalizar.style.display = "block";
	
	btnCloseFinalizar.onclick = function() {
      modalFinalizar.style.display = "none";
	} 


    var taskgrupo = firebase.database().ref("evento/"+id+"/grupos/")
      taskgrupo.on("child_added",function(data){
      var taskInfo = data.val()
      var tabela = grupoFinalizar(taskInfo)
      innerHTML("GrupoFinalizar",tabela)})

  
 document.getElementById("BntFinalizarNotas").onclick = function() {
	var confirma = confirm("Tem certeza que deseja finalizar o evento?")
		if (confirma == true){
	var arrayNotas = arrayJsonNotas(gruposArray,notasArrey)
    var taskNotas = firebase.database().ref("evento/"+di+"/notas")
		taskNotas.set(arrayNotas)
		task.set(0)
	
	gruposArray = []
	notasArrey = []
	c = 0
	
	alert("Evento Finalizado com sucesso e notas adicionadas ao sistema!")
	modalFinalizar.style.display = "none";
	}
}
}})
}

function inserirNotas (grupo){
	gruposArray.push(grupo)
	var nota = document.getElementsByName('nota')
	notasArrey.push(nota[c].value)
	c += 1
	alert("Confirmado")
}

function editarNota(id){
  var taskstatus = firebase.database().ref("evento/"+id+"/status/")
  taskstatus.on("value",function(data){
  var confirma = confirm("Confirmar Desbloqueio de Evento? ")
  if (confirma == true){
    taskstatus.set(1)
    alert("Evento Desbloqueado")
    location.reload()
  }})
}