var PurchaseBox = React.createClass({
    handlePurchaseSubmit: function (user) {

        $.ajax({
            url: '/purchase',
            dataType: 'json',
            type: 'POST',
            data: user,
            success: function (data) {
                this.setState({ data: data });
                
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                window.location.reload(true);
                alert("Purchase Has been Submitted Please see Cashier in Pro Shop.");
            }.bind(this),
            
        });
/*
        {
        console.log(jwpurchaseid.value);
        var jwpurchasestatusvalue = 2;

        if (jwpurchasestatusyes.checked) { 
            jwpurchasestatusvalue = 1;
        }
        if (jwpurchasestausno.checked) {
            jwpurchasestatusvalue = 0;
        }

    }
*/
    },
    render: function () {
        return (
            <div className="PurchaseBox">
                <h1>Post the Purchase</h1>
                <Purchaseform2 onPurchaseSubmit={this.handlePurchaseSubmit}/>
            </div>
        );
    }
});

var Purchaseform2 = React.createClass({
    getInitialState: function () {
        return {
            jwpurchaseid: "",
            jwpurchasedate: "",
            jwpurchasetotal: "",
            jwpurchasestatus: ""
        };

    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadPurchaseTypes: function (){
        $.ajax({
            url: '/getusertypes',
            dataType: 'json',
            cache: false, 
            success: function (data) {
                this.setState({ data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadPurchaseTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwpurchaseid = this.state.jwpurchaseid.trim();
        var jwpurchasedate = this.state.jwpurchasedate.trim();
        var jwpurchasetotal = this.state.jwpurchasetotal.trim();
       var jwpurchasestatus = this.state.selectedOption;
        

       


        if (!jwpurchaseid || !jwpurchasetotal || !jwpurchasestatus || !jwpurchasedate) {
            console.log("Field Missing");
            return;
        }

        this.props.onPurchaseSubmit({
            jwpurchaseid: jwpurchaseid,
            jwpurchasedate: jwpurchasedate,
            jwpurchasetotal: jwpurchasetotal,
            jwpurchasestatus: jwpurchasestatus
            
        });

    
    },

    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    validateDollars: function (value) {
        var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
    },
    commonValidate: function () {
        return true;
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render: function () {

        return (
            <form className="PurchaseForm" onSubmit={this.handleSubmit}>
                <h2>--------------------------------------</h2>
                <table>
                    <tbody>


                    <tr>
                            <th>Purchaser Name</th>
                            <td>
                <TextInput
                    value={this.state.jwpurchaseid}
                    uniqueName="jwpurchaseid"
                    textArea={false}
                    required={true}
                    minCharacters={2}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwpurchaseid')}
                    errorMessage="Purchase ID is invalid"
                    emptyMessage="Purchase ID is required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Purchase Date</th>
                            <td>
                                <input
                                    type="date"
                                    value={this.state.jwpurchasedate}
                                    uniqueName="jwpurchasedate"
                                    required={true}
                                    onChange={this.setValue.bind(this, 'jwpurchasedate')}
                                />
                            </td>
                        </tr>
                        
                        
                       

                        <tr>
                            <th>Purchase Total</th>
                            <td>
              

                <TextInput
                    value={this.state.jwpurchasetotal}
                    uniqueName="jwpurchasetotal"
                    textArea={false}
                    required={true}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwpurchasetotal')}
                    errorMessage=""
                    emptyMessage="You must enter the total" />
                            </td>
                        </tr>

            
              


                        <tr>
                            <th>Active</th>
                            <td>
                                <input
                                    type="radio" 
                                    name="jwpurchasestatus" 
                                    id="jwpurchasestatusyes" 
                                    value="1"
                                    checked={this.state.selectedOption === "1"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Active
                                <input
                                    type="radio" 
                                    name="jwpurchasestatus" 
                                    id="jwpurchasestatusno" 
                                    value="0"
                                    checked={this.state.selectedOption === "0"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Inactive
                            </td>
                        </tr>
        
                    </tbody>
                </table>
                <input type="submit" value="Insert Purchase" />
                

               
            </form>
        );
    }
});


var InputError = React.createClass({
    getInitialState: function () {
        return {
            message: 'Input is invalid'
        };
    },
    render: function () {
        var errorClass = classNames(this.props.className, {
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });

        return (
                <td> {this.props.errorMessage} </td>
        )
    }
});

var TextInput = React.createClass({
    getInitialState: function () {
        return {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "",
            errorVisible: false
        };
    },

    handleChange: function (event) {
        this.validation(event.target.value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    validation: function (value, valid) {
        if (typeof valid === 'undefined') {
            valid = true;
        }

        var message = "";
        var errorVisible = false;

        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        else if (this.props.required && jQuery.isEmptyObject(value)) {
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        }
        else if (value.length < this.props.minCharacters) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });

    },

    handleBlur: function (event) {
        var valid = this.props.validate(event.target.value);
        this.validation(event.target.value, valid);
    },
    render: function () {
        if (this.props.textArea) {
            return (
                <div className={this.props.uniqueName}>
                    <textarea
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        } else {
            return (
                <div className={this.props.uniqueName}>
                    <input
                        type={this.props.inputType}
                        name={this.props.uniqueName}
                        id={this.props.uniqueName}
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        }
    }
});







ReactDOM.render(
    <PurchaseBox />,
    document.getElementById('content')
);
