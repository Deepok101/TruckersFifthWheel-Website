import React from 'react';
import './assets/chat.css'
import NavBar from './navbar';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Posts from "./assets/posts";

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            endpoint: 'https://still-taiga-69176.herokuapp.com/',
            message: "",
            allmsg: [],
            htmlmsg: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendSockets = this.sendSockets.bind(this);

    }

    handleInputChange(e){
        this.setState({message: e.target.value})
    }

    sendSockets(){
        const socket = socketIOClient(this.state.endpoint)
        const username = window.sessionStorage.getItem('auth_firstName')
        socket.emit('send message', this.state.message, username)
        
        

    }
    componentDidMount(){
        const socket = socketIOClient(this.state.endpoint)

        socket.on('message', (msg)=>{
            var node = document.createElement('div');
            var node_inner = document.createElement('p');
            var content = document.createTextNode(msg)
            node.appendChild(node_inner).appendChild(content);
          
            console.log(node)
            document.getElementById('messages').appendChild(node);
            
        })
        fetch('/api/chat', {
            method: 'GET'
          })
            .then(res => res.json())
            .then(data => this.setState({allmsg: data}, () => console.log('Text fetched ', data)));

    }
    render(){
        let messages = this.state.allmsg.map((msg)=>
           <div><p>{msg.text} by {msg.author}</p></div>
        )
        return(
            <div>
                <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
                <div class='container'>
                    <div>
                        <div id='messages'>
                            {messages}
                        </div>
                    </div>
                    <form>
                        <input id="input_chat" onChange={this.handleInputChange} name="message" type='text' value={this.state.message} autoFocus='on' placeholder='Message...'/>
                    </form>
                    <button id='send_btn' onClick={this.sendSockets}>Send</button>

                </div>

            </div>
            
        )
    }
}

export default Chat;