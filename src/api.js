import Action from "./actions/action.model"
import InitialRequest from "./actions/initialRequest.model"
import TypeRequest from "./actions/typeRequest.model"
import { mapActionTypesToNames } from "./actions/index"

export const sendPostAction = (obj) => {
	var action = new Action(obj.address, mapActionTypesToNames(obj.name), obj.post)
	console.log(action)
	sendPostMessage(action)
}

export const loadInitialState = (contractName) => {
	var initialRequest = new InitialRequest(contractName)
	sendPostMessage(initialRequest)
}

export const sendTypeRequest = (type) => {
	var typeRequest = new TypeRequest(type)
	sendPostMessage(typeRequest)
}


const sendPostMessage = (msg) => {
	if(window.StrongForceActionChannel)
		window.StrongForceActionChannel.postMessage(JSON.stringify(msg));
	else throw new Error('Not in mobile app');
}

