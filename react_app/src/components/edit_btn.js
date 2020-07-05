import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlateContext from './context'
import TextField from '@material-ui/core/TextField';
import './static/edit_btn.css'
import ValidationMessage from './validation_msg'


class EditBtn extends React.Component {
    static contextType = PlateContext
    constructor(props) {
        super(props);
        this.state = {
            First: '', FirstValid: false,
            Last: '', LastValid: false,
            Numbers: '', NumbersValid: false,
            Letters: '', LettersValid: false,
            formValid: false,
            errorMsg: {},
            open: false,
            plateUnique: true,
        };
    }

    switchModal = () => {
        this.setState({ open: !this.state.open })
    };

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
                list_id: this.props.data.list_id,
                owner_name: `${this.state.First}` + " " + `${this.state.Last}`,
                plate: test_case
            }
            data.editPlate(plate)
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
            <div>
                <Button onClick={this.switchModal} variant="contained">Edit</Button>
                <div>
                    <Dialog open={this.state.open} onClose={this.switchModal} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            <div className="wrapper2">
                                <div className="header2">
                                    <h5>Plate edit</h5>
                                    <h6>Current plate: {this.props.data.plate}</h6>
                                    <h6>Current owner: {this.props.data.owner_name}</h6>
                                </div>
                                <div className="box2-1">
                                    <h6 className="err">< ValidationMessage valid={this.state.FirstValid} message={this.state.errorMsg.First} /></h6>
                                    <TextField id="standard-basic" label="First Name" value={this.state.FirstName} onChange={(e) => this.updateFirst(e.target.value)} name="FirstName" />
                                    <h6>< ValidationMessage valid={this.state.LastValid} message={this.state.errorMsg.Last} /></h6>
                                    <TextField id="standard-basic" label="Last Name" value={this.state.LastName} onChange={(e) => this.updateLast(e.target.value)} name="LastName" />
                                    <br />
                                </div>
                                <div className="box3-2">
                                    <h6>< ValidationMessage valid={this.state.LettersValid} message={this.state.errorMsg.Letters} /></h6>
                                    <TextField id="standard-basic" label="Letters" value={this.state.PlateLetters} onChange={(e) => this.updateLetters(e.target.value)} name="PlateLetters" />
                                    <h6>< ValidationMessage valid={this.state.NumbersValid} message={this.state.errorMsg.Numbers} /></h6>
                                    <TextField id="standard-basic" label="Numbers" value={this.state.PlateNumbers} onChange={(e) => this.updateNumbers(e.target.value)} name="PlateNumbers" />
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.switchModal} color="primary">Cancel</Button>
                            <Button onClick={this.submitPlate} color="primary" autoFocus>Confirm</Button>
                            <br />
                            {this.state.plateUnique ? <label></label> : <label>Plate must be unique</label>}
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default EditBtn;