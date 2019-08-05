import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import { Button, Input, Icon } from '@material-ui/core';
import RoundToll  from '../assets/round-toll.svg'
import Trophy  from '../assets/trophy-variant-outline.svg'
import { TimeLineTypes } from './TimeLineBox'

const initialState = {
  timeline: TimeLineTypes.Achievement,
  textInput: ""
}

class TimeLineActions extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = initialState;
  }
  
  handleAchievementTab = (val) => {
    this.setState({timeline: val})
    this.textInput.current.focus();
  }

  handleTimelineInput = (event) => {
    this.setState({ textInput: event.target.value });
  }

  handleAddPost = () => {
    this.props.addPost({
      description: this.state.textInput,
      type: this.state.timeline,
      reward: 0
    })
    this.setState(initialState);
  }
  
  _getActivity = (props) => {
    switch(props)
    {
      case TimeLineTypes.Achievement: return "Achievement"
      case TimeLineTypes.Reward: return "Reward"
      case TimeLineTypes.Proposition: return "Proposition"
      default: return "Error"
      }
  }

  render() {
    return (
      <Achievement>
        <FlexRow>
          <Action>
            <Button color="inherit" onClick={() => this.handleAchievementTab(TimeLineTypes.Achievement)}>
              <img src={Trophy} alt="" /> &nbsp;&nbsp; <span style={{textTransform: "none"}}>Achievement </span>
            </Button>
          </Action>
          <Action>
            <Button color="inherit" onClick={() => this.handleAchievementTab(TimeLineTypes.Reward)}>
              <img src={RoundToll} alt="" /> &nbsp;&nbsp; <span style={{textTransform: "none"}}>Reward</span>
            </Button>
          </Action>
        </FlexRow>
          <Content>
            <FlexRow style={{padding: "0 13px"}}>
              <Input multiline={true} fullWidth={true} autoFocus={true} disableUnderline={true}
                      inputRef={this.textInput}
                      value={this.state.textInput}
                      placeholder={this._getActivity(this.state.timeline)+ ": +10 @Pesho for fixing forwarding in back end of StrongForce framework."}
                      onChange={(val) => this.handleTimelineInput(val)}/>
            </FlexRow>
            <FlexRow>
              <PostButtonBox>
                <Button color="inherit" onClick = {this.handleAddPost}>
                    <span style={{textTransform: "none"}}>  Post {this._getActivity(this.state.timeline)}</span>
                  <Icon>keyboard_arrow_right</Icon>
                  </Button>
              </PostButtonBox>
            </FlexRow>
          </Content>
      </Achievement>
    )
  }
}

TimeLineActions.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const PostButtonBox = styled.div`
  margin-top: 20px;
  min-width: 200px;
  background: #1e88e5;
  color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
  -moz-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
  box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
`

const Content = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
`

const Achievement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
  width: 100%;
  -webkit-box-shadow: 0px 0px 4px -1px #e0e0e0;
  -moz-box-shadow: 0px 0px 4px -1px #e0e0e0;
  box-shadow: 0px 0px 4px -1px #e0e0e0;
  margin-bottom: 10px;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 10px;
`


const Action = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 50px;
  margin: 0px 3px;
`

export default TimeLineActions