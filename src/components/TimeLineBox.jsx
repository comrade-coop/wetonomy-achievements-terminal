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
		this.state = {open: false}
	}

	_getHeading = (props2) => {
		switch(props2.type)
		{
			case TimeLineTypes.Achievement: return <Heading>Josh posted an Achevement</Heading>
			case TimeLineTypes.Reward: return <Heading>Josh rewarded Mike</Heading>
			case TimeLineTypes.Proposition: return <Heading>Josh proposed a Reward </Heading>
			default: return ""
		}
	}
	_getStarButton = (props2) => {
		switch(props2.type)
		{
			case TimeLineTypes.Achievement: return   <ButtonContent style={{textTransform: "none"}}><Icon>star_border</Icon> &nbsp;Add on</ButtonContent>
			case TimeLineTypes.Reward: return  <ButtonContent style={{textTransform: "none"}}><Icon>star</Icon> &nbsp;Add On</ButtonContent>
			case TimeLineTypes.Proposition: return <ButtonContent style={{textTransform: "none"}}>Do It <Icon>arrow_right</Icon></ButtonContent>
			default: return ""
			}
	}

	handleStarButtonClick = () => {
		this.setState({open: !this.state.open})
		setTimeout(() => {
      if(this.state.open) this.rewardInput.current.focus()
      else this.rewardInput.current.blur()
    }, 300)
	}

	render() {
		return (
			<Achievement>
				<FlexRowHeading>
					<IngBox><RoundedImg width="50" height="50" src={this.props.image || DEFAULT_PROFILE_PICTURE} alt=""/></IngBox>
					{this._getHeading(this.props)}
					<Vert>
						<Button style={{minWidth: "10px",width:"5px"}} color="inherit">
							<Icon color="inherit">more_vert</Icon>
						</Button>
					</Vert>
				</FlexRowHeading>
				<FlexRow>
					<Description> {this.props.description} </Description> 
				</FlexRow>
				<FlexRow>
					<RewardBatch>+{this.props.reward}&nbsp;</RewardBatch>
					<HourBatch>1 hour ago</HourBatch>
				</FlexRow>
				<FlexRow>
					<StarButton onClick={this.handleStarButtonClick}>{this._getStarButton(this.props)}</StarButton>
					<TrolloButton colour="inherit">
						<RoundedImg width="25" height="25" src="https://camo.githubusercontent.com/a1397f6a4427587bf9305ac6527a09a41763ce9e/68747470733a2f2f706e672e69636f6e73382e636f6d2f636f6c6f722f313630302f7472656c6c6f"/>
						<span style={{textTransform: "none"}}>&nbsp;Trello</span>
					</TrolloButton>
				</FlexRow>
				<Collapse in={this.state.open}>
					<CollapseFlexRow>
						<Input fullWidth={true} autoFocus={true} placeholder={"+500"}  inputRef={this.rewardInput}/>
						<Button style={{textTransform: "none"}} variant="text" >Go</Button>
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
}

const ButtonContent = styled.div`
	display: flex;
`
const IngBox = styled.div`
	width: 50px;
	height: 50px;
`

const Description = styled.div`
	margin: 5px 0; 
	opacity: 0.7;
`
const TrolloButton = styled(Button)`
	color:#1e88e5 !important;
	background: #f7f7f7 !important;
	width: 120px;
	font-weight: 400;
`

const StarButton = styled(Button)`
	color:#FFF !important;
	background: #1e88e5 !important;
	width: 120px;
	-webkit-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
	-moz-box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
	box-shadow: 0px 0px 4px 0px rgba(33,150,243,1);
`

const Heading = styled.div`
	display: flex;
	padding: 13px;
	opacity: 0.6;
	font-weight: 400;
	width: 100%;
`

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px 10px;
	text-transform: none;
`

const RewardBatch = styled.div`
	width: 120px;
	text-align: left;
	color: #1e88e5;
	font-weight: 600;
`

const HourBatch = styled.div`
	width: 120px;
	font-size: 13px;
	text-align: right;
	padding-right: 4px;
	opacity: 0.6;
`

const FlexRowHeading = styled(FlexRow)`
	height:50px;
`

const RoundedImg = styled.img`
	border-radius: 5px;
`
const Achievement = styled.div`
	font-size: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 5px 0px;
	width: 100%;
	min-height: 160px;
	margin-top: 20px;
	-webkit-box-shadow: 0px 0px 4px -1px #e0e0e0;
	-moz-box-shadow: 0px 0px 4px -1px #e0e0e0;
	box-shadow: 0px 0px 4px -1px #e0e0e0;
`

const Vert = styled.div`
	color:#1e88e5;
`

const CollapseFlexRow = styled(FlexRow)`
	margin-top: 20px;
	background: #f6f6f6;
`

export default TimeLineBox;