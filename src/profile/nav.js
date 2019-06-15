import React from 'react';
import './style.css'

class Nav extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
    this.handleClick = this.handleClick.bind(this)
   
  }

  componentWillMount(){
    this.setState({loaded: true})
  }

  handleClick(){
    this.props.clicked()
  }
  
  render(){
      return(
        <div className='card'>
          <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor:"#90F8FF"}}>
            <div className='container'>
              <a class="navbar-brand" href="">Profile</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="#">About <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={this.handleClick}>Posts</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Truck Loads</a>
                </li>
              </ul>
              </div>
            </div>

          
          </nav>          
        </div>
      )
    
  }
   
}

export default (Nav);