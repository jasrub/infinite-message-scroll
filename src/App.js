import React, { Component } from 'react';
import MessagesList from './MessagesList'
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import IconButton from 'material-ui/IconButton';
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
                        iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
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

export default App;
