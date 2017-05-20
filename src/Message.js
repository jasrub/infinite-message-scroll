import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Swipeable from 'react-swipeable';

const baseUrl = 'http://message-list.appspot.com/';

const deltaToRemove = screen.width/3;

let styles = {
    messageContainer(isSwiping, deltaX) {
        let opacity = 1- (deltaX)/(screen.width/2);
        return {
            transform:isSwiping? 'translateX('+deltaX+'px)':'',
            WebkitTransform:isSwiping?'translateX('+deltaX+'px)':'',
            opacity:opacity,
        }
    }
};

class Message extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isSwiping:false,
            swipeX:0,
        };
        this.swipingRight = this.swipingRight.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
    };

    swipingRight(e, deltaX) {
        this.setState({
            isSwiping:true,
            swipeX:deltaX,
        });

    };
    swipedRight(e, deltaX) {
        this.setState({
            isSwiping:false,
            swiped:true,

        });
        if (Math.abs(deltaX)>deltaToRemove) {
            this.props.onMessageSwiped(this.props.message.id);
        }
        else {
            this.setState({
                swipeX:0

            });
        }

    };


    render() {
        const date = timeSince(new Date(this.props.message.updated)) + ' ago'
            return (
                <Swipeable
                    onSwipingRight={this.swipingRight}
                    onSwipedRight={this.swipedRight}
                    style={{touchAction: 'pan-y'}}
                    preventDefaultTouchmoveEvent={true}
                    trackMouse={true}
                >
                <div className="message"
                     style={styles.messageContainer(this.state.isSwiping, this.state.swipeX)}>
                    <Card>
                        <CardHeader
                            title={this.props.message.author.name}
                            subtitle={date}
                            avatar={baseUrl+this.props.message.author.photoUrl}
                        />
                        <CardText>
                            {this.props.message.content}
                        </CardText>
                    </Card>
                </div>
                </Swipeable>
            )
    }
}

export default Message;

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}