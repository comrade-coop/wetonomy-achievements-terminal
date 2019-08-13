import Action from "./actions/action.model"
import { mapActionTypesToNames } from "./actions/index"


export const sendPostAction = (obj) => {
	var action = new Action(obj.address, mapActionTypesToNames(obj.name), obj.post)
	console.log(action)
	if(window.StrongForceChannel)
		window.StrongForceChannel.postMessage(JSON.stringify(action));
	else throw new Error('Not in mobile app');
}
