import React from 'react';
import './feed.css';
import Posts from './posts'
import { connect } from 'react-redux';

class FormPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.props.changeText(e.target.value);
      }

    handleSubmit(e){
        const auth_firstName = window.sessionStorage.getItem('auth_firstName')
        const auth_lastName = window.sessionStorage.getItem('auth_lastName')
        e.preventDefault();
        alert('You tried posting ' + this.props.value);
        let text = this.props.value;
        var post = {
            "id": 3,
            "author": `${auth_firstName} ${auth_lastName}`,
            "text": text
        };

        fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json).then(data => console.log(data));
        window.location.reload();
    }

    render(){
        let text = this.props.value;
        return(

            <div className='border border-secondary mt-5 posts'>
              <header>
                <div className="p-2">
                  <p id="woym">What's on your mind?</p>
                </div>
              </header>
              <div className="pt-3 p-2">
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className=''>
                      <div className='row'>
                        <div className='col-xl-10'>
                          <form method='POST' action='/api/posts'>
                            <input id="posting_input" name="postText" className="form-control" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                          </form>
                        </div>
                        <div className='col-xl-2'>
                          <button id='posting_btn' onClick={this.handleSubmit}>Post</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <h3>You wrote {text}</h3>
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

export default connect(mapStateToProps)(FormPost);