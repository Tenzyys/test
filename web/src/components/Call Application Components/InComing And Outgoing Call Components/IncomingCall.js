import React , {useContext, useEffect} from 'react';

import styled from 'styled-components';
import './IncomingCall.css'

import wallpaper1 from "../../../Images/Backgrounds/1.png";
import wallpaper2 from "../../../Images/Backgrounds/2.png";
import wallpaper3 from "../../../Images/Backgrounds/3.png";
import wallpaper4 from "../../../Images/Backgrounds/4.png";
import wallpaper5 from "../../../Images/Backgrounds/5.png";
import wallpaper6 from "../../../Images/Backgrounds/6.png";
import wallpaper7 from "../../../Images/Backgrounds/7.png";
import wallpaper8 from "../../../Images/Backgrounds/8.png";
import wallpaper9 from "../../../Images/Backgrounds/9.png";
import wallpaper10 from "../../../Images/Backgrounds/10.png";
import wallpaper11 from "../../../Images/Backgrounds/11.png";
import wallpaper12 from "../../../Images/Backgrounds/12.png";
import wallpaper13 from "../../../Images/Backgrounds/13.png";
import wallpaper14 from "../../../Images/Backgrounds/14.png";

//Ringtones
import RingTone1 from "../../../RingTones/1.mp3"
import RingTone2 from "../../../RingTones/2.mp3"
import RingTone3 from "../../../RingTones/3.mp3"

import AcceptCall from '../../../Images/AcceptCall.png'
import Deline from '../../../Images/Deline.png'

import {appSettingContext} from '../../App';
import {inCallContext} from '../../App';
import {outCallContext} from '../../App';

import useSound from "use-sound";

function returnBackground(arg){
    switch (arg) {
        case "1":
            return wallpaper1
            
        case "2":
            return wallpaper2
            
        case "3":
            return wallpaper3
            
        case "4":
            return wallpaper4
            
        case "5":
            return wallpaper5
            
        case "6":
            return wallpaper6
            
        case "7":
            return wallpaper7
            
        case "8":
            return wallpaper8
            
        case "9":
            return wallpaper9
            
        case "10":
            return wallpaper10
            
        case "11":
            return wallpaper11
            
        case "12":
            return wallpaper12
            
        case "13":
            return wallpaper13
            
        case "14":
            return wallpaper14
            
        default:
            return wallpaper14
            
    }
}

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 991;
    top: 0;
    left: 0;
    background-image:url(${(props)=>returnBackground(props.backgroundImage)});
    background-size: cover;
    color: #ffffff;
    filter: blur(3px) grayscale(50%);
`; 

const IncomingCall = () => {
    const {phoneSettingData} = useContext(appSettingContext);
    const {setIsIncomingCallOpen} = useContext(inCallContext)
    const {isOutGoingCallOpen,setIsOutGoingCallOpen } = useContext(outCallContext)
    console.log(isOutGoingCallOpen)
    function chooseRingTone(id) {
        switch (id) {
          case "1":
            return RingTone1;
          case "2":
            return RingTone2;
          case "3":
            return RingTone3;     
          default:
            break;
        }
    }

    const [play , { stop }] = useSound(chooseRingTone(phoneSettingData.ringtone),{volume:0.5})
    
    useEffect(()=>{
        play();
    } , [play])
    const acceptCallHandler = () =>{
        stop();
        setIsIncomingCallOpen(false)
        setIsOutGoingCallOpen(true);
    }
    const declineCallHandler = () =>{
        stop();
        setIsIncomingCallOpen(false)
    }
    return (
        <div>
            <ContainerDiv backgroundImage={phoneSettingData.phoneWallpaper}></ContainerDiv>
            <div id='contents-con'>
                <h1 id='contactName'>name</h1>   
                <p id='callType'>mobile</p>
                <div id='actionBtns'>
                    <div onClick={declineCallHandler}>
                        <img src={Deline} alt="icon" />
                        <p>Decline</p>
                    </div>
                    <div onClick={acceptCallHandler}>
                        <img src={AcceptCall} alt="icon" />
                        <p>Accept</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomingCall;
