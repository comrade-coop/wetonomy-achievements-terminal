import Action from "./actions/action.model"
import InitialRequest from "./actions/initialRequest.model"
import Query from "./actions/query.model"

export const sendAction = (obj) => {
	var action = new Action(obj.address, obj.name, obj.payload)
	
	console.log(action)
	sendPostMessageAction(action)
}

export const sendQuery = (obj) => {
	var query = new Query(obj.query)
	sendPostMessageQuery(query)
}

// export const loadInitialState = (contractName) => {
// 	var initialRequest = new InitialRequest(contractName)
// 	sendPostMessageQuery(initialRequest)
// }

const sendPostMessageQuery = (msg) => {
	if(window.StrongForceQueryChannel)
		window.StrongForceQueryChannel.postMessage(JSON.stringify(msg));
	// else throw new Error('Not in mobile app');
}

const sendPostMessageAction = (msg) => {
	if(window.StrongForceActionChannel)
		window.StrongForceActionChannel.postMessage(JSON.stringify(msg));
	// else throw new Error('Not in mobile app');
	else {
		var init = {
			address: "cpdu6PE",
			avaiableAddresses: ["0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21", "0x89123asd123sad12ae21"],
			name: "AchievementsContract",
			contractName: "AchieventFactory",
			state: {
			  Achievements: []
			}
		  }
		var contract = JSON.parse('{"address":"cpdu6PE","state":{"State":{"Achievements":["bjmJv9o","jpvNQ_c","R3nO6Y4","cD035lA"],"Acl":{"Permissions":[{"Sender":null,"Target":"cpdu6PE","Type":"CreateAchievement"},{"Sender":null,"Target":"cpdu6PE","Type":"TokensReceived"},{"Sender":"bjmJv9o","Target":"cpdu6PE","Type":"ExchangeTokens"},{"Sender":"cD035lA","Target":"cpdu6PE","Type":"ExchangeTokens"},{"Sender":"f2Cs8fLAvwfY4oRwpggdM9uHnBM","Target":"cpdu6PE","Type":"AddPermission"},{"Sender":"f2Cs8fLAvwfY4oRwpggdM9uHnBM","Target":"cpdu6PE","Type":"RemovePermission"},{"Sender":"jpvNQ_c","Target":"cpdu6PE","Type":"ExchangeTokens"},{"Sender":"R3nO6Y4","Target":"cpdu6PE","Type":"ExchangeTokens"}]},"BurnTokenManager":"i_PNa7I","ExchangeRateDenominator":2,"ExchangeRateNumerator":1,"MintTokenManager":"xbLnbgs"},"Type":"Wetonomy.Achievements.AchievementFactory, Achievements, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"}}')
		window.store.dispatch({type: "CONTRACT_STATE", contract: {...init,state: contract.state}})	
	}
}

