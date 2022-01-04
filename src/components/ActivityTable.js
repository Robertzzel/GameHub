import React,{useState,useEffect} from 'react';
import Pawn from './Pawn';
import '../static/activity/css/ActivityTable.css'
import tabla from '../static/activity/images/tabla.png'

export default function ActivityTable(){
    let getStateFromStorage = () => {
        return [parseInt(localStorage.getItem('nrOfPlayers')),localStorage.getItem('positions')]
    }
    const pawnColors = ['green','blue', 'red', 'purple'];
    let [ nrOfPlayersFromStorage, positionsFromStorage ] = getStateFromStorage();
    let [nrOfPlayers, setNrOfPlayers] = useState(nrOfPlayersFromStorage);
    let pawns = pawnColors.slice(0,nrOfPlayers).map((color)=><Pawn key={color} identifier={color}/>)

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
        let [x, y] = calculateCoordsFromPozition(pozitie);
        let pawn = document.getElementsByClassName(identifier)[0];
        pawn.style.gridColumn = `${y}`; 
        pawn.style.gridRow = `${x}`;
        saveStateToStorage();
    }

    let saveStateToStorage = () => {
        let positions = '';
        pawns.map((pawn)=>{
            let pawnHtml = document.getElementsByClassName(pawn.props.identifier)[0]
            positions += `${pawn.props.identifier} ${ calculatePozitionFromCoords(pawnHtml.style.gridRow.split(" ")[0],pawnHtml.style.gridColumn.substring(0,1))},`
        })

        localStorage.setItem('nrOfPlayers',nrOfPlayers);
        localStorage.setItem('positions', positions.substring(0,positions.length-1));
    }

    let setStateFromStorage = () =>{
        let positions = positionsFromStorage.split(',') // ['blue 0','red 1','yellow 7']

        for(let i=0;i<nrOfPlayers;++i){
            for(let j=0;j<nrOfPlayers;++j){
                if(pawns[i].props.identifier === positions[j].split(' ')[0]){
                    setPawnPosition(pawns[i].props.identifier,parseInt(positions[j].split(' ')[1]))
                }
            }
        }
    }

    let resetGame = () => {
        if(prompt("Sure you want to reset the game?(Y/N) ").toLowerCase() === 'y'){
            localStorage.clear()
            window.location.reload()
        }
    }
    
    useEffect(()=>{
        if(!isNaN(nrOfPlayers) && nrOfPlayers !== 0) setStateFromStorage();

        while( isNaN(nrOfPlayers) || nrOfPlayers === 0){
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
                   { pawns }
                </div>
            </div>
            <div className='d-flex flex-column' style={{margin: '15px'}}>
                { pawnColors.slice(0,nrOfPlayers).map((color)=>
                    <div key={`${color}Form`} className='d-flex flex-row' style={{marginTop: '10px'}}>
                        <h2>{color.toUpperCase()}</h2>
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
                <a className='btn btn-info btn-block' href='/activity/cards' style={{marginTop: '10%'}}>CARDS</a>
                <button onClick={resetGame}  className='btn btn-warning btn-block' style={{marginTop: '10%'}}>RESET</button>
            </div>
        </div>
    )
}