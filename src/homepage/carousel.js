import React from 'react';
import Carousel from 'react-bootstrap/Carousel'


function Carousel_elem(){

    return(
        <Carousel>
            <Carousel.Item>
                <div className="carousel_div">
                <p className='child'>
                    <h1 style={{fontSize: "4em"}}>
                    Welcome to DeepEmploi
                    </h1>
                    <h3 style={{marginTop: "1em"}}>
                    Website made for truckers by truckers
                    </h3>
                </p>
                </div>
                <Carousel.Caption style={{color: "#000000"}}>
                
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel_div">

                </div>

                <Carousel.Caption style={{color: "#000000"}}>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel_div">

                </div>
                <Carousel.Caption style={{color: "#000000"}}>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Carousel_elem;