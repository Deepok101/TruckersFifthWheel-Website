import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { CSSTransition } from 'react-transition-group';
import CarouselCaption from 'react-bootstrap/CarouselCaption';

class Carousel_elem extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      index_is_2: false,
      loaded: false
    };
  }
  
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }
  componentWillMount(){

  }

  render(){

    return(
      <div id='imageContainer'>
        <div class='crop'>
          <img class='truckPicture' src={require('./pictures/truckSand.jpg')}/>
        </div>
        <h1 id='imageText' class='animation2'>
            Made by Truckers
        </h1>
        
      {/* <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
      >
          <Carousel.Item>
           
                

                
                <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                  Website made for truckers by truckers
                </h3>
            
            <Carousel.Caption style={{color: "#fff"}}>
              <h1 class='h1-carousel' id="animation1" style={{fontSize: "4em"}}>
                Welcome to DeepEmploi
              </h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel_div">
                <div className='child'>
                    <h1 id="animation2" style={{...{fontSize: "4em"},...{animationDelay: "0.5s"}}}>
                      Need trucking advice?
                    </h1>
                  <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                    You came to the right place
                  </h3>
                </div>
            </div>
            <Carousel.Caption style={{color: "#000000"}}>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel_div">
                <div className='child'>
                    <h1 id="animation3" style={{...{fontSize: "4em"},...{animationDelay: "0.5s"}}}>
                      Building a community of Truckers since 1999
                    </h1>
                  <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                    Sign up now to socialize with millions of truck drivers around the World
                  </h3>
                </div>
            </div>
            <Carousel.Caption style={{color: "#000000"}}>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel> */}
      
      </div>
    )
  }
    
}

export default Carousel_elem;