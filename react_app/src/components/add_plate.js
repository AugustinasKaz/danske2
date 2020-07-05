import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import PlateContext from './context'
import './static/add_plate.css'
import ValidationMessage from './validation_msg'



class AddPlate extends React.Component {
    static contextType = PlateContext
    state = {
        First: '', FirstValid: false,
        Last: '', LastValid: false,
        Numbers: '', NumbersValid: false,
        Letters: '', LettersValid: false,
        formValid: false,
        plateUnique: true,
        errorMsg: {}
    }

    submitPlate = () => {
        const test_case = `${this.state.Letters.toUpperCase()}` + ":" + `${this.state.Numbers}`
        const data = this.context;
        const platesList = []
        data.plates.forEach(el => platesList.push(el.plate))
        const found = platesList.find(el => el === test_case);
        if (found !== undefined)
            this.setState({ plateUnique: false })
        else {
            let plate = {
                list_id: null,
                owner_name: `${this.state.First}` + " " + `${this.state.Last}`,
                plate: test_case
            }
            data.addPlate(plate)
            this.setState({ plateUnique: true })
        }
    }

    validateForm = () => {
        const { FirstValid, LastValid, NumbersValid, LettersValid } = this.state;
        this.setState({
            formValid: FirstValid && LastValid && NumbersValid && LettersValid
        })
    }

    updateFirst = (First) => {
        this.setState({ First }, this.validateFirst)
    }

    validateFirst = () => {
        const { First } = this.state;
        let FirstValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (First.length < 3) {
            FirstValid = false;
            errorMsg.First = 'Must be at least 3 characters long'
        }

        this.setState({ FirstValid, errorMsg }, this.validateForm)
    }

    updateLast = (Last) => {
        this.setState({ Last }, this.validateLast)
    }

    validateLast = () => {
        const { Last } = this.state;
        let LastValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (Last.length < 3) {
            LastValid = false;
            errorMsg.Last = 'Must be at least 3 characters long'
        }

        this.setState({ LastValid, errorMsg }, this.validateForm)
    }

    updateNumbers = (Numbers) => {
        this.setState({ Numbers }, this.validateNumbers);
    }

    validateNumbers = () => {
        const { Numbers } = this.state;
        let NumbersValid = true;
        let errorMsg = { ...this.state.errorMsg }
        let regex = /^[0-9]+$/;

        if (Numbers.length !== 3) {
            NumbersValid = false;
            errorMsg.Numbers = 'Must be 3 characters long';
        } else if (!Numbers.match(regex)) {
            NumbersValid = false;
            errorMsg.Numbers = 'Must contain only numeric values';
        }
        this.setState({ NumbersValid, errorMsg }, this.validateForm);
    }

    updateLetters = (Letters) => {
        this.setState({ Letters }, this.validateLetters)
    }

    validateLetters = () => {
        const { Letters } = this.state;
        let LettersValid = true;
        let errorMsg = { ...this.state.errorMsg }

        if (Letters.length !== 3) {
            LettersValid = false;
            errorMsg.Letters = 'Must be 3 characters long';
        }
        else if (!/^[a-z]+$/i.test(Letters)) {
            LettersValid = false;
            errorMsg.Letters = 'Must contain only non-numeric values';
        }

        this.setState({ LettersValid, errorMsg }, this.validateForm);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="header1-1">
                    <h2>Add new plate</h2>
                </div>
                <div className="box1-1">
                    <label>Information about owner</label>
                    <br />
                    < ValidationMessage valid={this.state.FirstValid} message={this.state.errorMsg.First} />
                    <TextField id="standard-basic" label="First Name" value={this.state.FirstName} onChange={(e) => this.updateFirst(e.target.value)} name="FirstName" />
                    < ValidationMessage valid={this.state.LastValid} message={this.state.errorMsg.Last} />
                    <TextField id="standard-basic" label="Last Name" value={this.state.LastName} onChange={(e) => this.updateLast(e.target.value)} name="LastName" />
                </div>
                <div className="box2-2">
                    <label>Plate Information</label>
                    <br />
                    < ValidationMessage valid={this.state.LettersValid} message={this.state.errorMsg.Letters} />
                    <TextField id="standard-basic" label="Letters" value={this.state.PlateLetters} onChange={(e) => this.updateLetters(e.target.value)} name="PlateLetters" />
                    < ValidationMessage valid={this.state.NumbersValid} message={this.state.errorMsg.Numbers} />
                    <TextField id="standard-basic" label="Numbers" value={this.state.PlateNumbers} onChange={(e) => this.updateNumbers(e.target.value)} name="PlateNumbers" />
                </div>
                <div className="box3-3">
                    <label></label>
                    <br />
                    <Button onClick={this.submitPlate} variant="contained" color="primary" disabled={!this.state.formValid}>Submit</Button>
                    <br/>
                    {this.state.plateUnique ? <label></label> : <label>Plate must be unique</label>}
                </div>

            </div>
        );
    }
}

export default AddPlate;