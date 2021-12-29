import React from 'react';
import '../static/activity/css/Pawn.css'
import greenPawnImage from '../static/activity/images/pioni/greenPawn.png'
import bluePawnImage from '../static/activity/images/pioni/bluePawn.png'
import purplePawnImage from '../static/activity/images/pioni/purplePawn.png'
import redPawnImage from '../static/activity/images/pioni/redPawn.png'

export default function ActivityTable(props){
    let divStyle={
        gridRow: `1`,
        gridColumn: `5`,
        maxWidth: '30%',
        maxHeight: '80%',
        position: 'relative',
        left: '10%'
    }
    const imageStyle={
        width: '100%',
        height:'100%',
    }

    let correctPawnImage;
    switch(props.identifier){
        case 'green':
            correctPawnImage = greenPawnImage;
            divStyle.left = '15%';
            break;
        case 'blue':
            correctPawnImage = bluePawnImage;
            divStyle.left = '30%';
            break;
        case 'purple':
            correctPawnImage = purplePawnImage;
            divStyle.left = '45%';
            break;
        case 'red':
            correctPawnImage = redPawnImage;
            divStyle.left = '60%';
            break;
        case 'yellow':
            correctPawnImage = purplePawnImage;
            divStyle.left = '75%';
            break;
        default:
            correctPawnImage = purplePawnImage;
            divStyle.left = '75%';
    }

    return(
        <div className={'pawn ' + props.identifier} style={divStyle}>
            <img src={correctPawnImage} alt='pawn-img' style={imageStyle}></img>
        </div>
    )
}