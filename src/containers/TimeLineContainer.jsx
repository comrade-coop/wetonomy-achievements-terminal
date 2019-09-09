import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TimeLineBox from '../components/TimeLineBox'
import TimeLineActions from '../components/TimeLineActions'
import { sendAction }  from '../actions'

class TimeLineContainer extends Component {  
  
  onAddTimelinePost = (post) => {
    const address = this.props.info.contracts.find((item) => item.name === "AchievementsContract").address
    const { dispatch } = this.props
    dispatch(sendAction("ADD_TIMELINE_POST", address, post))
  }

  onAddReward = (post) => {
    const address = this.props.info.contracts.find((item) => item.name === "AllowanceTokenContract").address
    const { dispatch } = this.props
    dispatch(sendAction("ADD_REWARD", address, post))
  }

  render() {
    console.log(this.props)
    var image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy1hKEOA-aB87ddJq9Vq-IedDSnyuJgIY1izBIkyttvB54hmj"
    var image2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg"
    var mock = {
      reward: 125,
      type: 1,
      description: " It is a long established fact that a reader will be distracted by the readable content of ",
      rewardsList:[
        {
          reward: 50,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
          comment: "Lorem ipsum",
        },
        {
          reward: 50,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/220px-Dwayne_Johnson_2%2C_2013.jpg",
          comment: "Lorem ipsum",
        }
      ]
    }
    const activities = this.props.timelineActivities.map((activity, index) => {
      return <TimeLineBox 
      image = { index%2===0? image1: image2}
      key={index} {...mock} name={activity} addReward={this.onAddReward}/>
    })
    
    return (
      <AchieventContainer>
        <TimeLineActions  {...this.state} addPost={this.onAddTimelinePost}/>
        {activities}
      </AchieventContainer>
        
    )
  }
}
const mapStateToProps = state => ({
  info: state.info,
  timelineActivities: state.info.contracts[0].state.State.Achievements
})

const AchieventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
`

export default connect(mapStateToProps)(TimeLineContainer)