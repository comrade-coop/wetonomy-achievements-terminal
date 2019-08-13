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