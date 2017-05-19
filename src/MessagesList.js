import React, { Component } from 'react';
import $ from 'jquery';
import Message from './Message'
import Spinner from './Spinner'

const limit=20;
const baseUrl = 'http://message-list.appspot.com/';

class MessagesList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            pageToken:'',
            newMessages: [],
            shownMessageCount:0,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.messageRemoved = this.messageRemoved.bind(this);
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getMessages();
    };

    componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
};
    
    getMessages() {
        let reqUrl = baseUrl+'messages?pageToken='+this.state.pageToken+'&limit='+limit;
        $.get(reqUrl, function (response) {

            this.setState({
                newMessages : this.state.newMessages.concat(response.messages),
                shownMessageCount: this.state.shownMessageCount+response.count,
                pageToken: response.pageToken,
                isLoading: false,
            });

        }.bind(this));
        
    };

    handleScroll() {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 400 && !this.state.isLoading){
            this.setState({
                isLoading: true,
            });
            this.getMessages()
        }

    };
    messageRemoved() {
        this.setState({
            shownMessageCount: this.state.shownMessageCount-1,
        });
        if (this.state.shownMessageCount<4) {
            this.setState({
                isLoading: true,
            });
            this.getMessages();
        }
    }

    render() {
        var newMessages = this.state.newMessages.map((message) => {

            return (
                <div key={message.id}>
                    <Message message={message} onMessageSwiped={this.messageRemoved}/>
                </div>
            )
        }, this);

        return (
        <div>
            {newMessages}
            {this.state.isLoading && <Spinner/>}
        </div>
        )
    }
}

export default MessagesList;
