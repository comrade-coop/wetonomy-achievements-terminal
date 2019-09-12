import { TimeLineTypes } from '../components/TimeLineBox'

const skalata = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg"

const initialState = [
  // {
  //   address: "bjmJv9o",
  //   reward: 125,
  //   type: TimeLineTypes.Achievement,
  //   description: " It is a long established fact that a reader will be distracted by the readable content of ",
  //   image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy1hKEOA-aB87ddJq9Vq-IedDSnyuJgIY1izBIkyttvB54hmj",
  //   rewardsList:[
  //     {
  //       reward: 50,
  //       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
  //       comment: "Lorem ipsum",
  //     },
  //     {
  //       reward: 50,
  //       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
  //       comment: "Lorem ipsum",
  //     }
  //   ]
  // }
]
//   {
//     reward: 125,
//     type: TimeLineTypes.Achievement,
//     description: " It is a long established fact that a reader will be distracted by the readable content of ",
//     image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy1hKEOA-aB87ddJq9Vq-IedDSnyuJgIY1izBIkyttvB54hmj",
//     rewardsList:[
//       {
//         reward: 50,
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
//         comment: "Lorem ipsum",
//       },
//       {
//         reward: 50,
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
//         comment: "Lorem ipsum",
//       }
//     ]
//   },
//   {
//     reward: 500,
//     type: TimeLineTypes.Reward,
//     description: " It is a long established fact that a reader will be distracted by the readable content of ",
//     image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
//     rewardsList:[]
//   },
//   {
//     reward: 600,
//     type: TimeLineTypes.Achievement,
//     description: " It is a long established fact that a reader will be distracted by the readable content of ",
//     image : "https://sophosnews.files.wordpress.com/2014/04/anonymous-250.jpg?w=250",
//     rewardsList:[
//       {
//         reward: 50,
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
//         comment: "Lorem ipsum",
//       }
//     ]
//   }
// ]

const timelineActivities = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TIMELINE_POST':
      return handleAddPost(state, {
        reward: 125,
        type: TimeLineTypes.Achievement,
        ...action.post})
    case 'UPDATE_TIMELINE_POST':
      return handleUpdatePost(state, {
        reward: 125,
        type: TimeLineTypes.Achievement,
        ...action.post})
    default:
      return state
  }
}

const handleUpdatePost = (state, post) =>{
  const contains = state.find((element) => element.address === post.address)
  if(contains===undefined) return handleAddPost(state,post)
  let newPost = {...contains}
  newPost.rewardsList = []
  let reward = 0
  for (var key in post.TokenContributors) {
    reward += parseInt(post.TokenContributors[key][""])
    newPost.rewardsList.push({
      reward: parseInt(post.TokenContributors[key][""]),
      image: skalata,
      comment: key
    })
  }
  const newState = state.map((element) => {
    if(element.address !== post.address)  return element
    else return {...newPost, reward}
  })
  return newState
  
}

const handleAddPost = (state, post) =>{
  console.log(JSON.stringify)
  const contains = state.find((element) => element.address === post.address)
  if(contains===undefined){
    let newState = state
    let newPost = {}
    newPost.address = post.address
    newPost.rewardsList = []
    newPost.description = post.Describtion
    
    let reward = 0
    for (var key in post.TokenContributors) {
      reward += parseInt(post.TokenContributors[key][""])
      newPost.rewardsList.push({
        reward: parseInt(post.TokenContributors[key][""]),
        image: skalata,
        comment: key
      })
    }
  
    state.unshift({reward, type: TimeLineTypes.Achievement, ...newPost})
    return [...newState]
  }
  return state
}
  
export default timelineActivities