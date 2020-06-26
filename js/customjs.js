var K_MAX_LINES = 25;
var buffer = [];
var K_DEF_VALUE = "$ ";

var K_ALL_COMMANDS = ["info","show"];
var CURRENT_DIR = "~";

const K_LINE_HEADER = "<p class='pt-3'>user@portfolio PCW64 ~</p>";
const K_UNDEFINED 	= '<p class="text-danger">Undefined command</p>';
const K_INFO		= 
	"<div>"+
	"<p>To use this terminal you must use these commands:</p>"+
	// "<p>show	: Used with <span class='text-success'>contact</span>,<span class='text-success'>about_me</span>,<span class='text-success'>skills</span>,<span class='text-success'>contact</span></p>"+
	"<p>&nbsp;show&nbsp;: Combined with "+textSuccess("contact")+","+textSuccess("about_me")+","+textSuccess("skills")+","+textSuccess("projects")+" shows the wanted information in a fancy way</p>"+
	"<p>&nbsp;&nbsp;&nbsp;&nbsp; EG "+textSuccess("show about_me")+"</p>"+
	"<p>&nbsp;info&nbsp;: Shows this information</p>"+
	"</div>";

function textSuccess(text){
	return "<span class='text-success'>"+text+"</span>";
}

function checkUserInput(event){
	// Establece siempre como mínimo la cadena de caracteres "$ " de una consola por defecto
	let value = document.getElementById("user_input").value;


	if(value.length < 2){
		resetInputValue();
	}
	else{
		if(event.key == "Enter"){
			if(value == K_DEF_VALUE) return;

			// Hacer cosas
			buffer.push(K_LINE_HEADER);
			buffer.push("<p>"+value+"</p>");



			// Tratar el valor
			value = value.substr(2);
			tmp = value.split(" ");
			command = tmp[0];

			if(K_ALL_COMMANDS.includes(command)){
				buffer.push(K_INFO);
			}
			else{
				buffer.push(K_UNDEFINED);
			}

			while(buffer.length > K_MAX_LINES) buffer.shift();
			document.getElementById("lines").innerHTML = buffer.join("");

			// Reset del valor
			resetInputValue();
		}
	}
}

function resetInputValue(){
	document.getElementById("user_input").value	= "$ ";
}




// Funciones de carga de contenido
const page_about_me = "./html/about_me.html";
const prj_meat_starto = "./html/meat_starto.html";
const prj_tetris = "./html/tetris.html";
const header = "./html/header.html";

function loadAboutMe(){
	jQuery.get(page_about_me, function(data) {
		$("#main_content").html(data);
	});
}

function loadMeatStarto(){
	jQuery.get(prj_meat_starto, function(data) {
		$("#main_content").html(data);
	});
}

function loadTetris(){
	jQuery.get(prj_tetris, function(data) {
		$("#main_content").html(data);
	});
}

// Se ejecuta al inicio
$(document).ready(function() {
	jQuery.get(page_about_me, function(data) {
		$("#main_content").html(data);
	});

	jQuery.get(header, function(data) {
		$("#header").html(data);
	});
});