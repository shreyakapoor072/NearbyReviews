import React, { Component } from 'react';
import './chat.css';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            msgs: [
                
            ]
        }
        this.textarea = "";
        this.sendMesage = this.sendMesage.bind(this);
    }

    componentDidMount() {
        window.Socket.on('chatmsg', data => {
            this.setState({ 
                msgs: [
                    ...this.state.msgs,
                    {
                        type: "your",
                        msg: data,
                        date: new Date().getHours() + ":"+new Date().getMinutes()
                    }
                ]
            });
        });
    }
    sendMesage(e){
        this.setState({
            msgs: [...this.state.msgs, {
                type: "my",
                msg: this.textarea.value,
                date: new Date().getHours() + ":"+new Date().getMinutes()
            }]
        })
        window.Socket.emit('chatsend', this.textarea.value);
        this.textarea.value = "";
    }
    render() {
        return (
            <div className="chat">
                <h3>You are now chatting with SamVsCode</h3>
                <ul className="chat__list">
                {this.state.msgs.map((msg, i) =>
                    msg.type === "my" ? <li key={i} className="chat__list__item chat__list__item--mymsg">
                    <div className="chat__box chat__box--mymsg">
                        <p className="chat__bubble chat__bubble--mymsg">{msg.msg}</p>
                        <div className="avatar">
                            <img src="https://i.pravatar.cc/100" alt="avatar" />
                            <span>{msg.date}</span>
                        </div>
                    </div>
                </li>: <li key={i} className="chat__list__item chat__list__item--yourmsg">
                        <div className="chat__box chat__box--yourmsg">
                            <p className="chat__bubble chat__bubble--yourmsg">{msg.msg}</p>
                            <div className="avatar">
                                <img src="https://i.pravatar.cc/100" alt="avatar" />
                                <span>{msg.date}</span>
                            </div>
                        </div>
                    </li>
                )}
                </ul>
                <div>
                    <div className="chat__input">
                        <div className="chat-message clearfix">
                            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="2" ref={textval => this.textarea = textval}></textarea>
                            <button onClick={this.sendMesage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}