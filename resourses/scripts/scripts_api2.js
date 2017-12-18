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
	var root = 'http://192.168.200.245:8080';
	
	var dbToken = localStorage.getItem('usuarioLogueado');
	var token;
	
	if (dbToken != null){
		token = JSON.parse(dbToken);
	}
	
	var urlParams = new URLSearchParams(window.location.search);
	var idPostSeleccionado=urlParams.get('idPost');
	var listaUsuarios=[];	
	var lista = localStorage.getItem('listaUsuarios');
	if(lista!=null){
		listaUsuarios= JSON.parse(lista);
	}
	
	
	$.ajax({
		url: root + '/posts/'+idPostSeleccionado+'?token='+token,
		method: 'GET'
		}).then(function(data) {
			var objUsuario=listaUsuarios[data.userId];
			$("#titulo").html(data.title);
			$("#comentario").html(data.body);
			$("#usuario").html(objUsuario["name"]+'     -     '+objUsuario["email"]);
		});	
	
	
	$.ajax({
		url: root + '/comments/?postId='+idPostSeleccionado+'&token='+token,
		method: 'GET'
		}).then(function(data) {
	
			$.each(data,function(i,comentario){
				var content='<article class="row">'+
					'<div class="col-md-2 col-sm-2 col-md-offset-1 col-sm-offset-0 hidden-xs"></div>'+
					'<div class="col-md-9 col-sm-9">'+
					'  <div class="panel panel-default arrow left">'+
					'	<div class="panel-heading right"><b><label>'+comentario.email+'</label></b></div>'+
					'	<div class="panel-body">'+
					'	  <header class="text-left">'+
					'		<div class="comment-user"><i class="fa fa-user"></i><b>'+comentario.name+'</b></div>'+
					'	  </header>'+
					'	  <div class="comment-post">'+
					'		<p>'+comentario.body+'</p>'+
					'	  </div>'+
					'	</div>'+
					' </div>'+
					'</div>'+
					'</article>';
	
				$("#listaComentarios").append(content);
			});
		});
	
	$("#agregarComentario").click(function(){
		window.location.href="agregarComentario.html?idPost="+idPostSeleccionado
	});
	
		$("#logout").click(function(){
		cerrarSesion();
	});
})
