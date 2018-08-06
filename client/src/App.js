import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'
import creditCardType, {getTypeInfo, types as CardType} from 'credit-card-type'
import glamorous from 'glamorous'
// import {Div} from './styles/elements'

const Div = glamorous.div({
	borderRadius: '10px',
	boxShadow: '2px 2px 1px #000',
	width: '400px',
	height: '250px',
	margin: '100px auto',
	fontFamily: 'sans-serif',
	position: 'relative'},
	(props) => ({
		backgroundColor: background(props.type),
		border: borderColor(props.val) //bg color based on the type of credit card. border based on if card isValid===true
	}))

const borderColor = (e) => {
	if (e === false) {
		return '5px solid red'
	}	else {
		return '5px solid green'
	}
}

const background = (type) => {
	switch(type) {
		case 'Visa':
			return 'rgba(25,73,146)'
		case 'American Express':
			return 'rgb(137,187,160)'
		case 'Diners Club':
			return 'rgb(186,200,203)'
		case 'Discover':
			return 'rgb(128,54,62)'
		case 'JCB':
			return 'rgb(211,168,109)'
		case 'Maestro':
			return 'rgba(0,0,255,0.7)'
		case 'Mastercard':
			return 'rgb(27,48,76)'
		case 'UnionPay':
			return 'red'
		case 'Mir':
			return 'orange'
		default:
			return 'silver'
	} //background colors for each type of card
}
class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		memberName: '',
		secNumber: '',
		secType: '',
		secSize: '',
		cardLogo: '',
		cardType: '',
		isValid: false
	} //set initial state values



