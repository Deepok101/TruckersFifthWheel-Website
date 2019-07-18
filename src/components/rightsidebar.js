import React from 'react';
import "./assets/feed.css";
import SideBarOptions from './assets/sb_options'

class RightSideBar extends React.Component{
    render(){
        return(
        <div class="sidebar-nav">
            <ul>
                <li>
                    <SideBarOptions name='Test'/>
                </li>
                <li>
                    <SideBarOptions name='Test'/>
                </li>
                <li>
                    <SideBarOptions name='Test'/>
                </li>
                <li>
                    <SideBarOptions name='Test'/>
                </li>
            </ul>          
        </div>

        );
    }
}

export default RightSideBar;
