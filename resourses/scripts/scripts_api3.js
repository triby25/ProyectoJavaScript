function cerrarSesion(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	

	var dbToken = localStorage.getItem('usuarioLogueado');
	var strtoken;
	
	if (dbToken != null){
		strtoken = JSON.parse(dbToken);
	}
	
	var objLogout={token:strtoken};
	 
	$.ajax({
		type: 'POST',
		url: root + '/logout',
		data: JSON.stringify(objLogout),
		success: function(data){
			console.log(data);
			window.location.href="registroUsuario.html";
		}
	});
	
	//alert(titulo+' ' +comentario);
}

$(document).ready(function(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = '192.168.200.245:8080';
	
	var dbToken = localStorage.getItem('usuarioLogueado');
	var token;
	
	if (dbToken != null){
		token = JSON.parse(dbToken);
	}
	
	var urlParams = new URLSearchParams(window.location.search);
	var idUsuario=urlParams.get('idUsuario');
	var listaUsuarios=[];
	
	var lista = localStorage.getItem('listaUsuarios');
	if(lista!=null){
		listaUsuarios= JSON.parse(lista);
	}
	
	var objUsuario=listaUsuarios[idUsuario];
	
	//$("#usuario").html(objUsuario["username"]);
	$("#nombre").html(objUsuario["name"]);
	$("#correo").html(objUsuario["email"]);
	//$("#telefono").html(objUsuario["phone"]);
	//$("#website").html(objUsuario["website"]);
	
	/*var objDireccion=objUsuario["address"];
	var objCompania=objUsuario["company"];
	
	$("#direccion").html(objDireccion["street"]+' '+objDireccion["suite"]+', '+objDireccion["city"]+
	', Codigo Postal : '+objDireccion["zipcode"]);
	$("#compania").html(objCompania["name"]);
	*/
	$.ajax({
		url: root + '/posts?userId='+idUsuario+'&token='+token,
		method: 'GET'
		}).then(function(data) {
			$("#cantidadPost").html(data.length);
		});	
		
		
	$("#logout").click(function(){
		cerrarSesion();
	});
	
})

