export default class Action {
	constructor(targets, actionName, parameters){
		this.targets = [targets]
		this.actionName = actionName
		this.parameters = parameters
	}
}