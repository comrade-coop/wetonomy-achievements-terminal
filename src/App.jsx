import React, { Component } from 'react';
import { connect } from 'react-redux'
import TimeLineContainer from './containers/TimeLineContainer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import InitialScreen from "./containers/InitialScreen"
import {sendStateQuery} from './actions'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {contractsLatest : false};
  }

  getContractsState = (address) => {
    const { dispatch } = this.props
    dispatch(sendStateQuery(address))
  }

  getLatestState = () => {
    if(!this.state.contractsLatest)
    this.props.info.contracts.forEach(contract => {
      if(contract.address !== null) 
        this.getContractState(contract.address)
    });
    this.setState({contractsLatest: true})
  }
  

  render(){
    let content = <InitialScreen/>
    if(this.props.info.initialized) {
      content = <TimeLineContainer variant="contained" color="primary"/>
      
    }
    
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ec6ff',
      main: '#2196f3',
      dark: '#0069c0',
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

export default connect(mapStateToProps)(App);
