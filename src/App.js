import React, { Component } from 'react';
import MessagesList from './MessagesList'
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        style={{position: 'fixed'}}
                        title="Messages"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                    <div style={{ paddingTop: 64 }}>
                        <MessagesList />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
