
var Post=function(){
	self=this;
	self.userId="";
	self.id="";
	self.title="";
	self.body="";
}	
			
$(document).ready(function(){
	var root = 'https://jsonplaceholder.typicode.com';
	var listaUsuarios=[];
	
	$.ajax({
		url: root + '/users/',
		method: 'GET'
		}).then(function(data) {
			$.each(data,function(i,usuario){
				listaUsuarios[usuario.id]=usuario;
			});
			localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
		});	
		
	$.ajax({
		url: root + '/posts/',
		method: 'GET'
		}).then(function(data) {
				var listaPostsFavoritos=[]
				var postFavoritos = localStorage.getItem('postFavoritos');
				var listaPostsFavoritos=JSON.parse(postFavoritos);
				if(listaPostsFavoritos==null)
					listaPostsFavoritos=[];
	
			$.each(data,function(i,post){
				var objUsuario=listaUsuarios[post.userId];
				
				var clase="glyphicon glyphicon-star-empty";
				for (var i = 0; i < listaPostsFavoritos.length; i++) {
					if(listaPostsFavoritos[i]==post.id){
						clase="glyphicon glyphicon-star";
						break;
					}
				}
				
				var content='<div class="card mb-4 divPost">'+
					'<div class="card-body">'+
					'  <h2 class="card-title">'+
					'<a href="#" style="padding-right: 10px;">'+
						'<span class="'+clase+'" id="'+post.id+'"></span>'+
					'</a>'+
					'<a href="comentarios.html?idPost='+post.id+'">'+post.title+'</a></h2>'+
					'  <p class="card-text">'+post.body+'</p>'+
					'</div>'+
					'<div class="card-footer text-muted">'+
					'  <a href="infoUsuario.html?idUsuario='+objUsuario["id"]+'">'+objUsuario["name"]+' ('+objUsuario["email"]+')</a>'+
					'</div>'+
					'</div>';

					//console.log(post);		
				$("#divContenedor").append(content);
			});
		});
	
	$('body').on('click', '#divContenedor span', function(){
		marcarFavorito($(this).attr('id'));
	})
})

function marcarFavorito(id){
	var listaPostsFavoritos=[]
	var marcaEstrella =document.getElementById(id);
	var postFavoritos = localStorage.getItem('postFavoritos');
	var listaPostsFavoritos=JSON.parse(postFavoritos);
	if(listaPostsFavoritos==null)
		listaPostsFavoritos=[];
		
		
	if(marcaEstrella.classList.contains("glyphicon-star-empty")){
		marcaEstrella.setAttribute("class", "glyphicon glyphicon-star");
		listaPostsFavoritos.push(id);
		localStorage.setItem('postFavoritos', JSON.stringify(listaPostsFavoritos));
	}
	else{
		marcaEstrella.setAttribute("class", "glyphicon glyphicon-star-empty");
		for (var i = 0; i < listaPostsFavoritos.length; i++) {
			if(listaPostsFavoritos[i]==id){
				listaPostsFavoritos.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('postFavoritos', JSON.stringify(listaPostsFavoritos));
	}
};