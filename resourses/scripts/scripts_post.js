function addPost(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	var titulo=$("#titulo").val();
	var comentario=$("#comentario").val();
	

	
	var dbToken = localStorage.getItem('usuarioLogueado');
	var token;
	
	if (dbToken != null){
		token = JSON.parse(dbToken);
	}
	
	
	var post={
		title:titulo,
		body:comentario
	}
	
	$.ajax({
		type: 'POST',
		url: root + '/posts?token='+token,
		data: JSON.stringify(post),
		success: function(data){
			console.log(data);
			window.location.href="index.html"
		}
	});
	
	//alert(titulo+' ' +comentario);
}

function loguearse(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	
	var clave=$("#clave").val();
	var correo=$("#correo").val();
	
	var objUsuario={
		email: correo,
		password: clave	
	}
	
	$.ajax({
		type: 'POST',
		url: root + '/login/',
		data: JSON.stringify(objUsuario),
		success: function(data){
			console.log(data);
			if(data.estatus=="ok"){
				localStorage.setItem('usuarioLogueado', JSON.stringify(data.token));
				window.location.href="index.html";
			}	
		}
	});
}


function addUser(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	
	var usuario=$("#usuario").val();
	var clave=$("#clave").val();
	var nombre=$("#nombre").val();
	var correo=$("#correo").val();
	
	/*var objUsuario={
		username:usuario,
		name:nombre,
		email: correo
	}*/
	
	var objUsuario={
		name: usuario,
		email: correo,
		password: clave	
	}
	
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: 'POST',
		url: root + '/users/',
		data: JSON.stringify(objUsuario),
		success: function(data){
			console.log(data);
		}
	});
}
function addComentario(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	
	var urlParams = new URLSearchParams(window.location.search);
	var idPostSeleccionado=urlParams.get('idPost');
	
	var nombre=$("#nombreComentario").val();
	var correo=$("#correoComentario").val();
	var comentario=$("#detalleComentario").val();
	

	var dbToken = localStorage.getItem('usuarioLogueado');
	var token;
	
	if (dbToken != null){
		token = JSON.parse(dbToken);
	}
	
	
	var coment={
		postId: parseInt(idPostSeleccionado),
		name:nombre,
		email:correo,
		body:comentario
	}
	 console.log(coment);
	 
	$.ajax({
		type: 'POST',
		url: root + '/comments?token='+token,
		data: JSON.stringify(coment),
		success: function(data){
			console.log(data);
			window.location.href="comentarios.html?idPost="+idPostSeleccionado
		}
	});
	
	//alert(titulo+' ' +comentario);
}


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
	$("#guardar").click(function(){
		addPost();
	});
	
	$("#registrarse").click(function(){
		addUser();
	});
	
	$("#login").click(function(){
		loguearse();
	});
	
	$("#guardarComentario").click(function(){
		addComentario();
	});
	
	$("#logout").click(function(){
		cerrarSesion();
	});
})

