var ProductBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadProductsFromServer: function () {

        var jwprostatusvalue = 2;
        if(jwprostatusyes.checked) {
            jwprostatusvalue = 1;
        }
        if(jwprostatusno.checked){
            jwprostatusvalue = 0;
        }
        console.log(jwprostatusvalue);
        $.ajax({
            url: '/getproduct',
            data: {
                'jwproductname': jwproductname.value,
                'jwproductdescription': jwproductdescription.value,
                'jwproductprice': jwproductprice.value,
                'jwinventory': jwinventory.value,
                'jwproductstatus': jwprostatusvalue
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
    updateSingleProductFromServer: function (product) {
        
        $.ajax({
            url: '/updatesingleproduct',
            dataType: 'json',
            data: product,
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
        this.loadProductsFromServer();
       // setInterval(this.loadProductsFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <h1>Update Products</h1>
                <Productform2 onProductSubmit={this.loadProductsFromServer} />
                <br />
                <div id = "theresults">
                    <div id = "theleft">
                    <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Amount In Stock</th>
                                <th>Status</th>
                            </tr>
                         </thead>
                        <ProductList data={this.state.data} />
                    </table>
                    </div>
                    <div id="theright">
                        <ProductUpdateform onUpdateSubmit={this.updateSingleProductFromServer} />
                    </div>                
                </div>
            </div>
        );
    }
});

var Productform2 = React.createClass({
    getInitialState: function () {
        return {
            jwproductkey: "",
            jwproductname: "",
            jwproductdescription: "",
            jwproductprice: "",
            jwinventory: "",
            jwproductstatus: ""
        };
    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadProductTypes: function () {
        $.ajax({
            url: '/getplayertypes',
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
        this.loadProductTypes();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var jwproductname = this.state.jwproductname.trim();
        var jwproductdescription = this.state.jwproductdescription.trim();
        var jwproductprice = this.state.jwproductprice.trim();
        var jwinventory = this.state.jwinventory.trim();
        var jwproductstatus = this.state.selectedOption;
        

        this.props.onProductSubmit({ 
            jwproductname: jwproductname,
            jwproductdescription: jwproductdescription,
            jwproductprice: jwproductprice,
            jwinventory: jwinventory,
            jwproductstatus: jwproductstatus
           

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
                <h2>Products</h2>
                <table>
                    <tbody>
        
                        <tr>
                            <th>Product Name</th>
                            <td>
                                <input name="jwproductname" id="jwproductname" value={this.state.jwproductname} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Description</th>
                            <td>
                                <input type="text" name="jwproductdescription" id="jwproductdescription" value={this.state.jwproductdescription} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Price</th>
                            <td>
                                <input name="jwproductprice" id="jwproductprice" value={this.state.jwproductprice} onChange={this.handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>Product Inventory</th>
                            <td>
                                <input name="jwinventory" id="jwinventory" value={this.state.jwinventory} onChange={this.handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>Product Status</th>
                            <td>
                                <input
                                    type="radio" 
                                    name="jwprostatus" 
                                    id="jwprostatusyes" 
                                    value="1"
                                    checked={this.state.selectedOption === "1"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Active Product
                                <input
                                    type="radio" 
                                    name="jwprostatus" 
                                    id="jwprostatusno" 
                                    value="0"
                                    checked={this.state.selectedOption === "0"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Non-Active Product
                            </td>
                        </tr>

                        
                    </tbody>
                </table>
                <input type="submit" value="Search Product" />

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

var ProductUpdateform = React.createClass({
    getInitialState: function () {
        return {
            upjwproductkey: "",
            upjwproductname: "",
            upjwproductdescription: "",
            upjwproductprice: "",
            upjwinventory: "",
            upjwproductstatus: "",
            upselectedOption: ""
        };
    },
    handleUpOptionChange: function (e) {
        this.setState({
            upselectedOption: e.target.value
        });
    },
    handleUpSubmit: function (e) {
        e.preventDefault();

        var upjwproductkey = upjwprokey.value;
        var upjwproductname = upjwproname.value;
        var upjwproductdescription = upjwprodescription.value;
        var upjwproductprice = upjwproprice.value;
        var upjwinventory = upjwinvent.value;
        var upjwproductstatus = this.state.upselectedOption;

        this.props.onUpdateSubmit({
            upjwproductkey: upjwproductkey,
            upjwproductname: upjwproductname,
            upjwproductdescription: upjwproductdescription,
            upjwproductprice: upjwproductprice,
            upjwinventory: upjwinventory,
            upjwproductstatus: upjwproductstatus
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
        <th>Product Name</th>
        <td>
<input name="upjwproname" id="upjwproname" value={this.state.upjwproname} onChange={this.handleUpChange} />
        </td>
    </tr>

    <tr>
        <th>Product Description</th>
        <td>
<input name="upjwprodescription" id="upjwprodescription" value={this.state.upjwprodescription} onChange={this.handleUpChange} />
        </td>
    </tr>
    <tr>
        <th>Product Price</th>
        <td>
<input name="upjwproprice" id="upjwproprice" value={this.state.upjwproprice} onChange={this.handleUpChange} />
        </td>
    </tr>

    <tr>
        <th>Product Inventory</th>
        <td>
<input name="upjwinvent" id="upjwinvent" value={this.state.upjwinvent} onChange={this.handleUpChange} />
        </td>
    </tr>
    
    <tr>
        <th>
            Product Status
        </th>
        <td>
            <input
                type="radio"
                name="upjwprostatus"
                id="upjwprostatusyes"
                value="1"
                checked={this.state.upselectedOption === "1"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Active
                <input
                type="radio"
                name="upjwprostatus"
                id="upjwprostatusno"
                value="0"
                checked={this.state.upselectedOption === "0"}
                onChange={this.handleUpOptionChange}
                className="form-check-input"
            />Inactive
        </td>
    </tr>

        
</tbody>
                        </table><br />
                        <input type="hidden" name="upjwprokey" id="upjwprokey" onChange={this.handleUpChange} />
                        <input type="submit" value="Update Product" />
                    </form>
                </div>
            </div>
        );
    }
});

var ProductList = React.createClass({
    render: function () {
        var productNodes = this.props.data.map(function (product) {
            return (
                <Product
                    key={product.dbproductkey}
                    jwprokey={product.dbproductkey}
                    jwproname={product.dbproductname}
                    jwprodescription={product.dbproductdescription}
                    jwproprice={product.dbproductprice}
                    jwinvent={product.dbinventory}
                    jwprostatus={product.dbproductstatus}

                >
                </Product>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {productNodes}
            </tbody>
        );
    }
});

var Product = React.createClass({
    getInitialState: function () {
        return {
            upjwprokey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupjwprokey = this.props.jwprokey;
        
        this.loadSingleProduct(theupjwprokey);
    },
    loadSingleProduct: function (theupjwprokey) {
        $.ajax({
            url: '/getsingleproduct',
            data: {
                'upjwprokey': theupjwprokey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateProduct = this.state.singledata.map(function (product) {
                    upjwprokey.value = theupjwprokey;
                    upjwproprice.value = product.dbproductprice;
                    if (product.dbproductstatus == 1) {
                        upjwprostatusyes.checked = true;
                    } else {
                        upjwprostatusno.checked = true;
                    }
    
                    upjwprodescription.value = product.dbproductdescription;
                    upjwproname.value = product.dbproductname;
                    upjwinvent.value = product.dbinventory;

    
                

                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },

    render: function () {
        
        if (this.props.jwprostatus == 1) {
            var thestatus = "Active";
        } else {
            var thestatus = "Inactive";
        }

        return (

            <tr>
                            <td>
                                {this.props.jwprokey} 
                            </td>
                            <td>
                                {this.props.jwproname}
                            </td>
                            <td>
                                {this.props.jwprodescription}
                            </td>
                            <td>
                                {this.props.jwproprice}
                            </td>
                            <td>
                                {this.props.jwinvent}
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
    <ProductBox />,
    document.getElementById('content')
);