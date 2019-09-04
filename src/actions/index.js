export const mapActionTypesToNames = (type) => {
	switch(type){
    case "ADD_TIMELINE_POST": return "AddPostAction"
    case "ADD_REWARD": return "TokenTransfer"
		default: return ""
	}
}

export const fetchRequest = (name, address, post) => ({
  type: 'FETCH_REQUEST',
  name,
  address,
  post
})

export const contractTypeRequest = (contractType) => ({
  type: 'CONTRACT_TYPE_REQUEST',
  contractType
})

export const initialRequest = (contractName) => ({
  type: 'INITIAL_REQUEST',
  contractName
})

export const addressSelect = (contract) => ({
  type: 'ADDRESS_SELECT',
  contract
})

export const contractsInitialized = () => ({
  type: 'CONTRACTS_INITIALIZED'
})