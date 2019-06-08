import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function AboutUs(){
    const background_color = {backgroundColor: "#f7f7f7"};
    const margin_top = {marginTop: "-2em"};
    const font_size = {fontSize: "1.5em"}
    const color = {color: 'white'}
    return(
        <div class='container-fuild' style={{...background_color}}>
            <div class='container' style={{background_color}}>
            <Jumbotron style={{...background_color,...margin_top, ...{color}}}>
                <div>
                    <h1 className='h1-bigger' style={{textAlign: "center"}}> 
                        Who are we?
                    </h1>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        
                    <p className='p-logo' style={{textAlign: "center"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu congue nisl. Ut viverra malesuada nisl, vitae condimentum odio varius sed. Vivamus gravida, eros in luctus suscipit, augue ligula luctus erat, pulvinar consectetur eros nunc non enim. Maecenas urna lacus, imperdiet sed viverra vel, porta viverra est. Curabitur eleifend tellus libero, a feugiat elit varius nec. Aliquam facilisis convallis justo, sit amet tincidunt dui auctor sed.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <img className='img-icons' src={require('./icons/truck.png')}/>
                        <p className='p-logo' style={{textAlign: "center"}}>
                            With almost 20 years of trucking experience, DeepEmploi is now offering a service
                            to facilitate the every day chores of truckers around the world.
                        </p>
                    </div>
                    
                    <div className='col-sm'>
                        <img className='img-icons' src={require('./icons/forklift.png')}/>
                        <p className='p-logo' style={{textAlign: "center"}}>
                            Now DeepEmploi is expanding towards other transportation-related fields with the goal of providing 
                            the correct job for the correct person.
                        </p>
                    </div>
                </div>
            </Jumbotron>
            </div>
        </div>
        
        
    )
}

export default AboutUs