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

function getDados(dados){
  return document.getElementById(dados).value
}

function inputTask(id,result){
  return document.getElementById(id).value = result
}

function innerHTML(id,result){
  return document.getElementById(id).innerHTML += result
}
var novoArray = [];
var qtdAlunGrupo;



function numero_aleatorio() {
	var numeros = [];
	novoArray = []
	var grupos = window.document.getElementById("grupos");
  var qtdAlunoGrupo = window.document.getElementById('qtdAlunGrupo');
  qtdAlunGrupo = Number(qtdAlunoGrupo.value);
	if (qtdAlunGrupo < 1){
	alert("Informe a quantidade de Alunos por Grupo")	
	} else {
        while (numeros.length < 45) {
        var aleatorio = Math.floor((Math.random() * 45) + 1);

        if (numeros.indexOf(aleatorio) == -1)
            numeros.push(aleatorio);
        }
	for (var i = 0, j = 0; i <= (numeros.length); i = i + qtdAlunGrupo, j++) {
    var result;
    novoArray.push(numeros.slice(i, i + qtdAlunGrupo));
  }

	grupos.innerHTML = " "; 
	for (var j = 1; j <= (45/qtdAlunGrupo) + 1; j++){ 
    grupos.innerHTML += "Grupo "+j+": "+ novoArray[j-1] + "<br>"; 
    console.log(novoArray[j-1])   
  }
}}


function table(id,integrantes){
  return '<tr>'+
    '<td>'+id+'</td>'+
    '<td>'+integrantes+'</td>'+
  '</tr>'
}


function verAlunoGrupo(){
  var qtd 
  var qtdGrupo
  var qtdGrupos
    
  // PEGAR QUANTIDADE DE GRUPOS
    qtdGrupos = firebase.database().ref("grupo_aluno/")
    qtdGrupos.on("value",function(data){
    qtdGrupo = data.val()
    qtd = ((qtdGrupo.length)-1)

  // PEGA OS NUMEROS DO ALUNO NO GRUPO
    var task = firebase.database().ref("grupo_aluno/")
    task.on("child_added",function(data){
    var taskValue = data.val()
    var result = table(taskValue.id,taskValue.integrantes,taskValue.atividades)
  
    // COMPARA OS NUMERO E PEGA O NOME DO ALUNO
    for (i = 0; i < qtd; i++){
      var tasknome = firebase.database().ref("aluno/"+taskValue.integrantes[i])
      tasknome.on("value",function(data){
      var tasknomeValue = data.val()
      var result = table(taskValue.id,tasknomeValue.nome)
      innerHTML("loadGrupoAlunos",result)})
    }
  })
})  // FECHAMENTO PEGAR QUANTIDADE DE GRUPOS

}


function arrayJson(id,integrantes){
  var data = {
    id: id,
    integrantes: integrantes,
  }
  return data
}

function ciarGrupoAluno(){
  var i = 0;
  while (i < (45/qtdAlunGrupo)){
	  var modal = document.getElementById("myModal");
	  var id = i+1    
    var task = firebase.database().ref("grupo_aluno/"+id)
    var arrayData = arrayJson(id,novoArray[i])
    task.set(arrayData)
    i++;
  }
  alert("Grupos Associados!")
  modal.style.display = "none"
  window.location.reload()
}

function apagarGrupos(){
  confirma = confirm("Tem certeza que deseja excluir todos os Grupos?")
  if (confirma == true){
    var task = firebase.database().ref("grupo_aluno")
    task.remove()
    location.reload()
  }
}