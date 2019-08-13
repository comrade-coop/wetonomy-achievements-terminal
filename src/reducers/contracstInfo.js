const initialState = [
  {
    address: "0x001",
    name: "AchievementsContract"
  },
  {
    address: "0x002",
    name: "ContributionTokenContract"
  },
  {
    address: "0x003",
    name: "AllowanceTokenContract"
  }
]

const contractsInfo = (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_INFO": return initialState
    default:
      return state
  }
}
  
export default contractsInfo