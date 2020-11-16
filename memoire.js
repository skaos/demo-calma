var carte1;
var carte2;
var noCarte = 1;
var noImg1;
var noImg2;
var temps = 45;
var tab0 = new Array(4);
var tab1 = new Array(4);
var tab2 = new Array(4);
var tab3 = new Array(4);
var tableau = new Array(tab0, tab1, tab2, tab3);
var horloge;
var delais;
var cptFois = 0;
 
function afficherInterface()
{
	for (var cpt=0; cpt<=15; cpt++)
	{
		document.write("<img id='img" + cpt +"' src='vide.png' onclick='boutonClick(this,"+cpt+");' width='85px' height='85px'  />");
	}
}
function stop()
{
	clearInterval(horloge);
}
function timerHorloge()
{
	temps--;
	document.getElementById('temps').innerHTML = temps;

	if (temps == 0)
	{
		clearInterval(horloge);
		for (var x = 0; x < 16; x++)	
			document.getElementById("img" + x).disabled = true;
		 var reponse = confirm("Désolé vous avez perdu! \nVoulez-vous rejouer une partie?");
		 if(reponse == true)
			nouvellePartie();
	}
}
//--------------------------------------------------------------------------------- 
function timerDelais()
{
	clearTimeout(delais);
	document.getElementById(noImg1.id).setAttribute("src", "vide.png");
	document.getElementById(noImg2.id).setAttribute("src", "vide.png");
	document.getElementById(noImg1.id).disabled = false;
	document.getElementById(noImg2.id).disabled = false;
}
function boutonClick(img, noImage)
{
	afficherImage(img, noImage) 
	verifierMemoire(img, noImage);
}
function verifierMemoire(img, no) 
{
 	var x = parseInt(no / 4);
	var y = no % 4;
	
	if (noCarte == 1)
	{
		carte1 = tableau[x][y];
		noImg1 = img;
		noCarte++;
	}
	else
	{
		carte2 = tableau[x][y];
		noCarte--;
		noImg2 = img;
		if (carte1 != carte2)
			setTimeout("timerDelais()",300);
		else
		{
			cptFois++;
			if (cptFois == 8)
			{
				temps = 45 - temps;
				clearInterval(horloge);
				alert('Bravo! \nVous avez réussi en '+temps+ ' secondes');
			}
		}
	}
}
function afficherImage(img, no) 
{
	var x = parseInt(no / 4);
	var y = no % 4;
	var indice = tableau[x][y] - 1;
	var tableauImage = ["auto.png","avion.png","coeur.png","couronne.png","enveloppe.png","parapluie.png","main.png", "trefle.png"];
	
	document.getElementById(img.id).setAttribute("src", tableauImage[indice]);
	document.getElementById(img.id).disabled = true;
 }
 function nouvellePartie()
 {
	var valeur = 0;
	var nbX = 0;
	var nbY = 0;
	
	for (var x = 0; x < 4; x++)
		for (var y = 0; y < 4; y++)
		{
			nbX = Math.floor(Math.random()*4);
			nbY = Math.floor(Math.random()*4);
			valeur = tableau[x][y];
			tableau[x][y] = tableau[nbX][nbY];
			tableau[nbX][nbY] = valeur;
		}
	for (var x = 0; x < 16; x++)	
	{
		document.getElementById("img" + x).src= "vide.png";
		document.getElementById("img" + x).disabled = false;
	}

	temps = 45;
	cptFois = 0;
	noCarte = 1;
	document.getElementById('temps').innerHTML = temps;
	horloge = setInterval("timerHorloge()", 1000);
 }
 function initialiserTab()
 {
	var cpt = 1;
	for (var x = 0; x < 4; x+=2)
		for (var y = 0; y < 4; y++)
		{
			tableau[x][y] = cpt;
			tableau[x+1][y] = cpt;
			cpt++;
		}	
	for (var x = 0; x < 16; x++)	
		document.getElementById("img" + x).disabled = true;
 }