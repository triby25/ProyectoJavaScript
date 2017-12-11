var listaUsuarios=[];

$(document).ready(function(){
	var root = 'https://jsonplaceholder.typicode.com';
	var urlParams = new URLSearchParams(window.location.search);
	var idUsuario=urlParams.get('idUsuario');
	
	var lista = localStorage.getItem('listaUsuarios');
	if(lista!=null){
		var usuariosGuardados= JSON.parse(lista);
		$.each(usuariosGuardados,function(i,usu){
			listaUsuarios.push(usu);
		});
	}
	
	var objUsuario=listaUsuarios[idUsuario];
	
	$("#usuario").html(objUsuario["username"]);
	$("#nombre").html(objUsuario["name"]);
	$("#correo").html(objUsuario["email"]);
	$("#telefono").html(objUsuario["phone"]);
	$("#website").html(objUsuario["website"]);
	
	var objDireccion=objUsuario["address"];
	var objCompania=objUsuario["company"];
	
	$("#direccion").html(objDireccion["street"]+' '+objDireccion["suite"]+', '+objDireccion["city"]+
	', Codigo Postal : '+objDireccion["zipcode"]);
	$("#compania").html(objCompania["name"]);
	
	$.ajax({
		url: root + '/posts/?userId='+idUsuario,
		method: 'GET'
		}).then(function(data) {
			$("#cantidadPost").html(data.length);
		});	
})

