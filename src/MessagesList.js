import React, { Component } from 'react';
import $ from 'jquery';
import Message from './Message'
import Spinner from './Spinner'
import ScrollToTop from './ScrollToTop'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


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
                newMessages : this.state.newMessages.concat(response.messages.map((m)=>{
                    m.show = true
                    return m
                })),
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
    messageRemoved(id) {
        var newMessages = this.state.newMessages.slice()
        let elIndex = this.state.newMessages.findIndex((el)=> el.id===id);
        newMessages[elIndex].show=false;
        this.setState({
            shownMessageCount: this.state.shownMessageCount-1,
            newMessages: newMessages
        });
        if (this.state.shownMessageCount<4) {
            this.setState({
                isLoading: true,
            });
            this.getMessages();
        }
    }

    render() {
        const filteredMessages = this.state.newMessages.filter((m)=>m.show);
        const newMessages = filteredMessages.map((message) => {
                return (
                    <div key={message.id}>
                        <Message message={message} onMessageSwiped={this.messageRemoved}/>
                    </div>
                )
        });

        return (
        <div>
            <CSSTransitionGroup
                transitionName="messagetrans"
                transitionEnter={false}
                transitionLeaveTimeout={200}>
                {newMessages}
            </CSSTransitionGroup>
            <ScrollToTop offset={100} duration={250}/>
            {this.state.isLoading && <Spinner/>}
        </div>
        )
    }
}

export default MessagesList;
