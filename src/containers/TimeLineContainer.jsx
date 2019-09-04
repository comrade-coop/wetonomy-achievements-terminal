import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TimeLineBox from '../components/TimeLineBox'
import TimeLineActions from '../components/TimeLineActions'
import { fetchRequest }  from '../actions'

class TimeLineContainer extends Component {  
  
  onAddTimelinePost = (post) => {
    const address = this.props.info.contracts.find((item) => item.name === "AchievementsContract").address
    const { dispatch } = this.props
    dispatch(fetchRequest("ADD_TIMELINE_POST", address, post))
  }

  onAddReward = (post) => {
    const address = this.props.info.contracts.find((item) => item.name === "AllowanceTokenContract").address
    const { dispatch } = this.props
    dispatch(fetchRequest("ADD_REWARD", address, post))
  }

  render() {
    console.log(this.props)
    const activities = this.props.timelineActivities.map((activity, index) => {
      return <TimeLineBox key={index} {...activity} addReward={this.onAddReward}/>
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
  timelineActivities: state.timelineActivities
})

const AchieventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
`

export default connect(mapStateToProps)(TimeLineContainer)