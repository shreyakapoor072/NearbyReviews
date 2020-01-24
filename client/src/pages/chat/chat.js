import React, { Component } from 'react';
import queryString from 'query-string';
import './chat.css';
import { Redirect } from 'react-router-dom';
import { updateSnapcash, findByIdAndUpdateLikes} from '../../api';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            msgs: [
                
            ],
            showDialog: this.props.location.search.includes("dialog")? true: false,
            showRating: false
        }
        this.textarea = "";
        this.sendMesage = this.sendMesage.bind(this);
        this.deductSnapCash = this.deductSnapCash.bind(this);
        this.setUserDetails();
        const {pogId , userId, buyerId} = this.getParams(this.props)
        this.pogId = pogId;
        this.currUserId = userId;
        this.buyerId = buyerId;
        this.userName = this.currUserId ?  JSON.parse(window.localStorage.getItem('buyerInfo')).name:JSON.parse(window.localStorage.getItem('userInfo')).name;
        this.buyer = this.currUserId ? JSON.parse(window.localStorage.getItem('buyerInfo')) : null;
    }

    getParams(props){
        let params={};
        if(props){
            let url = this.props.location.search;
            params = queryString.parse(url);
        }
        return params;
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
    setUserDetails() {
        if(window.localStorage) {
            try{
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'));
                console.log(buyerInfo);
                this.currentUserData = {
                    snapcash : userInfo.snapcash,
                    userId: userInfo.userId
                }
            } catch(e){
                console.warn(e);
            }
        }
    }
    deductSnapCash() {
        const { snapcash, userId} = this.currentUserData;
        console.log(snapcash);
        if(snapcash < 2) {
            this.setState({
                redirectTo:"/earnHelp"
            })
        } else {
            updateSnapcash({userId});
        }
        this.setState({
            showDialog: false,
            redirectTo:""
        })
    }
    componentWillUnmount(){
        window.localStorage.clear();
    }
    render() {
        let html;
        let {redirectTo}=this.state;
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        if(this.state.showDialog){
            html = <div className="modal">
            <h3>Do you want to proceed?</h3>
            <p>Please note: Your 2 snapcoins will be deducted from your wallet and will be transferred to your chat buddy if you wish to proceed</p>
            <h4> Current Snapcash Balance: Rs {this.currentUserData && this.currentUserData.snapcash}</h4>
            <button onClick={this.deductSnapCash}>Pay and Proceed</button>
            <button onClick={() => {
                this.props.history.goBack()
            }}>Close</button>
        </div> ;
        }else if(this.state.showRating && this.buyer){
            html = <div className="rating">
                <div className="nav">
                    <h1>How Helpful was this user?</h1>
                </div>
                <div className="rating-body">
                    <h3>Click below on any button to rate your experience with the user</h3>
                    <div className="ratingbtns">
                        <button onClick={(e) => {
                            findByIdAndUpdateLikes(this.buyerId, this.buyer.likes + 1).then(result => {
                                console.log(result);
                                window.location.href = `https://m.snapdeal.com/product/x/${this.pogId}`;
                            });
                        }}>Yey</button>
                    </div>
                </div>
            </div>
        }else{
            html = <div className="chat">
            <h3>You are now chatting with {this.userName}</h3>
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
        }
        return html;
    }
}