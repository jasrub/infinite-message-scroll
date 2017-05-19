import React, { Component } from 'react';
import $ from 'jquery';
import Message from './Message'

const limit=20;
const baseUrl = 'http://message-list.appspot.com/';

class MessagesList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            pageToken:'',
            newMessages: [],
        };
        // This binding is necessary to make `this` work in the callback
        this.handleScroll = this.handleScroll.bind(this);
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
                pageToken: response.pageToken,
                isLoading: false,
            });

        }.bind(this));
        
    };

    handleScroll(event) {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 400 && !this.state.isLoading){
            this.setState({
                isLoading: true,
            });
            this.getMessages()
        }

    };

    render() {
        var newMessages = this.state.newMessages.map((message) => {

            return (
                <div key={message.id}>
                    <Message message={message}/>
                </div>
            )
        }, this);

        return (
        <div>
            {newMessages}
            {this.state.isLoading && <div>Loading...</div>}
        </div>
        )
    }
}

export default MessagesList;
