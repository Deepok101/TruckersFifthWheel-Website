import React from 'react';
import { connect } from 'react-redux';

class JobFilter extends React.Component{
    constructor(props) {
        super(props);

        this.onSalaryFilter = this.onSalaryFilter.bind(this);
        this.onLocationFilter = this.onLocationFilter.bind(this);

    }

    onSalaryFilter(e){
      
      this.props.salaryFilter(e.currentTarget.id)
   
    }

    onLocationFilter(e){
      this.props.locationFilter(e.currentTarget.innerHTML)
    }
  

    render(){
        return(
          <div class='jobFilter'>
            <div class='p-2 pl-3'>
            <p>Filter By...</p>
              <div>
                <ul class='salary pl-2'>
                  <li style={{fontWeight: 'bold'}}>
                    Salary
                  </li>
                  <li>
                    <a onClick={this.onSalaryFilter} id='50000' href='#'>$50,000+</a>
                  </li>
                  <li>
                    <a onClick={this.onSalaryFilter} id='100000' href='#'>$100,000+</a>
                  </li>
                  <li>
                    <a onClick={this.onSalaryFilter} id='150000' href='#'>$150,000+</a>
                  </li>
                  <li>
                    <a onClick={this.onSalaryFilter} id='200000' href='#'>$200,000+</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class='salary pl-2'>
                  <li style={{fontWeight: 'bold'}}>
                    Location
                  </li>
                  <li>
                    <a onClick={this.onLocationFilter} href='#' id='Montreal'>Montreal</a>
                  </li>
                  <li>
                    <a onClick={this.onLocationFilter} id='Toronto' href='#'>Toronto</a>
                  </li>
                  <li>
                    <a href='#'>Quebec</a>
                  </li>
                  <li>
                    <a href='#'>Trois Rivieres</a>
                  </li>
                </ul>
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

export default JobFilter;