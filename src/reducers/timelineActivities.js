import { TimeLineTypes } from '../components/TimeLineBox'

const initialState = [
  {
    reward: 125,
    type: TimeLineTypes.Achievement,
    description: " It is a long established fact that a reader will be distracted by the readable content of ",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy1hKEOA-aB87ddJq9Vq-IedDSnyuJgIY1izBIkyttvB54hmj"
  },
  {
    reward: 500,
    type: TimeLineTypes.Reward,
    description: " It is a long established fact that a reader will be distracted by the readable content of ",
    image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg"
  },
  {
    reward: 600,
    type: TimeLineTypes.Proposition,
    description: " It is a long established fact that a reader will be distracted by the readable content of ",
    image : "https://sophosnews.files.wordpress.com/2014/04/anonymous-250.jpg?w=250"
  }
]

const timelineActivities = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TIMELINE_POST':
      return handleAddPost(state, {
        reward: 125,
        type: TimeLineTypes.Achievement,
        description: ` Received from flutter: ${action.description}`,})
    default:
      return state
  }
}

const handleAddPost = (state, post) =>{
  let newState = state
  state.unshift(post)
  return [...newState]
  
}
  
export default timelineActivities