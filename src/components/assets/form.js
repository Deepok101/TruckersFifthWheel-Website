import React from 'react';
import './assets.css';
import Posts from './posts'


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
        alert('You tried posting ' + this.props.value);
        e.preventDefault();
        return(<Posts accountName="TestName" text={this.state.value}/>)
    }

    render(){
        let text = this.props.value;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Post</button>
                </form>
                <h3>You wrote {text}</h3>
            </div>
        );
    }
}

export default FormPost;