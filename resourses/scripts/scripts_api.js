$(document).ready(function(){
	var root = 'https://jsonplaceholder.typicode.com';
	var listaUsuarios=[];
	
	var ajaxUusarios=$.ajax({
		url: root + '/users/',
		method: 'GET'
		}).then(function(data) {
			$.each(data,function(i,usuario){
				listaUsuarios[usuario.id]=usuario;
			});
			
			localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
		});	
	
	ajaxUusarios.then(function() { 	
		$.ajax({
			url: root + '/posts/',
			method: 'GET'
			}).then(function(data) {
				var localStorage = window.localStorage;
				var listaPostsFavoritos=[]
				var postFavoritos = localStorage.getItem('postFavoritos');	
				if(postFavoritos!=null){
					listaPostsFavoritos=JSON.parse(postFavoritos);
				}
				
				$.each(data,function(i,post){
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

						//console.log(post);		
					$("#divContenedor").append(content);
				});
			});
	});
	
	$('body').on('click', '.favorito', function(){
		var existe=marcarFavorito($(this).attr('id'));
		$(this).removeClass(existe ? 'glyphicon-star-empty':'glyphicon-star');
		$(this).addClass(existe ? 'glyphicon-star': 'glyphicon-star-empty');
					
		event.preventDefault();
	})
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
	}

	localStorage.setItem('postFavoritos', JSON.stringify(listaPostsFavoritos));
	return existe;
};