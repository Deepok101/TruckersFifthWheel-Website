import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';


const options = [
  { value: 'job', label: 'Job' },
  { value: 'load', label: 'Loads' }
];
const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 150,
  })
};


class SearchJob extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: '', selectedOption: 'Job'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange(e){
      this.setState({value: e.target.value})
    }

    handleSelectChange(selectedOption){
      this.props.handleSelectChange(selectedOption);

    }

    handleSubmit(e){
        this.props.handleSubmit(this.state.value)
    }

    render(){
        console.log(this.props.selectedOption)
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
                     
                      <div className=''>
                        <div id='jobInput' style={{display: 'inline-block'}}>
                          <input placeholder="Job Title" name="postText" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                          <input placeholder="Location" name="location" type='text' className="form-control search" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                        </div>
                        <div style={{...{width: 150},...{display: 'inline-block'}}}>
                          <Select
                              value={this.props.selectedOption}
                              onChange={this.handleSelectChange}
                              options={options}
                          />
                        </div>
                        <button onClick={this.handleSubmit} id='jobsearchbtn'>
                          Search
                        </button>
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