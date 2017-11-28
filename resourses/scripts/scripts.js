
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
				var id=document.getElementById("id").value;
				var nombre=document.getElementById("nombre").value;
				var matricula=document.getElementById("matricula").value;
				var identificacion=document.getElementById("identificacion").value;
				var telefono=document.getElementById("telefono").value;
				var email=document.getElementById("email").value;
					
				var table=document.getElementById("estudiantes");
				var tr=document.createElement("tr");
				
				var tdId=document.createElement("td");	
				var txtId=document.createTextNode(id);
				
				var tdNombre=document.createElement("td");	
				var txtNombre=document.createTextNode(nombre);
				
				var tdMatricula=document.createElement("td");
				var txtMatricula=document.createTextNode(matricula);
				
				var tdIdentifcacion=document.createElement("td");
				var txtIdentifcacion=document.createTextNode(identificacion);
						
				var tdTelefono=document.createElement("td");
				var txtTelefono=document.createTextNode(telefono);
				
				var tdEmail=document.createElement("td");	
				var txtEmail=document.createTextNode(email);
				
				tdId.appendChild(txtId);
				tdNombre.appendChild(txtNombre);
				tdMatricula.appendChild(txtMatricula);
				tdIdentifcacion.appendChild(txtIdentifcacion);
				tdTelefono.appendChild(txtTelefono);
				tdEmail.appendChild(txtEmail);
				
				tr.appendChild(tdId);
				tr.appendChild(tdNombre);
				tr.appendChild(tdMatricula);
				tr.appendChild(tdIdentifcacion);
				tr.appendChild(tdTelefono);
				tr.appendChild(tdEmail);
				
				table.appendChild(tr);
			
			};
			
			
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
			
	