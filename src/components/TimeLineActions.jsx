import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import { Button, Input, Icon } from '@material-ui/core';
import RoundToll  from '../assets/round-toll.svg'
import Trophy  from '../assets/trophy-variant-outline.svg'
import { TimeLineTypes } from './TimeLineBox'

const initialState = {
  timeline: TimeLineTypes.Achievement,
  textInput: "",
  hashtagCriteria: false,
  amountCriteria: false,
  recipientCriteria: false,
}

const amountRe = /\+([1-9])+/
const recipientRe = /@([a-z])+/
const hashtagRe = /#([a-z])+/

class TimeLineActions extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    // this.buttonDOM = React.createRef();
    this.state = initialState;
  }

  
  
  handleAchievementTab = (val) => {
    const type = this._getActivity(val)
    let addition = ": "
    if(val === TimeLineTypes.Reward) addition = ": +"
    this.setState({timeline: val, textInput: type + addition})

    this.textInput.current.focus();
  }

  handleTimelineInput = (event) => {
    var arr = event.target.value.match(amountRe)
    if(arr !== null) this.setState({ amountCriteria: true });
    else this.setState({ amountCriteria: false });

    arr = event.target.value.match(recipientRe)
    if(arr !== null) this.setState({ recipientCriteria: true });
    else this.setState({ recipientCriteria: false });

    arr = event.target.value.match(hashtagRe)
    if(arr !== null) this.setState({ hashtagCriteria: true });
    else this.setState({ hashtagCriteria: false });


    
    this.setState({ textInput: event.target.value });
  }

  handleAddPost = () => {
    this.props.addPost({
      description: this.state.textInput,
      type: this.state.timeline,
      recipients: ["BB"],
      reward: 0
    })
    this.setState(initialState);
  }
  
  _getActivity = (props) => {
    switch(props)
    {
      case TimeLineTypes.Achievement: return "Achievement"
      case TimeLineTypes.Reward: return "Reward"
      default: return "Error"
      }
  }

  onInputFocus = () => {
    setTimeout(()=>{
      if(this.state.textInput==="") this.handleAchievementTab(this.state.timeline)
    }, 10)
  }

  render() {
    let amountCriteria = this.state.amountCriteria ? "active-criteria" : "";
    let recipientCriteria = this.state.recipientCriteria ? "active-criteria" : "";
    let hashtagCriteria = this.state.hashtagCriteria ? "active-criteria" : "";
    let criterias = this.state.amountCriteria && this.state.recipientCriteria &&
      this.state.hashtagCriteria
    console.log(criterias)
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
            <FlexRow style={{padding: "0 13px",minHeight: "70px"}}>
              <Input multiline={true} fullWidth={true} autoFocus={false} disableUnderline={true}
                      inputRef={this.textInput}
                      value={this.state.textInput}
                      placeholder={this._getActivity(this.state.timeline)+ ": +10 @Pesho for fixing forwarding in back end of StrongForce framework."}
                      onFocus={this.onInputFocus}
                      onChange={(val) => this.handleTimelineInput(val)}/>
            </FlexRow>
            <FlexRow style={{marginTop: "15px"}}>
              <PostButtonBox>
                <Button disabled= {false}
                    ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}
                    color="primary" variant="contained"  onClick = {this.handleAddPost}>
                    <span style={{textTransform: "none"}}>  Post {this._getActivity(this.state.timeline)}</span>
                  <Icon>keyboard_arrow_right</Icon>
                </Button>
              </PostButtonBox>
              {this.state.timeline === TimeLineTypes.Reward ? 
              <CriteriaRow>
                <Criteria className={amountCriteria}>+</Criteria>
                <Criteria className={recipientCriteria}>@</Criteria>
                <Criteria className={hashtagCriteria}>#</Criteria>
              </CriteriaRow> :
              ""
              }
              
            </FlexRow>
          </Content>
      </Achievement>
    )
  }
}

TimeLineActions.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f4433685;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  
  // -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
  // -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);
  // box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.25);

`

const CriteriaRow = styled.div`
  margin-left: auto;
  align-items: center;
  width 40%;
  // background:#93bbff;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 5px;
  border-radius: 25px;
`

const ButtonH = styled(Button)`
  :focus{
    // background:#2196f3 !important;
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