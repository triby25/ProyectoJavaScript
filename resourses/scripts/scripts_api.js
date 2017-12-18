var listaPostsFavoritos=[];
var listaUsuarios=[];
var listaPaginas=[];
var postPorPagina=10;
var paginaActual;

$(document).ready(function(){
	//var root = 'https://jsonplaceholder.typicode.com';
	var root = 'http://192.168.200.245:8080';
	
	
	var dbToken = localStorage.getItem('usuarioLogueado');
	var token;
	
	if (dbToken != null){
		token = JSON.parse(dbToken);
	}
	
	
	var ajaxUusarios=$.ajax({
		url: root + '/users?token='+token,
		method: 'GET'
		}).then(function(data) {
			 $.each(data,function(i,usuario){
				listaUsuarios[usuario.id]=usuario;
			});
			
			localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios)); 
		});	
	
	ajaxUusarios.then(function() { 	
		$.ajax({
			url: root + '/posts?token='+token,
			method: 'GET'
			}).then(function(data) {
				
				 /*var filtro=$(data).filter(function (i,n){
					return n.id>3;
				});*/
	
				var cantidadPaginas=data.length/postPorPagina,pagina=0,ini=0;
	
				for(var pagina=0;pagina<cantidadPaginas;pagina++){
					var itemPagina=data.splice(0,postPorPagina);
					listaPaginas.push(itemPagina);
				}

				cargarPosts(0);
				var itemPaginacion=$("#itemPaginas");
				for(var pagina=0;pagina<cantidadPaginas;pagina++){
					var ulPagina='<li id="pagina'+pagina+'" class="numero-pagina'+(pagina==0 ? ' active':'')+'" data-id="'+pagina+'"><a href="#">'+(pagina+1)+'</a></li>';
					itemPaginacion.append(ulPagina);
				}
			});
	});
	
	$('body').on('click', '.favorito', function(){
		var existe=marcarFavorito($(this).attr('id'));
		$(this).removeClass(existe ? 'glyphicon-star-empty':'glyphicon-star');
		$(this).addClass(existe ? 'glyphicon-star': 'glyphicon-star-empty');
					
		event.preventDefault();
	})
	
	$('body').on('click', '.numero-pagina', function(){
		$("#pagina"+paginaActual).removeClass("active");
		
		$(this).addClass("active");
		cargarPosts($(this).data('id'));		
		//event.preventDefault();
	})
	
	$("#agregarPost").click(function(){
		window.location.href="manejadorPost.html"
	});
	
	$("#logout").click(function(){
		cerrarSesion();
	});
})

function marcarFavorito(id){
	var localStorage = window.localStorage;
	var listaPostsFavoritos = {};
	var dbPostFavorito = localStorage.getItem('postFavoritos');
	var existe = false;
	
	if (dbPostFavorito != null){
		listaPostsFavoritos = JSON.parse(dbPostFavorito);
		if(id in listaPostsFavoritos){
			delete listaPostsFavoritos[id];
		}
		else{		
			existe = true;
			listaPostsFavoritos[id] = true;
		}
	}else{
		listaPostsFavoritos[id] = true;
		existe = true;
	}

	localStorage.setItem('postFavoritos', JSON.stringify(listaPostsFavoritos));
	return existe;
};

function cargarPosts(idPagina){
	paginaActual=idPagina;
	var listaPostMostrar =listaPaginas[idPagina];
	$("#divContenedor").html("");

	var localStorage = window.localStorage;

	var postFavoritos = localStorage.getItem('postFavoritos');	
	if(postFavoritos!=null){
		listaPostsFavoritos=JSON.parse(postFavoritos);
	}
	
	$.each(listaPostMostrar,function(i,post){
		var existe = post.id in listaPostsFavoritos;
		var objUsuario=listaUsuarios[post.userId];
					
		var content='<div class="divPost">'+
		'			<div class="row divPostHeader hdimg"><h3>'+
		'				<div class="col-md-11">'+
		'					<a href="comentarios.html?idPost='+post.id+'">'+post.title+'</a>'+
		'				</div>'+
		'				<div class="col-md-1">'+
		'					<a href="#">'+
		'						<span class="favorito glyphicon '+(existe ? 'glyphicon-star':'glyphicon-star-empty')+'" id="'+post.id+'"></span>'+
		'					</a>'+
		'				</div>'+
		'			</h3></div>'+
		'			<div class="row">'+
		'				<div class="col-md-12">'+
		'  					<p class="card-text">'+post.body+'</p>'+
		'				</div>'+
		'			</div>'+
		'			<div class="row">'+
		'				<div class="col-md-12" align="right">'+
		'  					<a href="infoUsuario.html?idUsuario='+objUsuario["id"]+'">'+
		'						<span class="glyphicon glyphicon-user"><label class="glyphicon-label-padding">'+objUsuario["name"]+'</label></span></br>'+
		'						<span class="glyphicon glyphicon-envelope"><label class="glyphicon-label-padding">'+objUsuario["email"]+'</label></span>'+
		'					</a>'+
		'				</div>'+
		'			</div>';
		
		$("#divContenedor").append(content);
	});
	
	
};

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
