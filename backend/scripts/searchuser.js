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
                'jwusertype': jwutype.value,
                'jwuserstatus': jwustatusvalue
            },
            
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("Data received:", data); 
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },

    componentDidMount: function () {
        this.loadAllowLogin();
        if (this.state.viewthepage != 0) {
        }
       
    },

    render: function () {
        if (this.state.viewthepage == 1 || this.state.viewthepage != 2) {
            return (
                <div>Current Admin Level Invalid</div>
            );
        } else {
        return (
            <div>
                <h1>User Information</h1>
                <Userform2 onUserSubmit={this.loadUsersFromServer} />
                <br />
                <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Status</th>
                                <th>Admin Level</th>
                                
                            </tr>
                         </thead>

                         <tbody>
                        <UserList data={this.state.data} />
                    </tbody>
                </table>
                <p>Admin LEVEL Menu: </p>
                            <p>0: Employee/Cashier </p>
                            <p>1: Manager/Supervisor</p>
                            <p>2: Admin/IT/Owner</p>
                
            </div>
        );
    }
}
});

var Userform2 = React.createClass({
    getInitialState: function () {
        return {
            jwuserid: "",
            jwusername:"",
            jwuseremail:"",
            //jwuserpassword: "",
            data: [],
            jwuserstatus: ""
        };
    },

    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadUserTypes: function (){
        $.ajax({
            url: '/getusertypes/',
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
    componentDidMount: function () {
        this.loadUserTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwuserid = this.state.jwuserid.trim();
        var jwusername = this.state.jwusername.trim();
        var jwuseremail = this.state.jwuseremail.trim();
        //var jwuserpassword = this.state.jwuserpassword.trim();
       var jwuserstatus = this.state.selectedOption;
        var jwusertype = jwutype.value;
        

        this.props.onUserSubmit({ 
            jwuserid: jwuserid,
            jwusername: jwusername,
            jwuseremail: jwuseremail,
           // jwuserpassword: jwuserpassword,
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
                            <th>User E-Mail</th>
                                
                            <td>
                                <input name="jwuseremail" id="jwuseremail" value={this.state.jwuseremail} onChange={this.handleChange} />
                            </td>
                        </tr>
{/*
                        <tr>
                            <th>User Password</th>
                                
                            <td>
                                <input name="jwuserpassword" id="jwuserpassword" value={this.state.jwuserpassword} onChange={this.handleChange}  />
                            </td>
                        </tr>
        

                {/*
<tr>
    <th>Instructor</th>
    <td>
        <select name="facultyname" id="facultyname" value={this.state.facultyname} onChange={this.handleChange}>
            <SelectList data={this.state.data} />
        </select>
    </td>
</tr>
*/}


        <tr> 
                           <th>Admin Level</th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>    
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
                            />YES
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
                            />NO
                            </td>
                            
                        </tr>

                    </tbody>
                </table>
                <input type="submit" value="Search Users" />

            </form>
        );
    }
});




var UserList = React.createClass({
    render: function () {
        var userNodes = this.props.data.map(function (user) {
            //map the data to individual donations
            return (
                <User
                    jwukey={user.dbuserkey}
                    jwuid={user.dbuserid}
                    jwuname={user.dbusername}
                    jwuemail={user.dbuseremail}
                   // jwupassword={user.dbuserpassworHd}
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

            render: function () {
        
                if (this.props.jwustatus == 1) {
                    var jwstatus = "Active";
                } else {
                    var jwstatus = "Inactive";
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
                            {/*
                            <td>
                                {this.props.jwupassword}
                            </td>
        */}

                            <td>
                                {jwstatus}
                            </td>
    
                            <td>
                                {this.props.jwtype}  
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

ReactDOM.render(
    <UserBox />,
    document.getElementById('content')
);

