import React, { Component } from 'react';
import $ from 'jquery';

class ScrollToTop extends Component{

    constructor(props, context) {
        super(props, context);

        this.state = {
            scrollTop: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    };

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll() {
        this.setState({scrollTop: $(window).scrollTop()});
    };



    scrollToTop() {
        $("html, body").animate({ scrollTop: 0 }, this.props.duration);
    };

    render() {
        if (this.state.scrollTop < this.props.offset) {
            return null;
        }
        return (
            <div className="return-to-top noselect" onClick={this.scrollToTop}><i className="material-icons">keyboard_arrow_up</i></div>
        );
    }
};

export default ScrollToTop;