import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import { Button, Collapse, Input } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const DEFAULT_PROFILE_PICTURE = "https://www.chsbuffalo.org/sites/default/files/styles/crop_230x230/public/default_images/profile-default_0.jpg?itok=DTiAzsNA"

export const TimeLineTypes= {
	Achievement: 1,
	Reward: 2,
	Proposition: 3
}

class TimeLineBox extends Component {

	constructor(props){
		super(props)
		this.rewardInput = React.createRef();
		this.state = {open: false, textInput: "+500"}
	}

	// _getHeading = (props2) => {
	// 	switch(props2.type)
	// 	{
	// 		case TimeLineTypes.Achievement: return <Heading>Josh posted an Achevement</Heading>
	// 		case TimeLineTypes.Reward: return <Heading>Josh rewarded Mike</Heading>
	// 		case TimeLineTypes.Proposition: return <Heading>Josh proposed a Reward </Heading>
	// 		default: return ""
	// 	}
	// }

	_getStarButton = (props2) => {
		switch(props2.type)
		{
			case TimeLineTypes.Achievement: return   <ButtonContent style={{textTransform: "none"}}><Icon>star_border</Icon> &nbsp;Add on</ButtonContent>
			case TimeLineTypes.Reward: return  <ButtonContent style={{textTransform: "none"}}><Icon>star</Icon> &nbsp;Add On</ButtonContent>
			case TimeLineTypes.Proposition: return <ButtonContent style={{textTransform: "none"}}>Do It <Icon>arrow_right</Icon></ButtonContent>
			default: return ""
			}
	}

	_generateRewardsList = (rewards) => {
		return rewards.map((element, index) => 
			<CollapseFlexRow key={index}>
				<Reward style={{height:"35px"}}>+{element.reward}</Reward>
				<ImgBox><RoundedImg width="35" height="35" src={element.image || DEFAULT_PROFILE_PICTURE} alt=""/></ImgBox>
				<Heading style={{height:"35px"}}>{element.comment}</Heading>
			</CollapseFlexRow>
		)
	}

	handleStarButtonClick = () => {
		this.setState({open: !this.state.open})
		setTimeout(() => {
			if(this.state.open) this.rewardInput.current.focus()
			else this.rewardInput.current.blur()
		}, 300)
	}

	handleAddReward = () => {
		this.props.addReward({
			reward: this.state.textInput,
			post: 0
    })
    this.setState({textInput: "Reward Given"});
	}

	render() {
		return (
			<Achievement>
				<FlexRowHeading>
					<Reward>+{this.props.reward}</Reward>
					<ImgBox><RoundedImg width="40" height="40" src={this.props.image || DEFAULT_PROFILE_PICTURE} alt=""/></ImgBox>
					{/* {this._getHeading(this.props)} */}
					<Heading>Mike</Heading>
					<HourBatch>1 hour ago</HourBatch>

					<Button style={{minWidth: "10px",width:"5px"}} color="primary">
						<Icon color="inherit">more_vert</Icon>
					</Button>
				</FlexRowHeading>
				<FlexRow>
					<Description> {this.props.description} </Description> 
				</FlexRow>
				<FlexRow>
					<div style={{marginLeft:"-8px"}}>
						<Button color="primary" onClick={this.handleStarButtonClick}>{this._getStarButton(this.props)}</Button>
						<RewardCountButton style={{textTransform: "none"}}> {this.props.rewardsList.length} Rewards</RewardCountButton>
					</div>
					<Button color="primary">
						<RoundedImg width="25" height="25" src="https://camo.githubusercontent.com/a1397f6a4427587bf9305ac6527a09a41763ce9e/68747470733a2f2f706e672e69636f6e73382e636f6d2f636f6c6f722f313630302f7472656c6c6f"/>
						<span style={{textTransform: "none"}}>&nbsp;Trello</span>
					</Button>
				</FlexRow>
				<Collapse in={this.state.open}>
					{this._generateRewardsList(this.props.rewardsList)}
					<CollapseFlexRow>
						<Input fullWidth={true} autoFocus={true} placeholder={this.state.textInput}
								inputRef={this.rewardInput} disableUnderline={true}/>
						<Button onClick={this.handleAddReward} color="primary" variant="contained" style={{textTransform: "none"}}>Give</Button>
					</CollapseFlexRow>
				</Collapse>
			</Achievement>
		)
	}
}

TimeLineBox.propTypes = {
	// image: PropTypes.string.isRequired, //TODO default profile picture must be set in reducer
	description: PropTypes.string.isRequired,
	type: PropTypes.number.isRequired,
	reward: PropTypes.number.isRequired,
	rewardsList: PropTypes.array.isRequired,
}

const ButtonContent = styled.div`
	display: flex;
`

const ImgBox = styled.div`
	width: 40px;
	height: 40px;
`

const Description = styled.div`
	margin: 5px 0; 
	opacity: 0.7;
`

const RewardCountButton = styled(Button)`
	opacity: 0.7;
`

const Heading = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 10px;
	align-items: center;
	opacity: 0.6;
	font-weight: 400;
	width: 100%;
	text-align: left;
`

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px 10px;
`
const HourBatch = styled.div`
	width: 120px;
	font-size: 13px;
	opacity: 0.6;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	min-width: 100px;
`

const FlexRowHeading = styled(FlexRow)`
	height:40px;
`

const RoundedImg = styled.img`
	border-radius: 50px;
`

const CollapseFlexRow = styled(FlexRow)`
	box-shadow: 0 -1px 0 rgba(46,53,56,0.08);
	height: 35px;
	&:last-child {
		background: #f6f6f6;
	}
`

const Reward = styled.div`
	border-radius: 50px;
	background: #93bbff;
	height: 40px;
	color: white;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
	padding: 0 8px;
`

const Achievement = styled.div`
	font-size: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 5px;
	width: 100%;
	min-height: 160px;
	margin-top: 20px;
	-webkit-box-shadow: 0px 0px 4px -1px #e0e0e0;
	-moz-box-shadow: 0px 0px 4px -1px #e0e0e0;
	box-shadow: 0px 0px 4px -1px #e0e0e0;
`

export default TimeLineBox;