import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'
import creditCardType, {getTypeInfo, types as CardType} from 'credit-card-type'



class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		memberName: '',
		secNumber: '',
		secType: '',
		cardLogo: '',
		cardType: '',
		isValid: true,
		isFlipped: false
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
	const numberValidation = valid.number(target.value) //card-validator checks target value to verify
		if (!numberValidation.isPotentiallyValid) {
			this.setState({
				cardType: '',
				cardLogo: require('./assets/oni.svg'), //default error logo
				isValid: false
		}) //card style to display error image when  the number is invalid
	}

		if (numberValidation.card) {
			this.setState({
				cardType: (numberValidation.card.niceType),
				isValid: true,
				secType: (numberValidation.card.code.name)
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
					})
				}
			}
		}

		handleExpMonthChange = ({target}) => {
			this.setState({
				[target.name]: target.value.replace(/ |\//g, ''),
			})
			const checkMonth = valid.expirationMonth(target.value)

			if (!checkMonth.isPotentiallyValid) {
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.svg')
				})
			}
			if (checkMonth.card) {
				this.setState({
					expMonth: target.value,
					isValid: true
				})
			}
		}

		handleExpYearChange = ({target}) => {
			this.setState({
				[target.name]: target.value.replace(/ |\//g, ''),
			})
			const checkYear = valid.expirationYear(target.value)

			if (!checkYear.isPotentiallyValid) {
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.svg')
				})
			}
			if (checkYear.card) {
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
			const checkSecNumber = valid.cvv(target.value)

			if (!checkSecNumber.isPotentiallyValid) {
				this.setState({
					isValid: false,
					cardLogo: require('./assets/oni.svg')
				})
			}
			if(checkSecNumber.card) {
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
			if(this.state.expMonth.isValid === true && this.state.memberName.length > 1) {
				return(this.state) //check all parameters and if all are valid allow submission

			}else {
				alert("Something is not right. Please check again")
			} //alert user if something is missing or incorrect
		} 

  render() {
    return (
      <div className="grandeContainer">
      <button className="flipButton">Don't forget the back of the card</button>
      	<div className="flipper">
      	<div className="front cardContainer">
        <h1><span>Your</span>Bank</h1>
        <form id="form" onSubmit={this.handleSubmit}>
        	<div className="numberContainer">
	        	<input value={this.state.cardNumber}
	        		 name="cardNumber" 
	        		 type="tel" 
	        		 className="numInput"
	        		 onKeyUp={this.handleCardNumberChange}
	        		 onChange={this.handleChange} 
	        		 maxlength='19'/>
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
	        		 maxlength="2"/>
    	    	<input value={this.state.expYear} 
    	    		name="expYear" 
    	    		type="tel" 
    	    		className="exp" 
    	    		onKeyUp={this.handleExpYearChange}
    	    		onChange={this.handleChange}
    	    		placeholder="YY"
    	    		maxlength="4" />
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
        </div>
        <div className="back cardContainer">
        	<p className="magStrip"></p>
        	<p className="signHere">
				<input value={this.state.secNumber}
					name="secNumber"
					type="tel"
					className="security"
					onKeyUp={this.state.handleSecNumberChange}
					onChange={this.handleChange}
					placeholder="CVV"
					maxlength="4" />
        	</p>
        </div>
        </div>
      </div>
    )
  }
}

export default App
