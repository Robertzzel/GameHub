let heightCarte = 307;
let widthCarte = 214;
var tipCarte=3;
var nrOrdineCarte = 1;
var imgCarte = document.getElementById("divCarteAfisat")
var img3 = document.getElementById("img3")
var img4 = document.getElementById("img4")
var img5 = document.getElementById("img5")

restoreStorage()

img3.addEventListener("click",function(){
    tipCarte = 3
    nrOrdineCarte = Math.floor(Math.random()*6+1)
    generareCarte(tipCarte,nrOrdineCarte)
});
img4.addEventListener("click",function(){
    tipCarte = 4
    nrOrdineCarte = Math.floor(Math.random()*5+1)
    generareCarte(tipCarte,nrOrdineCarte)
});
img5.addEventListener("click",function(){
    tipCarte = 5
    nrOrdineCarte = Math.floor(Math.random()*6+1)
    generareCarte(tipCarte,nrOrdineCarte)
});

function salveazaInStorage(url,offsetWidth,offsetHeight){
    let stringDeSalvat = ""
    stringDeSalvat += `${url};`
    stringDeSalvat += `${offsetWidth};`
    stringDeSalvat += `${offsetHeight}`
    localStorage.setItem("carte",stringDeSalvat)
}

function restoreStorage(){

    let salvat = localStorage.getItem('carte')
    if(salvat === null){
        return
    }else{
        salvat = salvat.split(";")
        imgCarte.style.backgroundImage = `url(${salvat[0]})`
        imgCarte.style.display = "inline-block";
        imgCarte.style.height = "307px";
        imgCarte.style.width = "214px";
        imgCarte.style.backgroundPositionX = salvat[1]
        imgCarte.style.backgroundPositionY = salvat[2]
    }
}

function generareCarte(tipCarte,nrOrdineCarte){
    let pozaRandom = `/static/carti/${tipCarte}.${nrOrdineCarte}.jpg`
    let widthRandom = `${widthCarte * Math.floor(Math.random()*6)}px`
    let heightRandom = `${heightCarte * Math.floor(Math.random()*6)}px`
    salveazaInStorage(pozaRandom,widthRandom,heightRandom)

    imgCarte.style.backgroundImage = `url(${pozaRandom})`
    imgCarte.style.display = "inline-block";
    imgCarte.style.height = "307px";
    imgCarte.style.width = "214px";
    imgCarte.style.backgroundPositionX = widthRandom
    imgCarte.style.backgroundPositionY = heightRandom
}

