import React from 'react';
import '../static/activity/css/GameCard.css'

export default function GameCard(props) {
    return (
        <div className='card-joc justify-content-center'>
            <img src={props.img} alt={props.img} style={props.styleImg}/>
            <h3 className='bold'>{ props.title }</h3>
            <a href={ props.link } className="btn btn-primary">Mergi la joc</a>
        </div>
    )
}