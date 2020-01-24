import React, {Component} from 'react';
import "./earnHelp.scss"

class EarnHelp extends Component {
	constructor(props) {
		super(props);
		this.state={
			visibleIndices:[]
		}
        this.toggleFaq=this.toggleFaq.bind(this);
        this.onBackClick=this.onBackClick.bind(this);
        this.data = {
                    "qnas": [
                        {
                            "ques": "How can I earn Snapcash?",
                            "ans": "Snapcash can be earn through various ways in our application i.e, by referring/reviewing the products to you friends, participating in various challenges and playing different games present in the application."
                        },
                        {
                            "ques": "Will I earn snapcash on every product review?",
                            "ans": "Snapcash will be rewarded to the user when his reviews are liked by other people and those people in turn buy that product too."
                        },
                        {
                            "ques": "How can I give review for a product?",
                            "ans": "If a buyer requests you for you review you'll see that request in your account. From there you can accept the request and give you feedback for the product."
                        },
                        {
                            "ques": "What is the reward scheme?",
                            "ans": "For the first two orders in a calendar week, you get Rs.50 as commission on each order but if orders in a calendar week go beyond 2 (i.e. 3 or more) then you get Rs. 100 as commission on all orders starting with the first order."
                        },
                        {
                            "ques": "How can I reach you if I need help or guidance?",
                            "ans": "You can reach us via Whatsapp on +91-8929386266 or you can write to us at shareandearn@snapdeal.com"
                        }    
                    ]
                }
    }


    onBackClick(){
        window.history.back();
    }

	parseDataAndRender() {
		const contentArr = [];
		let {visibleIndices}=this.state;
		if (this.data && this.data.qnas) {
			this.data.qnas.forEach((element, index) => {
				if (element.ques && element.ans) {
					contentArr.push(
						<div key ={element.ques} className={`tab ${visibleIndices[index]?'clicked':''}`}>
							<label
								className="tab-label"
								faq-index={index}
								onClick={this.toggleFaq}
							>
								{element.ques}
							</label>
							<div
								className="tab-content"
							>{element.ans}</div>
						</div>
					);
                }
			});
		}
		return contentArr;
	}

	toggleFaq(e){
		let index=parseInt(e.currentTarget.getAttribute('faq-index'));
		let {visibleIndices}=this.state;
		visibleIndices[index]=!visibleIndices[index];
		this.setState({
			visibleIndices
		})
	}

	render() {
		return (
            <div className="helpTab">
                <div className="header">
                    <span onClick={this.onBackClick}>&lt;Back</span>
                    <span>Snapcash Help</span>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col">
                            <div className="tabs">{this.parseDataAndRender()}</div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default EarnHelp;
