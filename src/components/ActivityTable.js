import React,{useState,useEffect} from 'react';
import Pawn from './Pawn';
import '../static/activity/css/ActivityTable.css'
import tabla from '../static/activity/images/tabla.png'

export default function ActivityTable(){
    const pawnColors = ['green','blue', 'red', 'purple'];
    let pawnOnEachPosition = Array(50).fill(0)
    let [nrOfPlayers, setNrOfPlayers] = useState(0);

    let calculateCoordsFromPozition = (pozition) => {
        pozition = parseInt(pozition)
        if(pozition <= 0){
            return [1,5];
        }
        else if(pozition >= 49){
            return [12,5];
        } 
        else{
            let x = parseInt((pozition-1) / 4) + 1;
            let y = ((pozition-1) % 4) + 1;
            if(x % 2) y = 4 - y + 1;
            return [x,y];
        }
        
    }

    let calculatePozitionFromCoords = (x,y) => {
        x= parseInt(x)
        y = parseInt(y)
        if ( x === 1 && y===5 ) return 0;
        else if( x===12 && y===5 ) return 49;
        else{
            let position = 4 * (x-1);
            if (x % 2) position += 4 - (y-1);
            else position += y;
            return position;
        }
    }

    let getPawnPosition = (identifier) => {
        let pawn = document.getElementsByClassName(identifier)[0];
        let y = pawn.style.gridColumn.split('/')[0].trim()
        let x = pawn.style.gridRow.split('/')[0].trim()
        return calculatePozitionFromCoords(parseInt(x),parseInt(y))
    }

    let setPawnPosition = (identifier,pozitie) => {
        pawnOnEachPosition[getPawnPosition(identifier)]--;
        pawnOnEachPosition[pozitie]++;
        let [x, y] = calculateCoordsFromPozition(pozitie);
        let pawn = document.getElementsByClassName(identifier)[0];
        pawn.style.gridColumn = `${y}`; 
        pawn.style.gridRow = `${x}`;
    }
    
    useEffect(()=>{
        while(true){
            let aux= prompt('Numar de echipe')
            if( ['1','2','3','4'].includes(aux) ){
                setNrOfPlayers(parseInt(aux));
                break;
            }
        }
    },[])


    return(
        <div className='main-div'>
            <div className='container-div-board'>
                <img src={tabla} alt='board-img' className="board-image"/>
                <div className='board-div'>
                   { pawnColors.slice(0,nrOfPlayers).map((color)=><Pawn key={color} identifier={color}/>) }
                </div>
            </div>
            <div className='d-flex flex-column' style={{margin: '15px'}}>
                { pawnColors.slice(0,nrOfPlayers).map((color)=>
                    <div key={`${color}Form`} className='d-flex flex-row' style={{marginTop: '10px'}}>
                        <h2>{color}</h2>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)+1))} className='btn btn-lg btn-success' style={{marginRight: '10px'}}>+1</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)+3))} className='btn btn-lg btn-success' style={{marginRight: '10px'}}>+3</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)+4))} className='btn btn-lg btn-success' style={{marginRight: '10px'}}>+4</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)+5))} className='btn btn-lg btn-success' style={{marginRight: '10px'}}>+5</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)-1))} className='btn btn-lg btn-danger' style={{marginRight: '10px'}}>-1</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)-3))} className='btn btn-lg btn-danger' style={{marginRight: '10px'}}>-3</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)-4))} className='btn btn-lg btn-danger' style={{marginRight: '10px'}}>-4</button>
                        <button onClick={()=>setPawnPosition(color,(getPawnPosition(color)-5))} className='btn btn-lg btn-danger' style={{marginRight: '10px'}}>-5</button>
                    </div>
                ) }
            </div>
        </div>
    )
}