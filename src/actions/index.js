export const mapActionTypesToNames = (type) => {
	switch(type){
    case "ADD_TIMELINE_POST": return "CreateAchievement"
    case "ADD_REWARD": return "TokenTransfer"
		default: return ""
	}
}

// Internal Actions

export const contractsInitialized = () => ({
  type: 'CONTRACTS_INITIALIZED'
})

// Api Actions

export const sendAction = (name, address, post) => ({
  type: 'SEND_ACTION',
  name,
  address,
  post
})

export const sendQuery = (query) => ({
  type: 'SEND_QUERY',
  query
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

