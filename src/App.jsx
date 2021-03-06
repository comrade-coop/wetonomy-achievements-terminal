import React, { Component } from 'react';
import { connect } from 'react-redux'
import TimeLineContainer from './containers/TimeLineContainer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InitialScreen from "./containers/InitialScreen"
import CustomizedSnackbars from "./components/CustomizedSnackbars"
import {sendStateQuery, closeSnackbar} from './actions'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {contractsLatest : false, open: true};
    console.log(props)
    this.getLatestState()
  }

  getContractState = (address) => {
    const { dispatch } = this.props
    dispatch(sendStateQuery(address))
  }

  getLatestState = () => {
    if(!this.state.contractsLatest)
    this.props.info.contracts.forEach(contract => {
      if(contract.address !== null) 
        this.getContractState(contract.address)
    });
    // this.setState({contractsLatest: true})
  }

  closeSnackbar = () => {
    const { dispatch } = this.props
    dispatch(closeSnackbar())
  }

  render(){
    // localStorage.clear();
    console.log(this.props)
    let content = <InitialScreen/>
    if(this.props.info.initialized) 
      content = <TimeLineContainer variant="contained" color="primary"/>

    return (
      <ThemeProvider theme={theme}>
        <CustomizedSnackbars {...this.props.snackbar} closeSnack={this.closeSnackbar}/>
        {content}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  info: state.info,
  snackbar: state.snackbar,
})

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: '#93bbff',
    //   main: '#2196f3',
    //   dark: '#0069c0',
    //   contrastText: '#fff',
    // },
    primary: {
      light: '#e9b3ca',
      main: '#ec407a',
      dark: '#c13271',
      disabled: '#f38baf',
      contrastText: '#fff',
    },
    
    secondary: {
      light: '#ff7961',
      main: '#a6a6a6',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default connect(mapStateToProps)(App);
