var PurchaseBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadPurchaseFromServer: function () {

        var jwpurstatusvalue = 2;
        if(jwpurchasestatusyes.checked) {
            jwpurstatusvalue = 1;
        }
        if(jwpurchasestatusno.checked){
            jwpurstatusvalue = 0;
        }
        console.log(jwpurstatusvalue);
        $.ajax({
            url: '/getpurchase',
            data: {
                'jwpurchaseid': jwpurchaseid.value,
                'jwpurchasedate': jwpurchasedate.value,
                'jwpurchasetotal': jwpurchasetotal.value,
                'jwpurchasestatus': jwpurstatusvalue,
                
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
    updateSinglePurchaseFromServer: function (purchase) {
        
        $.ajax({
            url: '/updatesinglepurchase',
            dataType: 'json',
            data: purchase,
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
        this.loadPurchaseFromServer();
       // setInterval(this.loadPurchaseFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <h1>Update Purchase</h1>
                <Purchaseform2 onPurchaseSubmit={this.loadPurchaseFromServer} />
                <br />
                <div id = "theresults">
                    <div id = "theleft">
                    <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Purchase Status</th>
                                <th></th>
                            </tr>
                         </thead>
                        <PurchaseList data={this.state.data} />
                    </table>
                    </div>
                    <div id="theright">
                        <PurchaseUpdateform onUpdateSubmit={this.updateSinglePurchaseFromServer} />
                    </div>                
                </div>
            </div>
        );
    }
});

var Purchaseform2 = React.createClass({
    getInitialState: function () {
        return {
            jwpurchasekey: "",
            jwpurchaseid: "",
            jwpurchasedate: "",
            jwpurchasetotal: "",
            jwpurchasestatus: "",
        };
    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwpurchaseid = this.state.jwpurchaseid.trim();
        var jwpurchasedate = this.state.jwpurchasedate.trim();
        var jwpurchasetotal = this.state.jwpurchasetotal.trim();
        var jwpurchasestatus = this.state.selectedOption;

        this.props.onPurchaseSubmit({ 
            jwpurchaseid: jwpurchaseid,
            jwpurchasedate: jwpurchasedate,
            jwpurchasetotal: jwpurchasetotal,
            jwpurchasestatus: jwpurchasestatus

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
                            <th>Purchase ID</th>
                            <td>
                                <input name="jwpurchaseid" id="jwpurchaseid" value={this.state.jwpurchaseid} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Purchase Date</th>
                            <td>
                                <input type="text" name="jwpurchasedate" id="jwpurchasedate" value={this.state.jwpurchasedate} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Purchase Total</th>
                            <td>
                                <input name="jwpurchasetotal" id="jwpurchasetotal" value={this.state.jwpurchasetotal} onChange={this.handleChange} />
                            </td>
                        </tr>

                        <tr>
        <th>
            Product Status
        </th>
        <td>
            <input
                type="radio"
                name="jwpurchasestatus"
                id="jwpurchasestatusyes"
                value="1"
                checked={this.state.selectedOption === "1"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Active
                <input
                type="radio"
                name="jwpurchasestatus"
                id="jwpurchasestatusno"
                value="0"
                checked={this.state.selectedOption === "0"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Not Active
        </td>
    </tr>
                        
                    </tbody>
                </table>
                <input type="submit" value="Search Purchase" />

            </form>
            </div>
            <div>
                    <br />
                    <form onSubmit={this.getInitialState}>
                        <input type="submit" value="Clear Form" class="small-button" />
                    </form>
            </div>
        </div>
        );
    }
});

var PurchaseUpdateform = React.createClass({
    getInitialState: function () {
        return {
            upjwpurchasekey: "",
            upjwpurchaseid: "",
            upjwpurchasedate: "",
            upjwpurchasetotal: "",
            upjwpurchasestatus: "",
            upselectedOption: "",
        };
    },
    handleUpOptionChange: function (e) {
        this.setState({
            upselectedOption: e.target.value
        });
    },
    handleUpSubmit: function (e) {
        e.preventDefault();

        var upjwpurchasekey = upjwpkey.value;
        var upjwpurchaseid = upjwpid.value;
        var upjwpurchasedate = upjwpdate.value;
        var upjwpurchasetotal = upjwptotal.value;
        var upjwpurchasestatus = this.state.upselectedOption;


        this.props.onUpdateSubmit({
            upjwpurchasekey: upjwpurchasekey,
            upjwpurchaseid: upjwpurchaseid,
            upjwpurchasedate: upjwpurchasedate,
            upjwpurchasetotal: upjwpurchasetotal,
            upjwpurchasestatus: upjwpurchasestatus
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
        <th>Purchase ID</th>
        <td>
<input name="upjwpid" id="upjwpid" value={this.state.upjwpid} onChange={this.handleUpChange} />
        </td>
    </tr>

    <tr>
        <th>Purchase Date</th>
        <td>
<input name="upjwpdate" id="upjwpdate" value={this.state.upjwpdate} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>Purchase Total</th>
        <td>
<input name="upjwptotal" id="upjwptotal" value={this.state.upjwptotal} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>
            Product Status
        </th>
        <td>
            <input
                type="radio"
                name="upjwpurchasestatus"
                id="upjwpurchasestatusyes"
                value="1"
                checked={this.state.upselectedOption === "1"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Active
                <input
                type="radio"
                name="upjwpurchasestatus"
                id="upjwpurchasestatusno"
                value="0"
                checked={this.state.upselectedOption === "0"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Not Active
        </td>
    </tr>
    
</tbody>
                        </table><br />
                        <input type="hidden" name="upjwpkey" id="upjwpkey" onChange={this.handleUpChange} />
                        <input type="submit" value="Update Purchase" />
                    </form>
                </div>
            </div>
        );
    }
});

var PurchaseList = React.createClass({
    render: function () {
        var purchaseNodes = this.props.data.map(function (purchase) {
            return (
                <Purchase
                    key={purchase.dbpurchasekey}
                    jwpkey={purchase.dbpurchasekey}
                    jwpid={purchase.dbpurchaseid}
                    jwpdate={purchase.dbpurchasedate}
                    jwptotal={purchase.dbpurchasetotal}
                    jwpstatus={purchase.dbpurchasestatus}

                >
                </Purchase>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {purchaseNodes}
            </tbody>
        );
    }
});

var Purchase = React.createClass({
    getInitialState: function () {
        return {
            upjwpkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupjwpkey = this.props.jwpkey;
        
        this.loadSinglePurchase(theupjwpkey);
    },
    loadSinglePurchase: function (theupjwpkey) {
        $.ajax({
            url: '/getsinglepurchase',
            data: {
                'upjwpkey': theupjwpkey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populatePurchase = this.state.singledata.map(function (purchase) {
                    upjwpkey.value = theupjwpkey;
                    upjwptotal.value = purchase.dbpurchasetotal;
    
                    upjwpdate.value = purchase.dbpurchasedate;
                    upjwpid.value = purchase.dbpurchaseid;
                    if (purchase.dbpurchasestatus == 1) {
                        upjwpurchasestatusyes.checked = true;
                    } else {
                        upjwpurchasestatusno.checked = true;
                    }
                    

                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },

    render: function () {
        
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
                                {this.props.jwpid}
                            </td>
                            <td>
                                {this.props.jwpdate}
                            </td>
                            <td>
                                {this.props.jwptotal}
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
    <PurchaseBox />,
    document.getElementById('content')
);