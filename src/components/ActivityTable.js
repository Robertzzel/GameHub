import React,{useState,useEffect} from 'react';
import Pawn from './Pawn';
import '../static/activity/css/ActivityTable.css'
import tabla from '../static/activity/images/tabla.png'

export default function ActivityTable(){

    let pawnList;
    useEffect(()=>{
        
    },[])

    return(
        <>
            <div className='container-div-board'>
                <img src={tabla} className="board-image"/>
                <div className='board-div'>
                    <Pawn className='pawn' x='1' y='2'></Pawn>
                </div>
            </div>
        </>
    )
}