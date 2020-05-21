import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Input, Icon, Collapse } from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import RoundToll from '../assets/round-toll.svg'
import Trophy from '../assets/trophy-variant-outline.svg'
import { TimeLineTypes } from './TimeLineBox'

const initialState = {
  open: false,
  timeline: TimeLineTypes.Achievement,
  textInput: "",
  disabledTap: false,
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
    this.state = initialState;
  }

  handleAchievementTab = (val) => {
    const type = this._getInput(val)
    this.setState({ ...initialState, timeline: val, textInput: type, open: true })

    this.textInput.current.focus();
  }

  handleTimelineInput = (event) => {

    var arr = event.target.value.match(amountRe)
    if (arr !== null) this.setState({ amountCriteria: true });
    else this.setState({ amountCriteria: false });

    arr = event.target.value.match(recipientRe)
    if (arr !== null) this.setState({ recipientCriteria: true });
    else this.setState({ recipientCriteria: false });

    arr = event.target.value.match(hashtagRe)
    if (arr !== null) this.setState({ hashtagCriteria: true });
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
    setTimeout(() => { 
      this.setState(initialState)
      this.textInput.current.blur();
    }, 15)
    
  }

  _getActivity = (props) => {
    switch (props) {
      case TimeLineTypes.Achievement: return "Achievement"
      case TimeLineTypes.Reward: return "Reward"
      default: return "Error"
    }
  }

  _getInput = (props) => {
    switch (props) {
      case TimeLineTypes.Achievement: return "Achievement: "
      case TimeLineTypes.Reward: return "Reward: +"
      default: return "Error"
    }
  }

  onInputFocus = () => {
    this.setState({ open: true })
    setTimeout(() => {
      if (this.state.textInput === "") this.handleAchievementTab(this.state.timeline)
    }, 10)
  }

  onInputBlur = () => {
    setTimeout(() => {
      const check = document.activeElement === this.textInput.current
      if (!check) {
        this.setState({ open: false })
        if (this.state.textInput === this._getInput(this.state.timeline) && !this.state.disabledTap)
          this.setState(initialState)
      }
    }, 10)
  }

  disabledTap = () => {
    this.setState({ disabledTap: true })
    setTimeout(() => { this.setState({ open: true, disabledTap: false }) }, 10)
    this.textInput.current.focus();
  }

  criteriaTap = (val) => {
    const input = this.state.textInput + val
    this.setState({ textInput: input })
    this.textInput.current.focus();
  }

  render() {
    // console.log(this.props.theme.palette.primary)
    const mainColor = this.props.theme.palette.primary.main


    const amountCriteria = this.state.amountCriteria ? "active-criteria" : "";
    const recipientCriteria = this.state.recipientCriteria ? "active-criteria" : "";
    const hashtagCriteria = this.state.hashtagCriteria ? "active-criteria" : "";

    const criterias = ((this.state.amountCriteria && this.state.recipientCriteria)
      || this.state.timeline === TimeLineTypes.Achievement) && this.state.hashtagCriteria

    const postBtnStyle = criterias ? {
      background: mainColor,
      boxShadow: "0px 0px 4px 0px rgba(193,50,113,0.5)"
    } : {
      background: this.props.theme.palette.primary.disabled,
      boxShadow: "none"
    }

    return (
      <Achievement>
        <FlexRow>
          <Action>
            <Button style={{ borderRadius: "25px" }} color="inherit" onClick={() => this.handleAchievementTab(TimeLineTypes.Achievement)}>
              <img src={Trophy} alt="" /> &nbsp;&nbsp; <span style={{ textTransform: "none" }}>Achievement </span>
            </Button>
          </Action>
          <Action>
            <Button style={{ borderRadius: "25px" }} color="inherit" onClick={() => this.handleAchievementTab(TimeLineTypes.Reward)}>
              <img src={RoundToll} alt="" /> &nbsp;&nbsp; <span style={{ textTransform: "none" }}>Reward</span>
            </Button>
          </Action>
        </FlexRow>
        <Content>
          <FlexRow style={{ padding: "0 13px", minHeight: "70px" }}>
            <Input multiline={true} fullWidth={true} autoFocus={false} disableUnderline={true}
              inputRef={this.textInput}
              value={this.state.textInput}
              placeholder={this._getActivity(this.state.timeline) + ": +10 @Pesho for fixing forwarding in back end of StrongForce framework."}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              onChange={(val) => this.handleTimelineInput(val)} />
          </FlexRow>
          <Collapse in={this.state.open}>
            <FlexRow>
              <ActionBorder>
                <CriteriaRow>
                  {this.state.timeline === TimeLineTypes.Reward ?
                    <Criteria className={amountCriteria} onClick={() => this.criteriaTap(" +")}
                      style={{ color: mainColor, fontSize: "30px", fontWeight: "400" }}>+</Criteria>
                    : ""}
                  {this.state.timeline === TimeLineTypes.Reward ?
                    <Criteria className={recipientCriteria} style={{ color: mainColor }} onClick={() => this.criteriaTap(" @")}>@</Criteria>
                    : ""}
                  <Criteria className={hashtagCriteria} style={{ color: mainColor }} onClick={() => this.criteriaTap(" #")}>#</Criteria>
                </CriteriaRow>

                <PostButtonBox onClick={this.disabledTap}>
                  <Button disabled={!criterias} style={{ color: 'white', ...postBtnStyle }}
                    ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}
                    color="primary" variant="contained"
                    onClick={this.handleAddPost}>
                    <span style={{ textTransform: "none", minWidth: "120px" }}>  Post {this._getActivity(this.state.timeline)}</span>
                    <Icon>keyboard_arrow_right</Icon>
                  </Button>
                </PostButtonBox>
              </ActionBorder>
            </FlexRow>
          </Collapse>
        </Content>
      </Achievement>
    )
  }
}

TimeLineActions.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const ActionBorder = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Criteria = styled.div`
  // font-family: montserrat;
  font-size: 24px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f7f7f7;
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-right: 10px;
`

const CriteriaRow = styled.div`
  align-items: center;
  width 40%;
  display: flex;
  flex-direction: row;
  padding: 0 5px;
  margin-right: auto;
`

const PostButtonBox = styled.div`
  height: 35px;
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
  -webkit-box-shadow: 0px 0px 5px 0px #e0e0e0;
  -moz-box-shadow: 0px 0px 5px 0px #e0e0e0;
  box-shadow: 0px 0px 5px 0px #e0e0e0;
  margin-bottom: 5px;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
`


const Action = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #f7f7f7;
  border-radius: 25px;
  margin: 0px 3px;
`

export default withTheme(TimeLineActions)