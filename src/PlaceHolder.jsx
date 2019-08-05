    
import React from 'react'
import styled from 'styled-components'
import { AppBar, Icon } from '@material-ui/core';

// const color = HUE[SHADE];


const PlaceHolder = (props) => (
      <div>
        <Indicators> 
          <Icon>face</Icon>
          <Icon>accessibility</Icon>
          <Icon>announcement</Icon>
        </Indicators>
        <AppBar position="relative">
          <AppBar2>
            <h3> <i className="material-icons md-48 ">menu</i></h3>
            
            <h3>Home</h3>
            <h3> <i className="material-icons">search</i></h3>
          </AppBar2>
         </AppBar>
        <Holder>
            {props.screen}
        </Holder>
      </div>
    )

const Holder = styled.main`
  
`

const Indicators = styled.div`
  background: #f6f6f6
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3px 3px 3px 3px;
`
const AppBar2 = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
  color: black;
  background-color: white;
`

export default PlaceHolder;