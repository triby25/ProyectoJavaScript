			
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

function addRow(){
	var estu=new Estudiante();
	estu.id=document.getElementById("id").value;
	if(estu.id==''){alert('Debe Ingresar un Id válido'); return;}
	estu.nombre =document.getElementById("nombre").value;
	estu.matricula=document.getElementById("matricula").value;
	estu.identificacion=document.getElementById("identificacion").value;
	estu.telefono=document.getElementById("telefono").value;
	estu.email=document.getElementById("email").value;
					
	addEstudiante(estu);
};
			

function addEstudiante(estu){
	var table=document.getElementById("estudiantes");
	var tr=document.createElement("tr");
				
	var tdId=document.createElement("td");	
	var txtId=document.createTextNode(estu.id);
				
	var tdNombre=document.createElement("td");	
	var txtNombre=document.createTextNode(estu.nombre);
				
	var tdMatricula=document.createElement("td");
	var txtMatricula=document.createTextNode(estu.matricula);
				
	var tdIdentifcacion=document.createElement("td");
	var txtIdentifcacion=document.createTextNode(estu.identificacion);
						
	var tdTelefono=document.createElement("td");
	var txtTelefono=document.createTextNode(estu.telefono);
				
	var tdEmail=document.createElement("td");	
	var txtEmail=document.createTextNode(estu.email);
	
	var tdBoton=document.createElement("td");

	var idRow=table.getElementsByTagName("tr").length
	if(idRow==null){idRow=0;}
	tdBoton.innerHTML = '<button type="submit" onclick="borraFila('+estu.id+','+idRow+')" class="btn btn-danger" >X</button>';			
	
	tdId.appendChild(txtId);
	tdNombre.appendChild(txtNombre);
	tdMatricula.appendChild(txtMatricula);
	tdIdentifcacion.appendChild(txtIdentifcacion);
	tdTelefono.appendChild(txtTelefono);
	tdEmail.appendChild(txtEmail);
	//tdBoton.appendChild(btn);
	
	tr.appendChild(tdId);
	tr.appendChild(tdNombre);
	tr.appendChild(tdMatricula);
	tr.appendChild(tdIdentifcacion);
	tr.appendChild(tdTelefono);
	tr.appendChild(tdEmail);
	tr.appendChild(tdBoton);
				
	table.appendChild(tr);
				
	listaEstudiantes.push(estu);
				
	limpiarInputs("divformulario");
				
	//console.log(listaEstudiantes);
	grabarEstuduantes();
};
				
function limpiarInputs(contenedor){
	var listaInputs = document.getElementById(contenedor).querySelectorAll("input[type='text'],input[type='password'],input[type='email']");
				
	//document.querySelectorAll("input[type='text'],input[type='password'],input[type='email']");
				
	for (var i = 0; i < listaInputs.length; i++) {
		listaInputs[i].value="";
	}
	document.getElementById("id").focus();
};
			
function grabarEstuduantes(){
	localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes));
};
			
function cargarEstuduantes(){
	listaEstudiantes=[];
	var estudiantesGuardados = localStorage.getItem('estudiantes');
	localStorage.removeItem("estudiantes");
				
	var lista=JSON.parse(estudiantesGuardados);
				
	if(lista==null){
		alert("No se encontraron estudiantes guardados");
		return;
	}
				
	var tabla = document.getElementById('estudiantes');
	while(tabla.childNodes.length>0){
		tabla.removeChild(tabla.lastChild);
	}

				
	for (var i = 0; i < lista.length; i++) {
		addEstudiante(lista[i])
	}
	
	//tabla.setAttribute('class', 'table table-hover');
};
			
function borrarTodosEstuduantes(){
	localStorage.removeItem("estudiantes");
	
	var tabla = document.getElementById('estudiantes');
	while(tabla.childNodes.length>0){
		tabla.removeChild(tabla.lastChild);
	}
};

function borraFila(idEstudiante,row){
	var estudiantesGuardados = localStorage.getItem('estudiantes');
	localStorage.removeItem("estudiantes");
				
	var lista=JSON.parse(estudiantesGuardados);
	for (var i = 0; i < lista.length; i++) {
		if(lista[i].id==idEstudiante){
			lista.splice(i, 1);
			//delete lista[i];
			document.getElementById("estudiantes").deleteRow(row);
			listaEstudiantes=lista;
			grabarEstuduantes();
			break;
		}
	}
};	

$(document).ready(function(){
	$("#agregar-Estudiante").click(function(){
		alert("hola");
	})
})



			
function imprimir(){
	var id=document.getElementById("id").value;
	console.log(id);
	var nombre=document.getElementById("nombre").value;
	console.log(nombre);
	var matricula=document.getElementById("matricula").value;
	console.log(matricula);
	var identificacion=document.getElementById("identificacion").value;
	console.log(identificacion);
	var telefono=document.getElementById("telefono").value;
	console.log(telefono);
	var email=document.getElementById("email").value;
	console.log(email);
					
					
	var estu=new Estudiante();
	estu.id=id;
	estu.nombre =nombre;
	estu.matricula=matricula;
	estu.identificacion=identificacion;
	estu.telefono=telefono;
	estu.email=email;
	console.log(estu);					
};		