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
            endpoint: 'ws://still-taiga-69176.herokuapp.com',
            message: "",
            allmsg: [],
            htmlmsg: null,
            loaded: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendSockets = this.sendSockets.bind(this);
        this.createNode = this.createNode.bind(this);

    }

    handleInputChange(e){
        this.setState({message: e.target.value})
    }

    sendSockets(){
        const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
       
        const username = window.sessionStorage.getItem('auth_firstName')
        socket.emit('send message', this.state.message, username)
        
        
        console.log(this.state.allmsg)
    }
    
    componentDidMount(){
        fetch('/api/chat', {
            method: 'GET'
          })
            .then(res => res.json())
            .then(data => this.setState({allmsg: data}, () => console.log('Text fetched ', data)))
            .then(data => this.setState({loaded: true}));
    
    }
    componentWillReceiveProps(){
            const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
            socket.on('message', (msg)=>{
                this.createNode(msg)
            
            })
            
            
    }
    componentWillMount(){
    
    }
    createNode(msg){
        let user = window.sessionStorage.getItem('auth_firstName')
        var node = document.createElement('div');
        var node_inner = document.createElement('p');

        if (msg.split(" ").splice(-1)[0] == user){
            node.className = 'd-flex flex-row-reverse';
            node_inner.className = 'mine';
        } else {
            node.className = 'd-flex flex-row'
            node_inner.className = '';
        }
        console.log(msg.user)
        var content = document.createTextNode(msg)
        node.appendChild(node_inner).appendChild(content);
        
        console.log(node)
        document.getElementById('messages').appendChild(node);
       
    }
    
    render(){
        console.log('executed is ' + this.state.executed)
        let user = window.sessionStorage.getItem('auth_firstName')
        let messages = this.state.allmsg.map((msg)=>{
            if (msg.author !== user){
                return <div class='d-flex flex-row'><p>{msg.text} by {msg.author}</p></div>
            } else {
                return <div class='d-flex flex-row-reverse'><p class='mine'>{msg.text} by {msg.author}</p></div>
            }
        }   
        )
        if (this.state.loaded === true){
            return(
                <div style={{backgroundColor: "#eff6ff"}}>
                    <NavBar third='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
                    <div id='animated'>
                        <div class='container'>
                            <div id='chat-container'>
                                <div id='messages'>
                                    {messages}
                                </div>
                            </div>
                            <footer>
                                <input id="input_chat" onChange={this.handleInputChange} name="message" type='text' value={this.state.message} autoFocus='on' placeholder='Message...'/>
                            </footer>
                            <button id='send_btn' onClick={this.sendSockets}>Send</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div style={{backgroundColor: "#eff6ff"}}>
                <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
                </div>
            )
        }
        
    }
}

export default Chat;