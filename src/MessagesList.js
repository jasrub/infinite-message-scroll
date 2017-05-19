import React, { Component } from 'react';
import $ from 'jquery';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const limit=50;
const baseUrl = 'http://message-list.appspot.com/';

class MessagesList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            newMessages: [],
            isLoading: true,
            isLoadingMore: false,
            pageToken:'',
        };
    };


    componentDidMount() {
        this.getMessages();
    };
    
    getMessages() {
        let reqUrl = baseUrl+'messages?pageToken='+this.state.pageToken+'&limit='+limit;
        $.get(reqUrl, function (response) {

            this.setState({
                newMessages : this.state.newMessages.concat(response.messages),
                pageToken: response.pageToken,
            });

        }.bind(this));
        
    }

    render() {
        var newMessages = this.state.newMessages.map((message) => {

            return (
                <div key={message.id}>
                    <Card>
                        <CardHeader
                            title={message.author.name}
                            subtitle={message.updated}
                            avatar={baseUrl+message.author.photoUrl}
                        />
                        <CardText>
                            {message.content}
                        </CardText>
                    </Card>
                </div>
            )
        }, this);

        return (
            <div className="content-container">
                {newMessages}
            </div>
        )
    }
}

export default MessagesList;
