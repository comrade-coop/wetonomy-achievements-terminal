import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContractAddressSelect from "../components/ContractAddressSelect"
import { contractTypeRequest, addressSelect, contractsInitialized, sendStateQuery } from '../actions/index'



class InitialScreen extends Component {  

  onContractAddressSelect = (contract, address) => {
    contract.address = address
    const { dispatch } = this.props
    dispatch(addressSelect(contract))
    dispatch(sendStateQuery(address))
  }

  contractTypeRequest = (contractName) => {
    const { dispatch } = this.props
    dispatch(contractTypeRequest(contractName))
  }
  
  contractsInitialized = () => {
    const { dispatch } = this.props
    dispatch(contractsInitialized())
  }

  render() {
    console.log(this.props)
    const contract = this.props.info.contracts.find((element) => {
     return element.address === null
    })
    if(contract ) this.contractTypeRequest(contract.name)
    else this.contractsInitialized()
    return (
      <ContractAddressSelect contract={contract} handleAddressSelect={this.onContractAddressSelect} />
    )
  }
}
const mapStateToProps = state => ({
  info: state.info,
})


export default connect(mapStateToProps)(InitialScreen)