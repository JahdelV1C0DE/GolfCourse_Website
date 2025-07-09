var PlayerBox = React.createClass({
    handlePlayerSubmit: function (player) {

        $.ajax({
            url: '/player',
            dataType: 'json',
            type: 'POST',
            data: player,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                window.location.reload(true);
                alert("Player Account Created Successfully.");
            }.bind(this),
            
        });

        {/*
        console.log(jwplayerid.value);
        var jwumembervalue = 2;

        if (jwplayermemberyes.checked) { 
            jwumembervalue = 1;
        }
        if (jwplayermemberno.checked) {
            jwumembervalue = 0;
        }

    */}

    },
    render: function () {
        return (
            <div className="PlayerBox">
                <h1>Players</h1>
                <Playerform2 onPlayerSubmit={this.handlePlayerSubmit}/>
                <a href="/home.html">Return to Home Page</a>
            </div>
        );
    }
});

var Playerform2 = React.createClass({
    getInitialState: function () {
        return {
            jwplayername: "",
            jwplayerphone: "",
            jwplayeremail: "",
            jwplayerpassword: "",
            jwplayerpassword2: "",
            jwplayeremail: "",
           // data: [],
            jwplayermember: "",
            jwplayerstatus: ""
        };

    },

    handleMemberOptionChange: function(e) {
        this.setState({
             memberSelectedOption: e.target.value
        });
    },

    handleStatusOptionChange: function(e) {            
        this.setState({
            statusSelectedOption: e.target.value
            });

        
    },
    /*
    loadPlayerTypes: function (){
        $.ajax({
            url: '/getplayertypes',
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
        this.loadPlayerTypes();
    },
*/
    handleSubmit: function (e) {
        e.preventDefault();
        var jwplayername = this.state.jwplayername.trim();
        var jwplayerphone = this.state.jwplayerphone.trim();
        var jwplayeremail = this.state.jwplayeremail.trim();
        var jwplayerpassword = this.state.jwplayerpassword.trim();
        var jwplayerpassword2 = this.state.jwplayerpassword2.trim();
        var jwplayermember = this.state.memberSelectedOption;
        var jwplayerstatus =this.state.statusSelectedOption;
        
        console.log("password: " + jwplayerpassword);

        
        if (jwplayerpassword != jwplayerpassword2) {
            alert("Passwords do not match.");
            return;
        }
        

        if (!this.validateEmail(jwplayeremail)) {
            alert("Email is not Valid " + this.validateEmail(jwplayeremail));
            return;

        }

        if (!this.validateName(jwplayername)) {
            alert(" " + this.validateName(jwplayername));
            return;

        }

        if (!jwplayername || !jwplayeremail || !jwplayerpassword || !jwplayerstatus || !jwplayermember) {
            alert("You must fill in all fields.");
            return;
        }

        this.props.onPlayerSubmit({
            jwplayername: jwplayername,
            jwplayerphone: jwplayerphone,
            jwplayeremail: jwplayeremail,
            jwplayerpassword: jwplayerpassword,
            //jwplayertype: jwplayertype,
            jwplayermember: jwplayermember,
            jwplayerstatus: jwplayerstatus
            
            
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

    validateName: function (value) {
        var regex = /^[A-Za-z\s]+$/;
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
            <form className="PlayerForm" onSubmit={this.handleSubmit}>
                <h2>New Player</h2>
                <table>
                    <tbody>

                        <tr>
                            <th>Player Name</th>
                            <td>
                <TextInput
                    value={this.state.jwplayername}
                    uniqueName="jwplayername"
                    textArea={false}
                    required={true}
                    minCharacters={2}
                    validate={this.validateName}
                    onChange={this.setValue.bind(this, 'jwplayername')}
                    errorMessage="Name is invalid you cannot have numbers or symbols for the name."
                    emptyMessage="jwplayer Name is required" />
                            </td>
                        </tr>

                        <tr>
                            <th>Player Phone</th>
                            <td>
                <TextInput
                    value={this.state.jwplayerphone}
                    uniqueName="jwplayerphone"
                    textArea={false}
                    required={true}
                    minCharacters={6}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwplayerphone')}
                    errorMessage="Number is invalid"
                    emptyMessage="Number is required" />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>Player E-Mail</th>
                            <td>
              

                <TextInput
                    value={this.state.jwplayeremail}
                    uniqueName="jwplayeremail"
                    textArea={false}
                    required={true}
                    validate={this.validateEmail}
                    onChange={this.setValue.bind(this, 'jwplayeremail')}
                    errorMessage="Invalid E-Mail Address"
                    emptyMessage="E-Mail Address is Required" />
                            </td>
                        </tr>

                        <tr>
                            <th>Player Password</th>
                            <td>
              

                <TextInput
                    value={this.state.jwplayerpassword}
                    uniqueName="jwplayerpassword"
                    textArea={false}
                    required={true}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwplayerpassword')}
                    errorMessage="Invalid Password"
                    emptyMessage="Password is Required" />
                            </td>
                        </tr>

                        <tr>
                            <th>Player Password Confirmation</th>
                            <td>
              

                <TextInput
                    value={this.state.jwplayerpassword2}
                    uniqueName="jwplayerpassword2"
                    textArea={false}
                    required={true}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwplayerpassword2')}
                    errorMessage="Invalid Password"
                    emptyMessage="Password is Required" />
                            </td>
                        </tr>
                        {/*
                         <tr>
                            <th>Player Type</th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>
                        </tr>  
        */}


                                    <tr>
                <th>Become a Member</th>
                <td>
                    <input
                        type="radio" 
                        name="jwplayermember" 
                        id="jwplayermemberyes" 
                        value="1"
                        checked={this.state.memberSelectedOption === "1"}
                        onChange={this.handleMemberOptionChange} 
                        className="form-check-input"
                    />Reward Member
                    <input
                        type="radio" 
                        name="jwplayermember" 
                        id="jwplayermemberno" 
                        value="0"
                        checked={this.state.memberSelectedOption === "0"}
                        onChange={this.handleMemberOptionChange} 
                        className="form-check-input"
                    />Member
                </td>
            </tr>

            <tr>
                <th>Player Status</th>
                <td>
                    <input
                        type="radio" 
                        name="jwplayerstatus" 
                        id="jwplayerstatusyes" 
                        value="1"
                        checked={this.state.statusSelectedOption === "1"}
                        onChange={this.handleStatusOptionChange} 
                        className="form-check-input"
                    />Active
                    <input
                        type="radio" 
                        name="jwplayerstatus" 
                        id="jwplayerstatusno" // Changed to match its value, ensuring uniqueness
                        value="0"
                        checked={this.state.statusSelectedOption === "0"}
                        onChange={this.handleStatusOptionChange} 
                        className="form-check-input"
                    />Inactive
                </td>
            </tr>

        
                    </tbody>
                </table>
                <input type="submit" value="Insert Player" />

                

               
            </form>
        );
    }
});
/*
var SelectList = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (jwpTypes) {
            return (
                <option
                    key={jwpTypes.dbplayertypeid}
                    value={jwpTypes.dbplayertypeid}
                >
                    {jwpTypes.dbplayertypename}
                </option>
            );
        });
        return (
            <select name="jwptype" id="jwptype">
                <option value = "0"></option>
                {optionNodes}
            </select>
        );
    }
});
*/

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
    <PlayerBox />,
    document.getElementById('content')
);
