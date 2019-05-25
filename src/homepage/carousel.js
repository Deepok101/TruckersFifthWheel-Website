import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { CSSTransition } from 'react-transition-group';

class Carousel_elem extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      index_is_2: false
    };
  }
  componentDidMount(){
 
  }

  
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render(){

    return(
      <div>
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
      >
          <Carousel.Item>
            <div className="carousel_div">
              <p className='child'>
                <h1 id="animation1" style={{fontSize: "4em"}}>
                  Welcome to DeepEmploi
                </h1>
                <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                  Website made for truckers by truckers
                </h3>
              </p>
            </div>
            <Carousel.Caption style={{color: "#000000"}}>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel_div">
                <p className='child'>
                    <h1 id="animation2" style={{...{fontSize: "4em"},...{animationDelay: "0.5s"}}}>
                      Need trucking advice?
                    </h1>
                  <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                    You came to the right place
                  </h3>
                </p>
            </div>
            <Carousel.Caption style={{color: "#000000"}}>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel_div">
                <p className='child'>
                    <h1 id="animation3" style={{...{fontSize: "4em"},...{animationDelay: "0.5s"}}}>
                      Building a community of Truckers since 1999
                    </h1>
                  <h3 style={{...{marginTop: "1em"},...{fontSize: "1.8em"},...{animationDelay: "0.5s"}}}>
                    Sign up now to socialize with millions of truck drivers around the World
                  </h3>
                </p>
            </div>
            <Carousel.Caption style={{color: "#000000"}}>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
      
      </div>
    )
  }
    
}

export default Carousel_elem;