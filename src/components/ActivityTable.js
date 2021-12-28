import React,{useState,useEffect} from 'react';
import Pawn from './Pawn';
import '../static/activity/css/ActivityTable.css'
import tabla from '../static/activity/images/tabla.png'

export default function ActivityTable(){

    const pawnColors = ['green', 'yellow', 'red', 'blue'];
    let nrOfPlayers = 2;
    let pawns = [];

    let calculateCoordsFromPozition = (pozition) => {
        if(pozition === 0) return [1,5];
        else if(pozition === 49) return [12,5];
        else{
            let x = parseInt((pozition-1) / 4) + 1;
            let y = ((pozition-1) % 4) + 1;
            if(x % 2) y = 4 - y + 1;
            return [x,y];
        }
    }

    let setPawnPosition = (identifier,pozitie) => {
        let pawn = document.getElementsByClassName(identifier)[0];
        let [x, y] = calculateCoordsFromPozition(pozitie);
        pawn.style.gridColumn = `${x}`; 
        pawn.style.gridRow = `${y}`;
    }
    
    useEffect(()=>{
        while(true){
            nrOfPlayers = prompt('Numar de echipe')
            if( ['1','2','3','4'].includes(nrOfPlayers) ){
                nrOfPlayers = parseInt(nrOfPlayers);
                break;
            }
        }
    },[])

    return(
        <>
            <div className='container-div-board'>
                <img src={tabla} className="board-image"/>
                <div className='board-div'>
                   { pawnColors.slice(0,nrOfPlayers).map((color)=><Pawn key={color} identifier={color}/>) }
                </div>
            </div>
            <button onClick={()=>setPawnPosition('yellow',5)}>AS</button>
        </>
    )
}