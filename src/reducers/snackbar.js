const initialState = {
    open: false,
    type: "info",
    message: "Action sent to Blockchain"
  }
  
  const snackbar = (state = initialState, action) => {
    switch (action.type) {
      case "OPEN": return {...action.snackbar, open: true}
      case "CLOSE": return { ...state, open: false}
      default:
        return state
    }
  }

  export default snackbar