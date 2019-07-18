import React from 'react';
import './feed.css';

function SideBarOptions(props){
    return(
        <div class='SideBar_Options'>
            <span>
                Logo
            </span>
            <span>
                {props.name}
            </span>
        </div>
    )
}

export default SideBarOptions;