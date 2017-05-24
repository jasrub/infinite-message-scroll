import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Swipeable from 'react-swipeable';

const baseUrl = 'http://message-list.appspot.com/';

const deltaToRemove = screen.width/3;

let styles = {
    messageContainer(isSwipingRight, isSwipingLeft, deltaX) {
        let opacity = Math.max(0.5, (1- Math.abs((deltaX)/(screen.width/2))));
        let translate = isSwipingRight || isSwipingLeft?'translateX('+deltaX+'px)':''
        return {
            transform:translate,
            WebkitTransform:translate,
            opacity: isSwipingRight? opacity: 1,
        }
    }
};

class Message extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isSwipingRight:false,
            isSwipingLeft:false,
            swipeX:0,
        };
        this.swipingRight = this.swipingRight.bind(this);
        this.swipingLeft = this.swipingLeft.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
        this.swipedLeft = this.swipedLeft.bind(this);
    };

    swipingRight(e, deltaX) {
        this.setState({
            isSwipingRight:true,
            swipeX:deltaX,
        });

    };
    swipingLeft(e, deltaX) {
        this.setState({
            isSwipingLeft:true,
            swipeX:-deltaX,
        });

    };
    swipedRight(e, deltaX) {
        this.setState({
            isSwipingRight:false,

        });
        if (Math.abs(deltaX)>deltaToRemove) {
            this.props.onMessageSwiped(this.props.message.id);
        }
        else {
            this.setState({
                swipeX:0,
            });
        }

    };
    swipedLeft(e, deltaX) {
        this.setState({
                swipeX:0,
                isSwipingLeft:false,

            });
        this.props.onMessageStar(this.props.message.id);
    };

    render() {
        const date = timeSince(new Date(this.props.message.updated)) + ' ago';
        const starClassName = this.props.message.starred? "star" : "star no-show";
        const star =  <div className={starClassName}><i className="material-icons">star</i></div>;
        const backgroundStar = <div className="star"><i className="material-icons">{this.props.message.starred?'star_border':'star'}</i></div>;
        const backStar = this.state.isSwipingLeft && backgroundStar;
            return (
                <div className="message noselect">
                    {backStar}
                <Swipeable
                    onSwipingRight={this.swipingRight}
                    onSwipingLeft={this.swipingLeft}
                    onSwipedRight={this.swipedRight}
                    onSwipedLeft={this.swipedLeft}
                    style={{touchAction: 'pan-y'}}
                    preventDefaultTouchmoveEvent={true}
                    trackMouse={true}
                >
                <div
                     style={styles.messageContainer(this.state.isSwipingRight,this.state.isSwipingLeft, this.state.swipeX)}>
                    <Card>
                        <CardHeader
                            title={this.props.message.author.name}
                            subtitle={date}
                            avatar={baseUrl+this.props.message.author.photoUrl}
                            children={star}
                        />
                        <CardText>
                            {this.props.message.content}
                        </CardText>
                    </Card>
                </div>
                </Swipeable>
                </div>
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