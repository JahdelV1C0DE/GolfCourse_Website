var PurchaseBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadPurchaseFromServer: function () {
        //console.log(jwpurstatusvalue);
        var jwpurstatusvalue = 2;
        if(jwpurchasestatusyes.checked) {
            jwpurstatusvalue = 1;
        }
        if(jwpurchasestatusno.checked){
            jwpurstatusvalue = 0;
        }
        console.log(jwpurchasedate.value)
        $.ajax({
            url: '/getpurchase',
            data: {
                'jwpurchaseid': jwpurchaseid.value,
                'jwpurchasedate': jwpurchasedate.value,
                'jwpurchasetotal': jwpurchasetotal.value,
                'jwpurchasestatus': jwpurstatusvalue
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
        this.loadPurchaseFromServer();
       
    },

    render: function () {
        return (
            <div>
                <h1>Purchase Information</h1>
                <Purchaseform2 onPurchaseSubmit={this.loadPurchaseFromServer} />
                <br />
                <table>
                        <thead>
                            <tr>
                                <th>Purchase Key</th>
                                <th>Purchase ID</th>
                                <th>Purchase Date</th>
                                <th>Purchase Total</th>
                                <th>Purchase Status</th>
                                
                            </tr>
                         </thead>
                       <th><PurchaseList data={this.state.data} /></th>
                    </table>
                
            </div>
        );
    }
});

var Purchaseform2 = React.createClass({
    getInitialState: function () {
        return {
            
            jwpurchaseid:"",
            jwpurchasedate: "",
            jwpurchasetotal:"",
            jwpurchasestatus: "",
        };
    },

    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
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
        var jwpurchaseid = this.state.jwpurchaseid.trim();
        var jwpurchasedate = this.state.jwpurchasedate.trim();
        var jwpurchasetotal = this.state.jwpurchasetotal.trim();
        var jwpurchasestatus = this.state.selectedOption;
        

        this.props.onPurchaseSubmit({ 
            jwpurchaseid: jwpurchaseid,
            jwpurchasedate: jwpurchasedate,
            jwpurchasetotal: jwpurchasetotal,
            jwpurchasestatus: jwpurchasestatus, 
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
                <h2>Purchase</h2>
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
                                <input name="jwpurchasedate" id="jwpurchasedate" value={this.state.jwpurchasedate} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Purchase Total</th>
                                
                            <td>
                                <input name="jwpurchasetotal" id="jwpurchasetotal" value={this.state.jwpurchasetotal} onChange={this.handleChange} />
                            </td>
                        </tr>

                    

                        <tr> 
                           <th>Active</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwpurchasestatus"
                                id= "jwpurchasestatusyes" 
                                value= "1"
                                checked = {this.state.selectedOption === "1"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />Active
                            </td>
                            
                        </tr> 

                        <tr> 
                           <th>Not Active</th>
                            <td>
                                <input 
                                type= "radio" 
                                name= "jwpurchasestatus"
                                id= "jwpurchasestatusno" 
                                value= "0"
                                checked = {this.state.selectedOption === "0"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                            />Not Active
                            </td>
                            
                        </tr>



                    </tbody>
                </table>
                <input type="submit" value="Search Purchase" />

            </form>
        );
    }
});




var PurchaseList = React.createClass({
    render: function () {
        var purchaseNodes = this.props.data.map(function (purchase) {
            //map the data to individual donations
            return (
                <Purchase
                    jwpurkey={purchase.dbpurchasekey}
                    jwpid={purchase.dbpurchaseid}
                    jwpdate={purchase.dbpurchasedate}
                    jwptotal={purchase.dbpurchasetotal}
                    jwpurstatus={purchase.dbpurchasestatus}
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

    render: function () {

        if (this.props.jwpurstatus == 1) {
            var thestatus = "Active";
        } else {
            var thestatus = "Inactive";
        }
        //display an individual donation
        return (

            <tr>
                            
                            <td>
                                {this.props.jwpurkey}
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
        

                </tr>
        );
    }
});

/*
var SelectList = React.createClass({
    render: function(){
        var optionNodes = this.props.data.map(function (jwpTypes){
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
            <select name ="jwptype" id = "jwptype">
                <option value = "0"></option>
                {optionNodes}
            </select>
        );
    }
});

*/
ReactDOM.render(
    <PurchaseBox />,
    document.getElementById('content')
);

