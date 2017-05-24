import React, { Component } from 'react';
import MessagesList from './MessagesList'
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class App extends Component {
    constructor() {
        super();
        this.state = {
            isShowingStar: false,
        };

        this.toggleStar = this.toggleStar.bind(this);

    };

    toggleStar() {
        this.setState({
            isShowingStar:!this.state.isShowingStar
        })
    }


    render() {
        const starIcon = this.state.isShowingStar? <ToggleStar /> : <ToggleStarBorder />;
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        style={{position: 'fixed'}}
                        title="Messages"
                        iconElementLeft={<AboutLink/>}
                        iconElementRight={<IconButton onClick={this.toggleStar}>{starIcon}</IconButton>}
                    />
                    <div style={{ paddingTop: 64 }}>
                        <MessagesList isShowingStar={this.state.isShowingStar}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

class AboutLink extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <IconButton onTouchTap={this.handleTouchTap} iconStyle={{color:'#fff'}}><NavigationMenu /></IconButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <a href="http://www.jasrub.com/infinite-message-scroll/about/" target="_blank" style={{textDecoration: 'none'}}><MenuItem primaryText="About" /></a>
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default App;
