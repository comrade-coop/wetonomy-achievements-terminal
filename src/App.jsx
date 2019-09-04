import React, { Component } from 'react';
import { connect } from 'react-redux'
import TimeLineContainer from './containers/TimeLineContainer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InitialScreen from "./containers/InitialScreen"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1e88e5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  render(){
    let content = <InitialScreen/>
    if(this.props.info.initialized) content = <TimeLineContainer variant="contained" color="primary"/>
    
    return (
      <ThemeProvider theme={theme}>
        {content}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(App);
