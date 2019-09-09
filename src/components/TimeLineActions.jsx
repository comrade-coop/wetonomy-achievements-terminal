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
    // this.buttonDOM = React.createRef();
    this.state = initialState;
  }
  
  handleAchievementTab = (val) => {
    this.setState({timeline: val})
    this.textInput.current.focus();
  }

  handleTimelineInput = (event) => {
    this.setState({ textInput: event.target.value });
  }

  handleAddPost = (event) => {
    console.log(this.buttonDOM)
    console.log(event)
    // this.buttonDOM.blur();
    this.props.addPost({
      description: this.state.textInput,
      type: this.state.timeline,
      Recipients: ["BB"],
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
                <ButtonH
                ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}
                color="primary" variant="contained"  onClick = {this.handleAddPost}>
                    <span style={{textTransform: "none"}}>  Post {this._getActivity(this.state.timeline)}</span>
                  <Icon>keyboard_arrow_right</Icon>
                </ButtonH>
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

const ButtonH = styled(Button)`
  :focus{
    background:#2196f3 !important;
  }
`

const PostButtonBox = styled.div`
  // -webkit-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
  // -moz-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
  // box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
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
  border-radius: 5px;
  margin: 0px 3px;
`

export default TimeLineActions