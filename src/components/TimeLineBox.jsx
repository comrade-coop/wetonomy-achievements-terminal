import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import { Button, Collapse, Input } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Trello  from '../assets/trello-brands.svg'

export const DEFAULT_PROFILE_PICTURE = "https://www.chsbuffalo.org/sites/default/files/styles/crop_230x230/public/default_images/profile-default_0.jpg?itok=DTiAzsNA"

export const TimeLineTypes= {
	Achievement: 1,
	Reward: 2,
	Proposition: 3
}

const RewardRow = (props) =>{
  console.log(props)
  const theme = useTheme();
  const lightColor = theme.palette.primary.light;
  return props.rewards.map((element, index) => 
			<CollapseFlexRow key={index}>
				<Reward style={{background: lightColor, height:"35px"}}>+{element.reward}</Reward>
          <ImgBox><RoundedImg width="35" height="35" src={element.image || DEFAULT_PROFILE_PICTURE} alt=""/></ImgBox>
        <Heading style={{height:"35px"}}>{element.comment}</Heading>
			</CollapseFlexRow>
		)
    
}

// const alo = () => {
//   const theme = useTheme();
//   return theme.palette.primary.light;
// }

class TimeLineBox extends Component {

	constructor(props){
		super(props)
		this.rewardInput = React.createRef();
		this.state = {open: false, textInput: ""}
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

	_getStarButton = (props) => {
		switch(props.type)
		{
			case TimeLineTypes.Achievement: return   <ButtonContent style={{textTransform: "none"}}><Icon>star_border</Icon> &nbsp;Add on</ButtonContent>
			case TimeLineTypes.Reward: return  <ButtonContent style={{textTransform: "none"}}><Icon>star</Icon> &nbsp;Add On</ButtonContent>
			case TimeLineTypes.Proposition: return <ButtonContent style={{textTransform: "none"}}>Do It <Icon>arrow_right</Icon></ButtonContent>
			default: return ""
			}
	}

	handleStarButtonClick = () => {
		this.setState({open: !this.state.open})
  }
  
  handleChange = (event) => {
    this.setState({textInput: event.target.value});
  }

  onInputFocus = () => {
    if(this.state.textInput==="")
      this.setState({textInput: "+"});
  }

	handleAddReward = () => {
    console.log(this.rewardInput)
		this.props.addReward({
			reward: parseInt(this.state.textInput),
			address: this.props.address
    })
    
    setTimeout(() => {
			this.setState({textInput: ""});
		}, 200)
	}

	render() {
		return (
			<Achievement>
				<FlexRowHeading>
					<Reward>+{this.props.reward}</Reward>
					<ImgBox><RoundedImg width="40" height="40" src={this.props.image || DEFAULT_PROFILE_PICTURE} alt=""/></ImgBox>
					{/* {this._getHeading(this.props)} */}
					<Heading>{this.props.name}</Heading>
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
						<i className="fab fa-trello"></i>

						{/* <img  width="20" height="20" src={Trello} alt="" /> */}
						<span style={{textTransform: "none"}}>&nbsp;Trello</span>
					</Button>
				</FlexRow>
				<Collapse in={this.state.open}>
					<RewardRow rewards={this.props.rewardsList}/>
					<CollapseFlexRow>
            <Input fullWidth={true} autoFocus={false}
                placeholder={"+500"}
                value={this.state.textInput}
                onChange={this.handleChange} 
                onFocus={ this.onInputFocus}
								disableUnderline={true}/>
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
  background: #e9b3ca;
  min-width: 40px;
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