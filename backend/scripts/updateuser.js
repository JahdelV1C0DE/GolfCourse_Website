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
    loadUsersFromServer: function () {

        var jwustatusvalue = 2;
        if(jwuserstatusyes.checked) {
            jwustatusvalue = 1;
        }
        if(jwuserstatusno.checked){
            jwustatusvalue = 0;
        }
        $.ajax({
            url: '/getuser',
            data: {
                'jwuserid': jwuserid.value,
                'jwusername': jwusername.value,
                'jwuseremail': jwuseremail.value,
               // 'jwuserpassword': jwuserpassword.value,
                'jwusertype': jwutype.value,
                'jwuserstatus': jwustatusvalue
            },
            
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },
    updateSingleUserFromServer: function (user) {
        
        $.ajax({
            url: '/updatesingleuser',
            dataType: 'json',
            data: user,
            type: 'POST',
            cache: false,
            success: function (upsingledata) {
                this.setState({ upsingledata: upsingledata });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        window.location.reload(true);
        alert("Your Data has Been Updated Sucessfully.")
    },
    componentDidMount: function () {
        this.loadAllowLogin();
        if (this.state.viewthepage != 0) {
            this.loadUsersFromServer();
        }
       
    },

    render: function () {
        if (this.state.viewthepage < 1) {
            return (
                <div>NOT A HIGH ENOUGH ADMIN PRIVILEGE</div>
            );
        } else {
        return (
            <div>
                <h1>Update Users Based on Search</h1>
                <Userform2 onUserSubmit={this.loadUsersFromServer} />
                <br />
                <div id = "theresults">
                    <div id = "theleft">
                    <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin Level</th>
                                <th>Active Status</th>
                            </tr>
                         </thead>
                        <UserList data={this.state.data} />
                    </table>
                    </div>
                    <div id="theright">
                        <UserUpdateform onUpdateSubmit={this.updateSingleUserFromServer} />
                    </div>                
                </div>
            </div>
        );
    }
}
});

var Userform2 = React.createClass({
    getInitialState: function () {
        return {
            jwuserkey: "",
            jwuserid: "",
            jwusername: "",
            jwuseremail: "",
            data: [],
            jwuserstatus: ""
        };
    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadUserTypes: function () {
        $.ajax({
            url: '/getusertypes',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadUserTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();

        var jwuserid = this.state.jwuserid.trim();
        var jwuseremail = this.state.jwuseremail.trim();
        var jwusername = this.state.jwusername.trim();
        //var jwuserpassword = this.state.jwuserpassword.trim();
        var jwusertype = jwutype.value;
        var jwuserstatus = this.state.selectedOption;

        this.props.onUserSubmit({ 
            jwuserid: jwuserid,
            jwusername: jwusername,
            jwuseremail: jwuseremail,
          //  jwuserpassword: jwuserpassword,
            jwusertype: jwusertype,
            jwuserstatus: jwuserstatus
        });

    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {

        return (
        <div>
            <div id = "theform">
            <form onSubmit={this.handleSubmit}>
                <h2>Users</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>User ID</th>
                            <td>
                                <input type="text" name="jwuserid" id="jwuserid" value={this.state.jwuserid} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>User Name</th>
                            <td>
                                <input name="jwusername" id="jwusername" value={this.state.jwusername} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>User Email</th>
                            <td>
                                <input name="jwuseremail" id="jwuseremail" value={this.state.jwuseremail} onChange={this.handleChange} />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>User Type</th>
                            <td><SelectList data = {this.state.data} /></td>
                        </tr>



                        <tr> 
                           <th>Active User</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwuserstatus"
                                id= "jwuserstatusyes" 
                                value= "1"
                                checked = {this.state.selectedOption === "1"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />Active
                            </td>
                            
                        </tr> 

                        <tr> 
                           <th>Active User</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwuserstatus"
                                id= "jwuserstatusno" 
                                value= "0"
                                checked = {this.state.selectedOption === "0"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />Inactive
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Search User" />

            </form>
            </div>
            <div>
                    <br />
                    <form onSubmit={this.getInitialState}>
                        <input type="submit" value="Clear Form" />
                    </form>
            </div>
        </div>
        );
    }
});

var UserUpdateform = React.createClass({
    getInitialState: function () {
        return {
            upjwuserkey: "",
            upjwuserid: "",
            upjwusername: "",
            upjwuseremail: "",
            updata: [],
            upjwuserstatus: "",
            upselectedOption: ""
        };
    },
    handleUpOptionChange: function (e) {
        this.setState({
            upselectedOption: e.target.value
        });
    },
    loadUserTypes: function () {
        $.ajax({
            url: '/getusertypes',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ updata: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadUserTypes();

    },
    handleUpSubmit: function (e) {
        e.preventDefault();

        var upjwuserkey = upjwukey.value;
        var upjwuserid = upjwuid.value;
        var upjwusername = upjwuname.value;
        var upjwuseremail = upjwuemail.value;
        var upjwusertype = upjwutype.value;
        var upjwuserstatus = this.state.upselectedOption;

        this.props.onUpdateSubmit({
            upjwuserkey: upjwuserkey,
            upjwuserid: upjwuserid,
            upjwusername: upjwusername,
            upjwuseremail: upjwuseremail,
            upjwusertype: upjwusertype,
            upjwuserstatus: upjwuserstatus
        });
    },
    handleUpChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {

        return (
            <div>
                <div id="theform">
                    <form onSubmit={this.handleUpSubmit}>

                        <table>
                            <tbody>
    <tr>
        <th>User ID</th>
        <td>
<input type="text" name="upjwuid" id="upjwuid" value={this.state.upjwuid} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>User Name</th>
        <td>
<input name="upjwuname" id="upjwuname" value={this.state.upjwuname} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>User Email</th>
        <td>
<input name="upjwuemail" id="upjwuemail" value={this.state.upjwuemail} onChange={this.handleUpChange} />
        </td>
    </tr>
    
    <tr>
        <th>
            User Type
        </th>
        <td>
            <SelectUpdateList data={this.state.updata} />
        </td>
    </tr>

                        <tr> 
                           <th>Active User</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "upjwuserstatus"
                                id= "upjwuserstatusyes" 
                                value= "1"
                                checked = {this.state.upselectedOption === "1"}
                                onChange = {this.handleUpOptionChange}
                                className = "form-check-input"
                            />Active
                            </td>
                            
                        </tr> 

                        <tr> 
                           <th>Active User</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "upjwuserstatus"
                                id= "upjwuserstatusno" 
                                value= "0"
                                checked = {this.state.upselectedOption === "0"}
                                onChange = {this.handleUpOptionChange}
                                className = "form-check-input"
                            />Inactive
                            </td>
                            
                        </tr>
</tbody>
                        </table><br />
                        <input type="hidden" name="upjwukey" id="upjwukey" onChange={this.handleUpChange} />
                        <input type="submit" value="Update User" />
                    </form>
                </div>
            </div>
        );
    }
});

var UserList = React.createClass({
    render: function () {
        var userNodes = this.props.data.map(function (user) {
            return (
                <User
                    key={user.dbuserkey}
                    jwukey={user.dbuserkey}
                    jwuid={user.dbuserid}
                    jwuname={user.dbusername}
                    jwuemail={user.dbuseremail}
                    jwtype={user.dbusertype}
                    jwustatus={user.dbuserstatus}
                    
                    
                >
                </User>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {userNodes}
            </tbody>
        );
    }
});

var User = React.createClass({
    getInitialState: function () {
        return {
            upjwukey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupjwukey = this.props.jwukey;
        
        this.loadSingleUser(theupjwukey);
    },
    loadSingleUser: function (theupjwukey) {
        $.ajax({
            url: '/getsingleuser',
            data: {
                'upjwukey': theupjwukey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateUser = this.state.singledata.map(function (user) {
                    upjwukey.value = theupjwukey;
                    upjwuemail.value = user.dbuseremail;
                    upjwuid.value = user.dbuserid;
                    upjwuname.value = user.dbusername;
                    if (user.dbuserstatus == 1) {
                        upjwuserstatusyes.checked = true;
                    } else {
                        upjwuserstatusno.checked = true;
                    }
                    upjwutype.value = user.dbusertype;

                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },

    render: function () {
        
        if (this.props.jwuserstatus == 1) {
            var thestatus = "Active";
        } else {
            var thestatus = "Inactive";
        }

        return (

            <tr>
                            <td>
                                {this.props.jwukey} 
                            </td>
                            <td>
                                {this.props.jwuid}
                            </td>
                            <td>
                                {this.props.jwuname}
                            </td>
                            <td>
                                {this.props.jwuemail}
                            </td>
                            <td>
                                {this.props.jwtype}
                            </td>

                            <td>
                                {thestatus}
                            </td>
                            <td>
                                <form onSubmit={this.updateRecord}>
                                    <input type="submit" value="Update Record" />
                                </form>
                            </td>
                </tr>
        );
    }
});

var SelectList = React.createClass({
    render: function(){
        var optionNodes = this.props.data.map(function (jwuTypes){
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
            <select name ="jwutype" id = "jwutype">
                <option value = "0"></option>
                {optionNodes}
            </select>
        );
    }
});

var SelectUpdateList = React.createClass({
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
            <select name="upjwutype" id="upjwutype">
                <option value="0"></option>
                {optionNodes}
            </select>
        );
    }
});

ReactDOM.render(
    <UserBox />,
    document.getElementById('content')
);