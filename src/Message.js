import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Swipeable from 'react-swipeable';

const baseUrl = 'http://message-list.appspot.com/';

const deltaToRemove = 120;

let styles = {
    messageContainer(deltaX, isShown) {
        let opacity = 1- (deltaX)/(screen.width);
        return {
            transform:'translateX('+deltaX+'px)',
            WebkitTransform:'translateX('+deltaX+'px)',
            opacity:opacity,
            //display:isShown? 'block': 'none',
            WebkitTransition:'-webkit-transform 2s display 2s', /* Safari */
            transition: 'transform 2s display 2s',
        }
    }
}

class Message extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isShown: true,
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
        })

    };
    swipedRight(e, deltaX) {
        this.setState({
            isSwiping:false,
            swipeX:0,
        })
        if (Math.abs(deltaX)>deltaToRemove) {
            this.setState({
                isShown:false,
                swipeX:screen.width,
            })
            this.props.onMessageSwiped();
        }

    };


    render() {
        if (!this.state.isShown){
            return <div></div>
        }
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
                     style={styles.messageContainer(this.state.swipeX)}>
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