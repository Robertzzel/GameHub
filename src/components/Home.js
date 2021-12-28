import React from 'react';
import GameCard from './GameCard';
import activityImage from '../static/activity/images/ActivityIcon.jpg'
import '../static/activity/css/Home.css'

export default function Home(){
    return(
        <div className='home-layout'>
            <GameCard img={activityImage} title='Activity' link='/activity' styleImg={{ width: '240px', height: '250px' }}/>
        </div>
    )
}