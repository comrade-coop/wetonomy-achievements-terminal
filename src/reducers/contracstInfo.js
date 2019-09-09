const initialState = {
  contracts:[
    {
      address: null,
      avaiableAddresses: ["cpdu6PE"],//["0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21"],
      name: "AchievementsContract",
      contractName: "AchieventFactory",
      state: {
        State: {
          Achievements: []
        }
      }
    },
    {
      address: null,
      avaiableAddresses: ["0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21"],
      name: "ContributionTokenContract",
      contractName: "ContributionTokenContract",
      subContractOf: "AchievementsContract",
      subContractFieldName: "ContributionToken",
      state: {}
    },
    {
      address: null,
      avaiableAddresses: ["0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21"],
      name: "AllowanceTokenContract",
      contractName: "AllowanceTokenContract",
      subContractOf: "AchievementsContract",
      subContractFieldName: "AllowanceToken",
      state: {}
    }],
  initialized: false

}

const contractsInfo = (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_INFO": return initialState
    case "ADDRESS_SELECT": return contractAddressSelect(state, action.contract)
    case "CONTRACTS_INITIALIZED": return {...state, initialized: true}
    case "CONTRACT_STATE": return contractState(state, action.contract)
    default:
      return state
  }
}
const contractAddressSelect = (state, contract) => {
  let temp = state.contracts.map((element) => {
    if(element.name !== contract.name) return element
    else return contract
  })
  return {...state, contracts: temp}
}

const contractState = (state, contract) => {
  let temp = state.contracts.map((element) => {
    if(element.name !== contract.name) return element
    else return contract
  })
  
  return {...state, contracts: temp}
}

export default contractsInfo