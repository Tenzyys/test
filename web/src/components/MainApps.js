import React ,{useContext } from 'react';
import './MainApps.css';

import phoneCall from '../Images/call.png';
import contacts from '../Images/contacts.png';
import messager from '../Images/messager.png';
import settings from '../Images/settings.png';


import {appContext} from './App';
const MainApps = () => {
    const {isAppOpen,setisAppOpen} = useContext(appContext);
    
    const openAppHandler = (e)=>{
        switch (e.target.alt) {
            case "keypad":
                setisAppOpen({...isAppOpen,keypad:true});
                break;
            case "messager":
                setisAppOpen({...isAppOpen,messager:true});
                break;
            case "contacts":
                setisAppOpen({...isAppOpen,contacts:true});
                break;
            case "settings":
                setisAppOpen({...isAppOpen,settings:true});
                break;
            default:
                break;
        }
        
    }
    return (
        <div className='background mainApps-container'>
            <img draggable="false" onClick={openAppHandler} className="appIcon" src={phoneCall} alt="keypad" />
            <img draggable="false" onClick={openAppHandler} className="appIcon" src={messager} alt="messager" />
            <img draggable="false" onClick={openAppHandler} className="appIcon" src={contacts} alt="contacts" />
            <img draggable="false" onClick={openAppHandler} className="appIcon" src={settings} alt="settings" />
        </div>
    );
}

export default MainApps;