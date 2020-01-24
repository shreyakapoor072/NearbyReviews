import React, { Component } from 'react';
import './notification.css';

export default class Notification extends Component{

    render(){
        return <>
        <div className="header">
            <ul>
                <li><a href={`https://m.snapdeal.com/`}>&lt;&nbsp;Back</a></li>
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