handleCardNumberChange = ({target}) => {
	if (this.state.cardType === 'American Express') {
		this.setState({
				[target.name]: target.value.replace(/[^\dA-z]/g, '').replace(/(.{4})?(.{6}?)/g, '$1 $2 ').trim()
		}) //remove any non-digits from the card. add spaces after 4th digit and 10th digit
	} else {
		this.setState({
				[target.name]: target.value.replace(/[^\dA-z]/g, '').replace(/(.{4}?)/g, '$1 ').trim()
		}) //remove non-digits and add spaces at every 4th digit
	}
	var numberValidation = valid.number(target.value) //card-validator checks target value to verify
		if (!numberValidation.isPotentiallyValid) {
			console.log('invalid number')
			this.setState({
				cardType: '',
				cardLogo: require('./assets/oni.png'), //default error logo
				isValid: false
		}) //card style to display error image when  the number is invalid
	}

		else if (numberValidation.card) { //get card name, type of CVV and length of CVV
			console.log(numberValidation.card.niceType)
			this.setState({
				cardType: (numberValidation.card.niceType),
				isValid: true,
				secType: (numberValidation.card.code.name),
				secSize: (numberValidation.card.code.size)
		})
			if (this.state.cardType === 'Visa') {
				this.setState({
						cardLogo: require('./assets/visa.png')
				})
			} 	else if (this.state.cardType === 'American Express') {
				this.setState({
						cardLogo: require('./assets/amex.png')
				})
			}	 else if (this.state.cardType === 'Diners Club') {
				this.setState({
						cardLogo: require('./assets/diners.png')
				})
			}	 else if (this.state.cardType === 'Discover') {
				this.setState({
						cardLogo: require('./assets/discover.png')
				})
			}	 else if (this.state.cardType === 'JCB') {
				this.setState({
						cardLogo: require('./assets/jcb.svg')
				})
			} 	else if (this.state.cardType === 'Maestro') {
				this.setState({
						cardLogo: require('./assets/maestro.png')
				})
			}	else if (this.state.cardType === 'Mastercard') {
					this.setState({
						cardLogo: require('./assets/mastercard.png')
				})
			}	else if (this.state.cardType === 'UnionPay') {
					this.setState({
						cardLogo: require('./assets/union.svg')
					})
			}	else if (this.state.cardType === 'Mir') {
					this.setState({
						cardLogo: require('./assets/mir.png')
					}) //logos for each type of card
				}
			}
		}

		handleExpMonthChange = ({target}) => {
			this.setState({
				[target.name]: target.value
			})
			var checkMonth = valid.expirationMonth(target.value)

			if (!checkMonth.isPotentiallyValid) {
				console.log('invalid month')
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.png')
				})
			}
			else if (checkMonth.card) {
				console.log('valid month')
				this.setState({
					expMonth: target.value,
					isValid: true
				})
			}
		}

		handleExpYearChange = ({target}) => {
			this.setState({
				[target.name]: target.value
			})
			var checkYear = valid.expirationYear(target.value)

			if (!checkYear.isPotentiallyValid) {
				console.log('invalid year')
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.png')
				})
			}
			else if (checkYear.card) {
				console.log('valid year')
				this.setState({
					expYear: target.value,
					isValid: true
				})
			}
		}
		
		handleSecNumberChange = ({target}) => {
			this.setState({
				[target.name]: target.value
			})
			var checkSecNumber = valid.cvv(target.value)

			if (!checkSecNumber.isPotentiallyValid) {
				console.log('invalid cvv')
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.png')
				})
			} 
			else if(checkSecNumber.card) {
				console.log('valid cvv')
				this.setState({
					secNumber: target.value,
					isValid: true
				})
			}
		}

		handleChange = ({target}) => {
			this.setState({
				[target.name]: target.value
			})
		}

		handleSubmit = (e) => {
			e.preventDefault()
			if(this.state.isValid === true && this.state.memberName.length > 1) {
				console.log('card is valid')
				return(this.state) //check all parameters and if all are valid allow submission

			}else {
				console.log('card is not valid')
			} //alert user if something is missing or incorrect
		} 

  render() {
    return (
      <div className="grandeContainer">
      	<Div className="front" type={this.state.cardType} val={this.state.isValid}> {/*glamorous border and background depending on isValid*/}
        <h1><span>Your</span>Bank</h1>
        <form id="form" onSubmit={this.handleSubmit}>
        	<div className="numberContainer">
	        	<input value={this.state.cardNumber}
	        		 name="cardNumber" 
	        		 type="tel" 
	        		 className="numInput"
	        		 onKeyUp={this.handleCardNumberChange}
	        		 onChange={this.handleChange} 
	        		 maxLength='19'/>
	        </div>
	        <div className="expContainer">
	        	<p>Exp:</p>
	        	<input value={this.state.expMonth}
	        		 name="expMonth"
	        		 type="tel" 
	        		 className="exp" 
	        		 onKeyUp={this.handleExpMonthChange}
	        		 onChange={this.handleChange}
	        		 placeholder="MM"
	        		 maxLength="2"/>
    	    	<input value={this.state.expYear} 
    	    		name="expYear" 
    	    		type="tel" 
    	    		className="exp year" 
    	    		onKeyUp={this.handleExpYearChange}
    	    		onChange={this.handleChange}
    	    		placeholder="YYYY"
    	    		maxLength="4" />
    	    </div>
    	    <div className="userContainer">
	        	<input value={this.state.memberName}
	        		 name="memberName" 
	        		 type="text" 
	        		 className="user" 
	        		 onChange={this.handleChange}
	        		 placeholder="Name as it appears on card" />
	        	<img src={this.state.cardLogo} id="logo" />
	        </div>
	        <button id="submit" type="submit">Submit</button>
        </form>
        </Div>
        <Div className="back" type={this.state.cardType} val={this.state.isValid}>
        	<p className="magStrip"></p>
        	<p className="signHere">
				<input value={this.state.secNumber}
					name="secNumber"
					type="tel"
					className="security"
					onKeyUp={this.state.handleSecNumberChange}
					onChange={this.handleChange}
					placeholder={this.state.secType}
					maxLength={this.state.secSize}/>
        	</p>
        </Div>
        </div>
    )
  }
}

export default App
