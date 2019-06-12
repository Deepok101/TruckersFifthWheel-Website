import React from 'react';
import { connect } from 'react-redux';

class SearchJob extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
      this.setState({value: e.target.value})
    }
    handleSubmit(e){
        this.props.handleSubmit(this.state.value)
    }

    render(){
        let text = this.props.value;
        return(
            
              <div>
                <div className='jobsearch'>
                <header>
                  <div className="p-2">
                      <p id="titleJobSearch">Search Job</p>
                  </div>
                </header>
                  <div className="pt-3 p-2">
                    <div>
                     
                      <div>
                        <div id='jobInput'>
                          <input placeholder="Job Title" name="postText" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                          <input placeholder="Location" name="location" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                          <button onClick={this.handleSubmit} id='jobsearchbtn'>
                            Search
                          </button>
                        </div>
                      </div>
                      <div className='col-xl-2 col-lg-6 col-4 text-right'>  
                      </div>
         
                    </div>
                  </div>
                </div>
              </div>
        
            
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth.items,
  username: state.auth.name
})

export default (SearchJob);