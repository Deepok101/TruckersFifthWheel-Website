import React from 'react';
import { connect } from 'react-redux';

class JobFilter extends React.Component{
    constructor(props) {
        super(props);

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
                    <a href='#'>$50,000+</a>
                  </li>
                  <li>
                    <a href='#'>$100,000+</a>
                  </li>
                  <li>
                    <a href='#'>$150,000+</a>
                  </li>
                  <li>
                    <a href='#'>$200,000+</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class='salary pl-2'>
                  <li style={{fontWeight: 'bold'}}>
                    Location
                  </li>
                  <li>
                    <a href='#'>Montreal</a>
                  </li>
                  <li>
                    <a href='#'>Toronto</a>
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