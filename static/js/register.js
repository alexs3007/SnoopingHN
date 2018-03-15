
	
	var errCallback = function(){
		alert("Error! Problemas de conexión con la base de datos!");
	}
	
	var db = openDatabase('dbSnoopinHN', '1.0', 'This is a client side database',2 * 1024 * 1024);

	db.transaction( function(transaction) {
		transaction.executeSql("CREATE TABLE IF NOT EXISTS User (" +
			"Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
			"Name TEXT NOT NULL, LastName TEXT NOT NULL, Email TEXT NOT NULL);");
	});

	var guardarUser = function(name,lastName, email, successCallback){
		db.transaction(function(transaction){
			transaction.executeSql(("INSERT INTO User (Name, LastName, Email) VALUES (?, ?, ?);"), 
			[name, lastName, email], function(transaction, results){successCallback(results);}, errCallback);
		});
	};

	function listadoUser(successCallback){
		db.transaction(function(transaction){
			transaction.executeSql(("SELECT * FROM User"),[],
				function(transaction, results){successCallback(results);}, errCallback);
			});
	};

	var val=function(names,emails, successCallback){
		db.transaction(function(transaction){
			transaction.executeSql(("SELECT * FROM User where Name=? and Email=?"),[names,emails],
				function(transaction, result){successCallback(result);}, errCallback);
			});
	};

var nombre=null;

function nuevo(url) 
{ 
	window.location = (url); 
} 
var list = function(result){
		console.dir(result);
}

var validar = function(result){
		if(result.rows.length != 0){
			var url="home.html";
			onClick=nuevo(url);
			alert("WELCOME "+names);
		}else{
		   alert("ERROR");
		}
}
	
listadoUser(list);

$('#RE').on('click', function(){
	var name=$('#name').val();
	var lastname=$('#lastname').val();
	var email=$('#email').val();

	if(name==''|| lastname==''||email=='')
	{
		alert("INGRESE TODOS LOS CAMPOS");
		return false;
	}else{
		guardarUser(name,lastname, email, function(){
		alert('Welcome '+name+' '+lastname);
		});
	}		
});

$('#IS').on('click', function(){
	names=$('#name').val();
	var emails= $('#email').val();	

	if(names=='' || emails==''){
		alert("INGRESE TODOS LOS CAMPOS");
		return false;
	}else{
		val(names, emails,validar);	
	}
});	

var getname=function(){
		var name=`<div id="user"><p>${nombre}</p></div>`;
		$('#user').prepend($(name).hide().fadeIn(1500) );
	}	