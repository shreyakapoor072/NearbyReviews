/* eslint no-undef: 0 */

import React, { Component } from 'react';
const Socket = io('http://localhost:5000');

export default class Chat extends Component{
    constructor(props){
        super(props);
        this.state = {
            connected: false
        }
        console.log(props);
    }

    componentDidMount() {
        Socket.on('chat', data => console.log(data));
    }
    render(){
        return (<div>asdsaasd</div>);
    }
}