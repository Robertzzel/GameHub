import React from 'react';
import '../static/activity/css/Pawn.css'

export default function ActivityTable(props){
    const style={
        gridRow: `1`,
        gridColumn: `5`
    }
    return(
        <div className={'pawn ' + props.identifier} style={style}>
            <p>{props.pozitie}</p>
        </div>
    )
}