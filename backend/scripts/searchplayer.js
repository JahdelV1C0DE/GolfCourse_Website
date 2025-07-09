var PlayerBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadPlayersFromServer: function () {
        console.log(jwplayername.value);

        var jwpmembervalue = 2;
        if(jwpmemberyes.checked) {
            jwpmembervalue = 1;
        }
        if(jwpmemberno.checked){
            jwpmembervalue = 0;
        }

        var jwpstatusvalue = 2;
        if(jwpstatusyes.checked) {
            jwpstatusvalue = 1;
        }
        if(jwpstatusno.checked){
            jwpstatusvalue = 0;
        }

        console.log(jwplayername.value)
        $.ajax({
            url: '/getplayer',
            data: {
                'jwplayername': jwplayername.value,
                'jwplayerphone': jwplayerphone.value,
                'jwplayeremail': jwplayeremail.value,
               // 'jwplayerpassword': jwplayerpassword.value,
                'jwplayertype': jwptype.value,
                'jwplayermember': jwpmembervalue,
                'jwplayerstatus': jwpstatusvalue
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
    componentDidMount: function () {
        this.loadPlayersFromServer();
       
    },

    render: function () {
        return (
            <div>
                <h1>Player Information</h1>
                <Playerform2 onPlayerSubmit={this.loadPlayersFromServer} />
                
                <br />
                <table>
                        <thead>
                            <tr>
                                <th>Player Key</th>
                                <th>Player Name</th>
                                <th>Player Phone</th>
                                <th>Player Email</th>
                                <th>Player Member </th>
                                <th>Player Status</th>
                                
                            </tr>
                         </thead>
                       <th><PlayerList data={this.state.data} /></th>
                    </table>
                    <a href="/home.html">Return to Home Page</a>    
            </div>
        );
    }
});

var Playerform2 = React.createClass({
    getInitialState: function () {
        return {
            
            jwplayername:"",
            jwplayerphone: "",
            jwplayeremail:"",
            jwplayerpassword: "",
            data: [],
            jwplayermember: "",
            jwplayerstatus: ""
        };
    },

    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },

    handleStatusOptionChange: function(e) {            
        this.setState({
            statusSelectedOption: e.target.value
            });

        },

    loadPlayerTypes: function (){
        $.ajax({
            url: '/getplayertypes/',
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
        this.loadPlayerTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwplayername = this.state.jwplayername.trim();
        var jwplayerphone = this.state.jwplayerphone.trim();
        var jwplayeremail = this.state.jwplayeremail.trim();
        //var jwplayerpassword = this.state.jwplayerpassword.trim();
        var jwplayertype = jwptype.value;
        var jwplayermember = this.state.selectedOption;
        var jwplayerstatus = this.state.statusSelectedOption;
        

        this.props.onPlayerSubmit({ 
            jwplayername: jwplayername,
            jwplayerphone: jwplayerphone,
            jwplayeremail: jwplayeremail,
           // jwplayerpassword: jwplayerpassword,
            jwplayertype: jwplayertype,
            jwplayermember: jwplayermember,
            jwplayerstatus: jwplayerstatus 
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
                <h2>Players</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Player Name</th>
                                
                            <td>
                                <input name="jwplayername" id="jwplayername" value={this.state.jwplayername} onChange={this.handleChange}  />
                            </td>
                        </tr>

                        <tr>
                            <th>Player Phone</th>
                                
                            <td>
                                <input name="jwplayerphone" id="jwplayerphone" value={this.state.jwplayerphone} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Player E-Mail</th>
                                
                            <td>
                                <input name="jwplayeremail" id="jwplayeremail" value={this.state.jwplayeremail} onChange={this.handleChange} />
                            </td>
                        </tr>
{/*
                        <tr>
                            <th>Player Password</th>
                                
                            <td>
                                <input name="jwplayerpassword" id="jwplayerpassword" value={this.state.jwplayerpassword} onChange={this.handleChange}  />
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
                           <th>Become a Reward Member</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwpmember"
                                id= "jwpmemberyes" 
                                value= "1"
                                checked = {this.state.selectedOption === "1"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />YES
                            </td>
                            
                        </tr> 

                        <tr> 
                           <th>Regular Member</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwpmember"
                                id= "jwpmemberno" 
                                value= "0"
                                checked = {this.state.selectedOption === "0"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />NO
                            </td>
                            
                        </tr>

                        <tr> 
    <th>Player Status</th>
    <td>
        <input 
            type= "radio" 
            name= "jwpstatus"
            id= "jwpstatusyes" 
            value= "1"
            checked = {this.state.statusSelectedOption === "1"}
            onChange = {this.handleStatusOptionChange}
            className = "form-check-input"
        />Active
    </td>                        
</tr> 

<tr> 
    <th>Player Status</th>
    <td>
        <input 
            type= "radio" 
            name= "jwpstatus"
            id= "jwpstatusno" 
            value= "0"
            checked = {this.state.statusSelectedOption === "0"}
            onChange = {this.handleStatusOptionChange}
            className = "form-check-input"
        />Inactive
    </td>                        
</tr>

        <tr> 
                           <th>Player Type</th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>    
                        </tr> 




                    </tbody>
                </table>
                <input type="submit" value="Search Players" />

            </form>
        );
    }
});




var PlayerList = React.createClass({
    render: function () {
        var playerNodes = this.props.data.map(function (player) {
            //map the data to individual donations
            return (
                <Player
                    jwpkey={player.dbplayerkey}
                    jwpname={player.dbplayername}
                    jwpphone={player.dbplayerphone}
                    jwpemail={player.dbplayeremail}
                   // jwppassword={player.dbplayerpassword}
                    
                    jwpmember={player.dbplayermember}
                    jwpstatus={player.dbplayerstatus}
                >
                </Player>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {playerNodes}
            </tbody>
        );
    }
});



var Player = React.createClass({

    render: function () {

        if (this.props.jwpmember == 1) {
            var themember = "YES";
        } else {
            var themember = "NO";
        }
        
        if (this.props.jwpstatus == 1) {
            var thestatus = "Active";
        } else {
            var thestatus = "Inactive";
        }
        return (

            <tr>
                            
                            <td>
                                {this.props.jwpkey}
                            </td>
        
                            <td>
                                {this.props.jwpname}
                            </td>
                            <td>
                                {this.props.jwpphone}
                            </td>
                            <td>
                                {this.props.jwpemail}
                            </td>
                            

                            <td>
                                {themember}
                            </td>

                            <td>
                                {thestatus}
                            </td>
        

                </tr>
        );
    }
});



ReactDOM.render(
    <PlayerBox />,
    document.getElementById('content')
);

