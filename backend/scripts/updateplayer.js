var PlayerBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadPlayersFromServer: function () {

        var jwpmembervalue = 2;
        if (jwpmemberyes.checked) {
            jwpmembervalue = 1;
        } 
        if (jwpmemberno.checked) {
            jwpmembervalue = 0;
        }

        var jwpstatusvalue = 2;
        if(jwpstatusyes.checked) {
            jwpstatusvalue = 1;
        }
        if(jwpstatusno.checked){
            jwpstatusvalue = 0;
        }
        console.log(jwpmembervalue);
        $.ajax({
            url: '/getplayerup',
            data: {
                'jwplayername': jwplayername.value,
                'jwplayerphone': jwplayerphone.value,
                'jwplayeremail': jwplayeremail.value,
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
    updateSinglePlayerFromServer: function (player) {
        
        $.ajax({
            url: '/updatesingleplayer',
            dataType: 'json',
            data: player,
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
    },
    componentDidMount: function () {
        this.loadPlayersFromServer();
       // setInterval(this.loadPlayersFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <h1>Update Players</h1>
                <Playerform2 onPlayerSubmit={this.loadPlayersFromServer} />
                <br />
                <div id = "theresults">
                    <div id = "theleft">
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
                        <PlayerList data={this.state.data} />
                    </table>
                    </div>
                    <div id="theright">
                        <PlayerUpdateform onUpdateSubmit={this.updateSinglePlayerFromServer} />
                    </div>                
                </div>
            </div>
        );
    }
});

var Playerform2 = React.createClass({
    getInitialState: function () {
        return {
            jwplayerkey: "",
            jwplayername: "",
            jwplayerphone: "",
            jwplayeremail: "",
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

    handleSubmit: function (e) {
        e.preventDefault();
        var jwplayername = this.state.jwplayername.trim();
        var jwplayerphone = this.state.jwplayerphone.trim();
        var jwplayeremail = this.state.jwplayeremail.trim();
        
        var jwplayermember = this.state.selectedOption;
        var jwplayerstatus = this.state.statusSelectedOption;

        this.props.onPlayerSubmit({ 
            jwplayername: jwplayername,
            jwplayerphone: jwplayerphone,
            jwplayeremail: jwplayeremail,
            
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
        <div>
            <div id = "theform">
            <form onSubmit={this.handleSubmit}>
                <h2></h2>
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
                                <input type="text" name="jwplayerphone" id="jwplayerphone" value={this.state.jwplayerphone} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Player Email</th>
                            <td>
                                <input name="jwplayeremail" id="jwplayeremail" value={this.state.jwplayeremail} onChange={this.handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>Join Member List</th>
                            <td>
                                <input 
                                    type = "radio"
                                    name = "jwpmember"
                                    id = "jwpmemberyes"
                                    value = "1"
                                    checked = {this.state.selectedOption === "1"}
                                    onChange ={this.handleOptionChange}
                                    className = "form-check-input"
                                /> YES
                                <input 
                                    type = "radio"
                                    name = "jwpmember"
                                    id = "jwpmemberno"
                                    value = "0"
                                    checked = {this.state.selectedOption === "0"}
                                    onChange ={this.handleOptionChange}
                                    className = "form-check-input"
                                /> NO
                            </td>
                        </tr>

                        <tr>
                            <th>Player Status</th>
                            <td>
                                <input 
                                    type = "radio"
                                    name = "jwpstatus"
                                    id = "jwpstatusyes"
                                    value = "1"
                                    checked = {this.state.statusSelectedOption === "1"}
                                    onChange ={this.handleStatusOptionChange}
                                    className = "form-check-input"
                                /> Active
                                <input 
                                    type = "radio"
                                    name = "jwpstatus"
                                    id = "jwpstatusno"
                                    value = "0"
                                    checked = {this.state.statusSelectedOption === "0"}
                                    onChange ={this.handleStatusOptionChange}
                                    className = "form-check-input"
                                /> Not Active
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <input type="submit" value="Search Player" />

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

var PlayerUpdateform = React.createClass({
    getInitialState: function () {
        return {
            upjwplayerkey: "",
            upjwplayername: "",
            upjwplayerphone: "",
            upjwplayeremail: "",
            upjwplayermember: "",
            upselectedOption: "",
            upjwplayerstatus: "",
            upstatusselectedOption: ""
        };
    },
    handleUpOptionChange: function (e) {
        this.setState({
            upselectedOption: e.target.value
        });
    },

    handleUpStatusOptionChange: function(e) {            
        this.setState({
            upstatusSelectedOption: e.target.value
            });
        },
    handleUpSubmit: function (e) {
        e.preventDefault();

        var upjwplayerkey = upjwpkey.value;
        var upjwplayername = upjwpname.value;
        var upjwplayerphone = upjwpphone.value;
        var upjwplayeremail = upjwpemail.value;
        
        var upjwplayermember = this.state.upselectedOption;
        var upjwplayerstatus = this.state.upstatusSelectedOption;

        this.props.onUpdateSubmit({
            upjwplayerkey: upjwplayerkey,
            upjwplayername: upjwplayername,
            upjwplayerphone: upjwplayerphone,
            upjwplayeremail: upjwplayeremail,
            
            upjwplayermember: upjwplayermember,
            upjwplayerstatus: upjwplayerstatus
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
        <th>Player Name</th>
        <td>
<input name="upjwpname" id="upjwpname" value={this.state.upjwpname} onChange={this.handleUpChange} />
        </td>
    </tr>

    <tr>
        <th>Player Phone</th>
        <td>
<input name="upjwpphone" id="upjwpphone" value={this.state.upjwpphone} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>Player Email</th>
        <td>
<input name="upjwpemail" id="upjwpemail" value={this.state.upjwpemail} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>
            Join Member List
        </th>
        <td>
            <input
                type="radio"
                name="upjwpmember"
                id="upjwpmemberyes"
                value="1"
                checked={this.state.upselectedOption === "1"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Yes
                <input
                type="radio"
                name="upjwpmember"
                id="upjwpmemberno"
                value="0"
                checked={this.state.upselectedOption === "0"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />No
        </td>
    </tr>

    <tr>
        <th>
            Player Status
        </th>
        <td>
            <input
                type="radio"
                name="upjwpstatus"
                id="upjwpstatusyes"
                value="1"
                checked={this.state.upstatusSelectedOption === "1"}
                onChange={this.handleUpStatusOptionChange}
                className="form-check-input"
            />Active
                <input
                type="radio"
                name="upjwpstatus"
                id="upjwpstatusno"
                value="0"
                checked={this.state.upstatusSelectedOption === "0"}
                onChange={this.handleUpStatusOptionChange}
                className="form-check-input"
            />Not Active
        </td>
    </tr>
    <tr>
        
    </tr>
</tbody>
                        </table><br />
                        <input type="hidden" name="upjwpkey" id="upjwpkey" onChange={this.handleUpChange} />
                        <input type="submit" value="Update Player" />
                    </form>
                </div>
            </div>
        );
    }
});

var PlayerList = React.createClass({
    render: function () {
        var playerNodes = this.props.data.map(function (player) {
            return (
                <Player
                    key={player.dbplayerkey}
                    jwpkey={player.dbplayerkey}
                    jwpname={player.dbplayername}
                    jwpphone={player.dbplayerphone}
                    jwpemail={player.dbplayeremail}
                    
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
    getInitialState: function () {
        return {
            upjwpkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupjwpkey = this.props.jwpkey;
        
        this.loadSinglePlayer(theupjwpkey);
    },
    loadSinglePlayer: function (theupjwpkey) {
        $.ajax({
            url: '/getsingleplayer',
            data: {
                'upjwpkey': theupjwpkey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populatePlayer = this.state.singledata.map(function (player) {
                    upjwpkey.value = theupjwpkey;
                    upjwpemail.value = player.dbplayeremail;
    
                    upjwpphone.value = player.dbplayerphone;
                    upjwpname.value = player.dbplayername;
                    if (player.dbplayermember == 1) {
                        upjwpmemberyes.checked = true;
                    } else {
                        upjwpmemberno.checked = true;
                    }
                    if (player.dbplayerstatus == 1) {
                        upjwpstatusyes.checked = true;
                    } else {
                        upjwpstatusno.checked = true;
                    }

                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },

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
            
                            <td>
                                <form onSubmit={this.updateRecord}>
                                    <input type="submit" value="Update Record" />
                                </form>
                            </td>
                </tr>
        );
    }
});



ReactDOM.render(
    <PlayerBox />,
    document.getElementById('content')
);