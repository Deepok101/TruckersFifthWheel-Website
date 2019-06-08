import React from 'react';
import { connect } from 'react-redux';

class SearchJob extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.changeText(e.target.value);
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
                      <form onSubmit={this.handleSubmit}>
                      <div>
                        <form id='jobInput' method='POST' action='/api/posts'>
                          <input placeholder="Job Title" name="postText" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                          <input placeholder="Location" name="postText" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                          <button id='jobsearchbtn'>
                            Search
                          </button>
                        </form>
                      </div>
                      <div className='col-xl-2 col-lg-6 col-4 text-right'>  
                      </div>
                      </form>
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