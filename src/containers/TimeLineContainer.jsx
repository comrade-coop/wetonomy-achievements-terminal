import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TimeLineBox from '../components/TimeLineBox'
import TimeLineActions from '../components/TimeLineActions'
import { addTimelinePost, addReward, sendStateQuery }  from '../actions'



class TimeLineContainer extends Component {  
  constructor(props){
    super(props)
    this.state = {postsCount: 0}
  }
  
  onAddTimelinePost = (post) => {
    const address = this.props.info.contracts.find((item) => item.name === "AchievementsContract").address
    const { dispatch } = this.props
    dispatch(addTimelinePost(address, post.description, post.recipients))
  }

  onAddReward = (payload) => {
    const address = this.props.info.contracts.find((item) => item.name === "AllowanceTokenContract").address
    const { dispatch } = this.props
    dispatch(addReward(address, payload.address, payload.reward))
  }

  getContractState = (address) => {
    const { dispatch } = this.props
    dispatch(sendStateQuery(address))
  }

  render() {
    console.log(this.props)
    var image1 = "https://www.statnews.com/wp-content/uploads/2019/07/GettyImages-1130598362-645x645.jpg"//"https://pbs.twimg.com/profile_images/526334387688710145/zXycT5FL.jpeg"
    var image2 = "https://cdn.discordapp.com/attachments/501438478358151178/623468777253765120/download.png"

    // localStorage.clear();
    const length = this.props.info.contracts[0].state.State.Achievements.length
    
    const activities = this.props.timeline.map((activity, index) => 
       <TimeLineBox  image = { (length-index)%2===0? image1: image2}
      key={length-index} {...activity} name={(length-index)  + " "+ activity.address} addReward={this.onAddReward}/>
    )
    
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
  timeline: state.timeline 
  // timeline: state.info.contracts[0].state.State.Achievements
})

const AchieventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
`

export default connect(mapStateToProps)(TimeLineContainer)