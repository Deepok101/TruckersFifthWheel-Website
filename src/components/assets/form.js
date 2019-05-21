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

            <div class='border border-secondary mt-5 posts'>
                <header>
                    <div class="p-2">
                        <p id="woym">What's on your mind?</p>
                    </div>
                </header>
                <div class="pt-3 p-2">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div class=''>
                                <div class='row'>
                                    <div class='col-xl-10'>
                                        <input className="form-control" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                                    </div>
                                    <div class='col-xl-2'>
                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Post</button>
                                        <button className="btn btn-primary ml-3" onClick={this.handleSubmit}>Share</button>
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

export default FormPost;