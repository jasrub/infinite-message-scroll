import React, { Component } from 'react';
import $ from 'jquery';
import Message from './Message'
import Spinner from './Spinner'
import ScrollToTop from './ScrollToTop'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Snackbar from 'material-ui/Snackbar';


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
            showToast:false,
            lastDeletedMessage:-1,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.messageRemoved = this.messageRemoved.bind(this);
        this.messageStarred = this.messageStarred.bind(this);
        this.undoMessageDelete = this.undoMessageDelete.bind(this);
        this.handleToastClose = this.handleToastClose.bind(this);
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
                    m.show = true;
                    m.starred = false;
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
            showToast:true,
            shownMessageCount: this.state.shownMessageCount-1,
            newMessages: newMessages,
            lastDeletedMessage: elIndex,
        });
        if (this.state.shownMessageCount<4) {
            this.setState({
                isLoading: true,
            });
            this.getMessages();
        }
    }

    undoMessageDelete() {
        var newMessages = this.state.newMessages.slice()

        newMessages[this.state.lastDeletedMessage].show = true;
        this.setState({
            showToast: false,
            newMessages: newMessages,
        });
    };

    handleToastClose() {
        this.setState({
            showToast: false,
        });
    };


    messageStarred(id) {
        var newMessages = this.state.newMessages.slice()
        let elIndex = this.state.newMessages.findIndex((el)=> el.id===id);
        newMessages[elIndex].starred=!newMessages[elIndex].starred;
        this.setState({
            newMessages: newMessages
        });
    };

    render() {
        const filteredMessages = this.state.newMessages.filter((m)=>m.show);
        const newMessages = filteredMessages.map((message) => {
            if (this.props.isShowingStar) {
                if (!message.starred) {
                    return null
                }
            }
                return (
                    <div key={message.id}>
                        <Message message={message}
                                 onMessageSwiped={this.messageRemoved}
                                 onMessageStar={this.messageStarred}/>
                    </div>
                )
        });

        return (
        <div>
            <CSSTransitionGroup
                transitionName="messagetrans"
                transitionEnterTimeout={100}
                transitionLeaveTimeout={200}>
                {newMessages}
            </CSSTransitionGroup>
            <Snackbar
                open={this.state.showToast}
                message="Message deleted"
                autoHideDuration={2000}
                action="undo"
                onActionTouchTap={this.undoMessageDelete}
                onRequestClose={this.handleToastClose}

            />
            <ScrollToTop offset={100} duration={250}/>
            {this.state.isLoading && <Spinner/>}
        </div>
        )
    }
}

export default MessagesList;
