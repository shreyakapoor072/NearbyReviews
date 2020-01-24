import React, { Component } from 'react';
import './notification.css';

export default class Notification extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        
    }

    render(){
        return <>
        <div className="header">
            <ul>
                <li>&lt;Back</li>
                <li>Notification</li>
                <li></li>

            </ul>
        </div>
        <div className="notify">
            <ul className="notify__list">
                <li className="notify__listitem">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                    <div>
                        <h3>Sam</h3>
                        <p>Is this product worthb buying?</p>
                    </div>
                </li>
                <li className="notify__listitem">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                    <div>
                        <h3>Sam</h3>
                        <p>Is this product worthb buying?</p>
                    </div>
                </li>
                <li className="notify__listitem">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                    <div>
                        <h3>Sam</h3>
                        <p>Is this product worthb buying?</p>
                    </div>
                </li>
                <li className="notify__listitem">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                    <div>
                        <h3>Sam</h3>
                        <p>Is this product worthb buying?</p>
                    </div>
                </li>
                <li className="notify__listitem">
                    <img src="https://i.pravatar.cc/100" alt="avatar" />
                    <div>
                        <h3>Sam</h3>
                        <p>Is this product worthb buying?</p>
                    </div>
                </li>
            </ul>
        </div>
        </>
    }
}