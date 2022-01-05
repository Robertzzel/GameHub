import React from 'react';
import '../static/activity/css/CardsView.css';
import cardType3 from '../static/activity/images/tipuriCarti/buton3.png';
import cardType4 from '../static/activity/images/tipuriCarti/buton4.png';
import cardType5 from '../static/activity/images/tipuriCarti/buton5.png';
import cards3_1 from '../static/activity/images/carti/3.1.jpg'
import cards3_2 from '../static/activity/images/carti/3.2.jpg'
import cards3_3 from '../static/activity/images/carti/3.3.jpg'
import cards3_4 from '../static/activity/images/carti/3.4.jpg'
import cards3_5 from '../static/activity/images/carti/3.5.jpg'
import cards3_6 from '../static/activity/images/carti/3.6.jpg'
import cards4_1 from '../static/activity/images/carti/4.1.jpg'
import cards4_2 from '../static/activity/images/carti/4.2.jpg'
import cards4_3 from '../static/activity/images/carti/4.3.jpg'
import cards4_4 from '../static/activity/images/carti/4.4.jpg'
import cards4_5 from '../static/activity/images/carti/4.5.jpg'
import cards5_1 from '../static/activity/images/carti/5.1.jpg'
import cards5_2 from '../static/activity/images/carti/5.2.jpg'
import cards5_3 from '../static/activity/images/carti/5.3.jpg'
import cards5_4 from '../static/activity/images/carti/5.4.jpg'
import cards5_5 from '../static/activity/images/carti/5.5.jpg'
import cards5_6 from '../static/activity/images/carti/5.6.jpg'
import { useEffect } from 'react/cjs/react.development';

export default function CardsView(){
    const cardHeight = 307;
    const cardWidth = 214;
    var pickedCardStyle;
    const cards = {
        3: {
            1: cards3_1,
            2: cards3_2,
            3: cards3_3,
            4: cards3_4,
            5: cards3_5,
            6: cards3_6,
        },
        4: {
            1: cards4_1,
            2: cards4_2,
            3: cards4_3,
            4: cards4_4,
            5: cards4_5,
        },
        5: {
            1: cards5_1,
            2: cards5_2,
            3: cards5_3,
            4: cards5_4,
            5: cards5_5,
            6: cards5_6,
        }
    }

    let saveInMemory = (cardType,nrInSetOfCards,offsetX,offsetY) => {
        localStorage.setItem("card",`${cardType} ${nrInSetOfCards} ${offsetX} ${offsetY}`)
    }

    let restoreFromMemory = () => {
        let cardFromMemory = localStorage.getItem("card")
        if(cardFromMemory !== null || cardFromMemory !== undefined){

            let cardSet = cards[parseInt(cardFromMemory.split(' ')[0])][parseInt(cardFromMemory.split(' ')[1])]
            let offsetX = parseInt(cardFromMemory.split(' ')[2])
            let offsetY = parseInt(cardFromMemory.split(' ')[3])

            let pickedCardImage = document.getElementsByClassName('pickedCard-div')[0];
            pickedCardImage.style.backgroundImage = `url(${cardSet})`;
            pickedCardImage.style.height = `${cardHeight}px`;
            pickedCardImage.style.width = `${cardWidth}px`;
            
            pickedCardImage.style.backgroundPosition = `-${offsetX}px -${offsetY}px`
            pickedCardImage.style.backgroundPositionX = `-${offsetX}px`;
            pickedCardImage.style.backgroundPositionY = `-${offsetY}px`;
        }
    }

    let pickCard = (cardType) => {
        let nrInSetOfCards = 0;
        
        switch(cardType){
            case 3:
                nrInSetOfCards = Math.floor(Math.random()*6+1);
                break;
            case 4:
                nrInSetOfCards = Math.floor(Math.random()*5+1);
                break;
            case 5:
                nrInSetOfCards = Math.floor(Math.random()*6+1);
                break;
            default:
                nrInSetOfCards = Math.floor(Math.random()*6+1);
        }

        let cardSet = cards[`${cardType}`][`${nrInSetOfCards}`]

        let offsetX = cardWidth * Math.floor(Math.random()*5);
        let offsetY = cardHeight * Math.floor(Math.random()*5);

        let pickedCardImage = document.getElementsByClassName('pickedCard-div')[0];
        pickedCardImage.style.backgroundImage = `url(${cardSet})`;
        pickedCardImage.style.height = `${cardHeight}px`;
        pickedCardImage.style.width = `${cardWidth}px`;
        pickedCardImage.style.backgroundPositionX = `-${offsetX}px`;
        pickedCardImage.style.backgroundPositionY = `-${offsetY}px`;

        saveInMemory(cardType,nrInSetOfCards,offsetX,offsetY);
    }

    useEffect(()=>{
        restoreFromMemory();
    },[])

    return (
        <div className='cards-main-div'>
            <a className='btn btn-warning btn-lg' href='/activity'>BACK</a>
            <div className='cards-inner-div'>
                <img onClick={()=>pickCard(3)} src={cardType3} style={{height: `${cardHeight}px`,width: `${cardWidth}px`, marginRight: '5%'}} alt='card-img3'></img>
                <img onClick={()=>pickCard(4)} src={cardType4} style={{height: `${cardHeight}px`,width: `${cardWidth}px`, marginRight: '5%'}} alt='card-img4'></img>
                <img onClick={()=>pickCard(5)} src={cardType5} style={{height: `${cardHeight}px`,width: `${cardWidth}px`, marginRight: '5%'}} alt='card-img5'></img>
                <div className='pickedCard-div' style={pickedCardStyle}></div>
            </div>
        </div>
    )
}