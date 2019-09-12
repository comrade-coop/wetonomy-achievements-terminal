export const actions = {
  ADD_TIMELINE_POST: "CreateAchievement",
  ADD_REWARD: "TransferTokens",
}

// Internal Actions

export const contractsInitialized = () => ({
  type: 'CONTRACTS_INITIALIZED'
})

export const openSnackbar = (snackbar) => ({
  type: 'OPEN',
  snackbar
})

export const closeSnackbar = () => ({
  type: 'CLOSE'
})






// Api Actions

export const addTimelinePost = (address, Describtion, Recipients) => ({
  type: 'SEND_ACTION',
  name: actions.ADD_TIMELINE_POST,
  address,
  payload: { Describtion, Recipients}
})

export const addReward = (address, To, Amount) => ({
  type: 'SEND_ACTION',
  name: actions.ADD_REWARD,
  address,
  payload: { To, Amount }
})

export const sendStateQuery = (address) => ({
  type: 'SEND_QUERY',
  query: "strongforce/contract/state/" + address
})

export const addressSelect = (contract) => ({
  type: 'ADDRESS_SELECT',
  contract
})

export const contractTypeRequest = (contractType) => ({
  type: 'CONTRACT_TYPE_REQUEST',
  contractType
})

