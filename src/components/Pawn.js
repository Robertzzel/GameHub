import React from 'react';

export default function ActivityTable(props){
    const style={
        'grid-row': `${props.x}`,
        'grid-column': `${props.y}`
    }
    return(
        <div className={props.className} style={style}>
            <p>{props.pozitie}</p>
        </div>
    )
}