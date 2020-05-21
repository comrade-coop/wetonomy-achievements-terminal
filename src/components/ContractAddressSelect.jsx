import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const ContractAddressSelect = (props) => {
  const theme = useTheme();
  const lightColor = theme.palette.primary.light;
  let addresses = []
  let name
  if(props.contract) {
    name = props.contract.name
    addresses = props.contract.avaiableAddresses.map((address, index) =>  
      <FlexButton onClick={()=>props.handleAddressSelect(props.contract, address)} color="primary" key={index}>
        <Reward style={{background: lightColor}}>{index+1}</Reward><ContractAddress style={{textTransform: "none"}}>{address}</ContractAddress>
      </FlexButton>
    )
  }
	
  return (
    <ContractAddressList>
        <ContractName>{name}</ContractName>
        {addresses}
    </ContractAddressList>
  )
}
const FlexButton = styled(Button)`
  // height: 35px;
  display:flex;
  width: 80%;
  flex-direction: row;
  margin-top: 10px;
  border-radius: 50px !important;
`

const Reward = styled.div`
  margin: -1px;
	border-radius: 50px;
  height: 35px;
  color:white;
  width: 35px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`

const ContractName = styled.div`
  font-size: 20px;
  border-bottom: 1px solid #d6d6d6;
  width: 80%;
  text-align: center;
  margin-bottom: 15px;
  
`

const ContractAddress = styled.div`
  width: 80%;
  padding-top: 11px;
  color: black;
  border-bottom: 1px solid #d6d6d6;
  
`

const ContractAddressList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  
`

export default ContractAddressSelect