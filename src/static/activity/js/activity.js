import {listaUrlPioni, pozitiiCoordonate, culori} from './utils.js'

var divGrid = document.getElementById("grid")
var divInput = document.getElementById("inputForm")
var listaPioni=[];
var nrJucatori=0;

function init(){
    if(restoreDinStorage()==0){
        nrJucatori=intreabaJucatori()
        initializeazaPioni(nrJucatori)
    }

    divInput.innerHTML= construiesteForm()
}

function initializeazaPioni(jucatori){
    for(let i=0;i<jucatori;i++){
        let pion = crearePion(listaUrlPioni[i])
        setareCelula(pion,0)
        divGrid.appendChild(pion)
        listaPioni.push(pion)
    }
}

function salveazaStareLocalStorage(){
    let nrPioni = 0
    let pozitii = ""
    listaPioni.forEach(pion => {
        nrPioni++;
        pozitii += getKeyByValue(pozitiiCoordonate, extragerePozitie(pion)) + ";"
    });
    localStorage.setItem('nrPioni',nrPioni)
    localStorage.setItem('pozitii',pozitii.substring(0,pozitii.length-1))
}

function restoreDinStorage(){
    let jucatoriDinStorage = localStorage.getItem('nrPioni')
    let pozitiiDinStorage = localStorage.getItem('pozitii')
    if(nrJucatori === null || pozitiiDinStorage === null){
        return 0;
    }else{
        nrJucatori = jucatoriDinStorage
        pozitiiDinStorage = pozitiiDinStorage.split(";")
        let contor=0;
  
        initializeazaPioni(nrJucatori)
        for(let i=0;i<nrJucatori;i++){
            try{
                setareCelula(listaPioni[i],pozitiiDinStorage[i])
            }catch(TypeError){
                console.log("Nu coincide cu numarul anterior de jucatori")
            }
        }
        return 1;
    }
}


function construiesteForm(){
    let stringFinal = '<h1>Alege pion:</h1><br>'
    stringFinal += '<select style="width:200px; height:30px" name="pion" id="pion">'
    for(let i=0;i<nrJucatori;i++){
        stringFinal += `<option value="${i+1}">${culori[i]}</option>`
    }
    stringFinal += "</select><br>"

    stringFinal +=`<h1 class="mt-2">Cate pozitii:</h1><br>
    <input type="number" id="pozitii" name="pozitii"><br>
    <button type="button" id="submitBtn" class="btn btn-primary mt-2">MUTA</button><br>
    <a href="/activity/carti" class="btn btn-warning mt-5">CARTI</a><br>
    <button type="button" id="resetBtn" class="btn btn-danger mt-5">RESET</button>`

    return stringFinal
}

function getKeyByValue(dict,val) {
    for (const item in dict) {
        if(dict[item][0] == val[0] && dict[item][1] == val[1]){
            return item
        }
    }
    return -1
  }

function crearePion(url){

    let pion = document.createElement('div')
    pion.style.backgroundImage = "url('"+url+"')";
    pion.style.backgroundSize = "cover";
    pion.style.height = "150px";
    pion.style.width = "90px";
    return pion

}

function extragerePozitie(pion){
    let rez=[]
    rez.push(pion.style.gridRow.split(" ")[0])
    rez.push(pion.style.gridColumn.substring(0,1))
    return rez
}

function pioniPePozitie(nrCelula){
    let elemPePozitie = 0
    let celula = pozitiiCoordonate[nrCelula]
    listaPioni.forEach(elem => {
        let pozitieActuala = extragerePozitie(elem)
        if(pozitieActuala[0] == celula[0] && pozitieActuala[1] == celula[1]){
            elemPePozitie++;
        }
    });
    return elemPePozitie;
}

function anuntaCastigatorul(nr){
    alert(`A castigat pionul ${culori[nr]}`)
}

function setareCelula(div,nrCelula){
    let elemPePozitie = pioniPePozitie(nrCelula);
    let celula = pozitiiCoordonate[nrCelula]


    let width = 20
    let height = 40

    div.style.gridRow = `${celula[0]}/12`;
    div.style.gridColumn = `${celula[1]}/5`;
    div.style.marginTop = `${elemPePozitie*height/2}px`;
    div.style.marginLeft = `${elemPePozitie*width}px`;
}

function intreabaJucatori(){
    let jucatori=prompt("Numar echipe(Maxim 4):");
    while(nrJucatori>4){
        nrJucatori=prompt("Numar echipe(Maxim 4):");
    }
    return jucatori 
}



init()

var submitBtn = document.getElementById("submitBtn")
var resetBtn = document.getElementById("resetBtn")
var inputPion = document.getElementById("pion")
var inputPozitii = document.getElementById("pozitii")

submitBtn.addEventListener("click",function(){
    let pionDeMutat = listaPioni[inputPion.value-1]
    let pozitieActuala = parseInt(getKeyByValue(pozitiiCoordonate,extragerePozitie(pionDeMutat)))
    let pozitieViitoare = pozitieActuala + parseInt(inputPozitii.value)
    if(pozitieViitoare<51){
        setareCelula(pionDeMutat,pozitieViitoare)
        salveazaStareLocalStorage()
    }else{
        anuntaCastigatorul(inputPion.value-1);
    }
})

resetBtn.addEventListener("click",function(){
    let confirmare = prompt("Esti sigur ca vrei sa resetezi?")
    let confimare2 = prompt("Sigur sigur?")
    if(confirmare.toLowerCase() == "da" && confimare2.toLowerCase()=="da"){
        localStorage.clear()
        location.reload()
    }
    
})

