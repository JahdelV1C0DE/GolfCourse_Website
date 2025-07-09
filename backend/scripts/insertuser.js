var UserBox = React.createClass({
    getInitialState: function () {
        return { data: [],
                 viewthepage: 0 };
    },
    loadAllowLogin: function () {
        $.ajax({
            url: '/getloggedin',
            dataType: 'json',
            cache: false,
            success: function (datalog) {
                this.setState({ data: datalog });
                this.setState({ viewthepage: this.state.data[0].dbusertype });
                console.log("Logged in:" + this.state.viewthepage);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleUserSubmit: function (user) {

        $.ajax({
            url: '/user',
            dataType: 'json',
            type: 'POST',
            data: user,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                window.location.reload(true);
                alert("User/Admin Account Created Successfully.");
            }.bind(this),
            
        });

    
    },

    componentDidMount: function () {
        this.loadAllowLogin();
        if (this.state.viewthepage != 0) {
        }
       
    },
    render: function () {
        if (this.state.viewthepage ==0 ) {
            return (
                <div>Current Admin Level Invalid</div>
            );
        } else {
        return (
            <div className="UserBox">
                <h1>Create New Admin Account</h1>
                <Userform2 onUserSubmit={this.handleUserSubmit}/>
                <a href="/home.html">Return to Home Page</a>
            </div>
        );
    }
}
});

var Userform2 = React.createClass({
    getInitialState: function () {
        return {
            jwuserid: "",
            jwusername: "",
            jwuserpassword: "",
            jwuserpassword2: "",
            jwuseremail: "",
            jwuserstatus: "",
            data: []
        };

    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadUserTypes: function (){
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
        this.loadUserTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwuserid = this.state.jwuserid.trim();
        var jwusername = this.state.jwusername.trim();
        var jwuseremail = this.state.jwuseremail.trim();
        var jwuserpassword = this.state.jwuserpassword.trim();
        var jwuserpassword2 = this.state.jwuserpassword2.trim();
        var jwusertype = jwutype.value;
        var jwuserstatus = this.state.selectedOption;
        console.log("password: " + jwuserpassword);

        
       // if (jwuserpassword != jwuserpassword2) {
         //   alert("Passwords do not match.");
           // return;
        //}
        

        if (!this.validateEmail(jwuseremail)) {
            console.log("BA D EMAIL " + this.validateEmail(jwuseremail));
            return;

        }


        if (!jwusername || !jwuseremail || !jwuserid || !jwuserpassword || !jwusertype) {
            console.log("Field Missing");
            return;
        }
        

        this.props.onUserSubmit({
            jwuserid: jwuserid,
            jwusername: jwusername,
            jwuseremail: jwuseremail,
            jwuserpassword: jwuserpassword,
            jwusertype: jwusertype,
            jwuserstatus: jwuserstatus
            
        });

    
    },

    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    validateID: function(value) {
        var regex = /^[0-9]+$/;
        return regex.test(value);
    },
    validatePassword: function(password) {
        var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
        return regex.test(password);
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
            <form className="UserForm" onSubmit={this.handleSubmit}>
                <table>
                    <tbody>


                    <tr>
                            <th>User ID</th>
                            <td>
                <TextInput
                    value={this.state.jwuserid}
                    uniqueName="jwuserid"
                    textArea={false}
                    required={true}
                    minCharacters={3}
                    validate={this.validateID}
                    onChange={this.setValue.bind(this, 'jwuserid')}
                    errorMessage="User ID Must be a minimal of 3 numbers no letters."
                    emptyMessage="User ID is required" />
                            </td>
                        </tr>
                        <tr>
                            <th>User Name</th>
                            <td>
                <TextInput
                    value={this.state.jwusername}
                    uniqueName="jwusername"
                    textArea={false}
                    required={true}
                    minCharacters={3}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwusername')}
                    errorMessage="Name is invalid MUST contain only letters"
                    emptyMessage="Name is required" />
                            </td>
                        </tr>
                        
                        
                        <tr>
                            <th>User E-Mail</th>
                            <td>
              

                <TextInput
                    value={this.state.jwuseremail}
                    uniqueName="jwuseremail"
                    textArea={false}
                    required={true}
                    minCharacters={10}
                    validate={this.validateEmail}
                    onChange={this.setValue.bind(this, 'jwuseremail')}
                    errorMessage="Invalid E-Mail Address"
                    emptyMessage="E-Mail Address is Required" />
                            </td>
                        </tr>

                        <tr>
                            <th>User Password</th>
                            <td>
              

                <TextInput
                    value={this.state.jwuserpassword}
                    uniqueName="jwuserpassword"
                    textArea={false}
                    required={true}
                    minCharacters={7}
                    validate={this.validatePassword}
                    onChange={this.setValue.bind(this, 'jwuserpassword')}
                    errorMessage="Invalid Password MUST be at least 7 characters"
                    emptyMessage="Password is Required" />
                            </td>
                        </tr>

                        <tr>
                            <th>User Password Confirmation</th>
                            <td>
              

                <TextInput
                    value={this.state.jwuserpassword2}
                    uniqueName="jwuserpassword2"
                    textArea={false}
                    required={true}
                    minCharacters={7}
                    validate={this.validatePassword}
                    onChange={this.setValue.bind(this, 'jwuserpassword2')}
                    errorMessage="Invalid Password MUST match first password field."
                    emptyMessage="Password is Required" />
                            </td>
                        </tr>
                        
                         <tr>
                            <th>Admin Level Status</th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>
                        </tr>  



                        <tr>
                            <th>Active (Employee Version)</th>
                            <td>
                                <input
                                    type="radio" 
                                    name="jwuserstatus" 
                                    id="jwuserstatusyes" 
                                    value="1"
                                    checked={this.state.selectedOption === "1"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Active User
                                <input
                                    type="radio" 
                                    name="jwuserstatus" 
                                    id="jwuserstatusno" 
                                    value="0"
                                    checked={this.state.selectedOption === "0"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Non-Active User
                            </td>
                        </tr>
        
                    </tbody>
                </table>
                <input type="submit" value="Insert User" />
                

               
            </form>
        );
    }
});

var SelectList = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (jwuTypes) {
            return (
                <option
                    key={jwuTypes.dbusertypeid}
                    value={jwuTypes.dbusertypeid}
                >
                    {jwuTypes.dbusertypename}
                </option>
            );
        });
        return (
            <select name="jwutype" id="jwutype">
                <option value = "0"></option>
                {optionNodes}
            </select>
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
    <UserBox />,
    document.getElementById('content')
);
