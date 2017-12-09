			
var listaEstudiantes=[];
			
Estudiante=function(){
	self=this;
	self.id="";
	self.nombre="";
	self.matricula="";
	self.identificacion="";
	self.telefono="";
	self.email="";
}		

function addEstudiante(estu){	
	var rowEstudiante ='<tr id="row'+estu.id+'">'+
	'<td><input type="checkbox" id="'+estu.id+'"></td>'+
	'<td>'+estu.id+'</td>'+
	'<td>'+estu.nombre+'</td>'+
	'<td>'+estu.matricula+'</td>'+
	'<td>'+estu.identificacion+'</td>'+
	'<td>'+estu.telefono+'</td>'+
	'<td>'+estu.email+'</td>'+
	'<td><button type="button" onclick=borraFila('+estu.id+') class="btn btn-danger" >X</button></td>'+
	'</tr>'
	
	$("#estudiantes").append(rowEstudiante);
	
	listaEstudiantes.push(estu);

	limpiarInputs("divformulario");
				
	grabarEstuduantes();
};
				
function limpiarInputs(contenedor){
	var listaInputs = document.getElementById(contenedor).querySelectorAll("input[type='text'],input[type='password'],input[type='email']");
		
	for (var i = 0; i < listaInputs.length; i++) {
		listaInputs[i].value="";
	}
	document.getElementById("id").focus();
};
			
function grabarEstuduantes(){
	localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes));
};
			
function borraFila(idEstudiante){
	var estudiantesGuardados = localStorage.getItem('estudiantes');
	localStorage.removeItem("estudiantes");
	
	var lista=JSON.parse(estudiantesGuardados);
	for (var i = 0; i < lista.length; i++) {
		if(lista[i].id==idEstudiante){
			lista.splice(i, 1);
			//delete lista[i];
			var rowDelete=document.getElementById("row"+idEstudiante).rowIndex-1;
			document.getElementById("estudiantes").deleteRow(rowDelete);
			listaEstudiantes=lista;
			grabarEstuduantes();
			break;
		}
	}
};	

function validaIdExistente(idEstudiante){
	for (var i = 0; i < listaEstudiantes.length; i++) {
		if(listaEstudiantes[i].id==idEstudiante){
			return true;
		}
	}
	return false;
};

$(document).ready(function(){
	
	var lista = localStorage.getItem('estudiantes');
	if(lista!=null){
		var estudiantesGuardados= JSON.parse(lista);
		$.each(estudiantesGuardados,function(i,est){
			addEstudiante(est);
		});
	}
	
	$("#agregar-Estudiante").click(function(){
		var estu=new Estudiante();
		estu.id=$("#id").val();
		if(estu.id==''){alert('Debe Ingresar un Id válido'); return;}
		if (isNaN(estu.id)) { alert('Debe Ingresar un Id numérico'); return;}
		if(validaIdExistente(estu.id)){ alert('El id indicado ya existe'); return;}
		
		estu.nombre =$("#nombre").val();
		estu.matricula=$("#matricula").val();
		estu.identificacion=$("#identificacion").val();
		estu.telefono=$("#telefono").val(); 
		estu.email=$("#email").val(); 
						
		addEstudiante(estu);
	})
	
	$("#borrarTodosEstuduantes").click(function(){
		localStorage.removeItem("estudiantes");
		lista=[];
		$("#estudiantes").html("");
	})	
	

	$("#borrar-seleccionados").click(function(){
		$("input:checkbox:checked").each(function() {
			borraFila($(this).attr("id"));
		});
	})
})


