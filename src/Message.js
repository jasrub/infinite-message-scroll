import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Swipeable from 'react-swipeable';

const baseUrl = 'http://message-list.appspot.com/';

const deltaToRemove = 120;

let styles = {
    messageContainer(deltaX) {
        let opacity = 1- (deltaX)/(screen.width);
        return {
            transform:'translateX('+deltaX+'px)',
            opacity:opacity
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
            this.setState({isShown:false})
        }

    };


    render() {
        if (!this.state.isShown){
            return <div></div>
        }
            return (
                <Swipeable
                    onSwipingRight={this.swipingRight}
                    onSwipedRight={this.swipedRight}>
                <div className="message"
                     style={styles.messageContainer(this.state.swipeX)}>
                    <Card>
                        <CardHeader
                            title={this.props.message.author.name}
                            subtitle={this.props.message.updated}
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