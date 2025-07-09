var ProductBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadProductFromServer: function () {
        console.log(jwproductname.value);
    
        var jwprostatusvalue = 2;
        if(jwprostatusyes.checked) {
            jwprostatusvalue = 1;
        }
        if(jwprostatusno.checked){
            jwprostatusvalue = 0;
        }
    
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
    componentDidMount: function () {
        this.loadProductFromServer();
       
    },

    render: function () {
        return (
            <div>
                <h1>Product Information</h1>
                <Productform2 onProductSubmit={this.loadProductFromServer} />
                <br />
                <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Product Name</th>
                                <th>Product Description</th>
                                <th>Product Price</th>
                                <th>Amount in Stock</th>
                                <th>Product Status</th> 
                            </tr>
                         </thead>
                         <ProductList data={this.state.data}/>

                    </table>
                
            </div>
        );
    }
});

var Productform2 = React.createClass({
    getInitialState: function () {
        return {
            jwproductname: "",
            jwproductdescription: "",
            jwproductprice: "",
            jwinventory: "",
            jwproductstatus: "",
            
        };
    },

    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
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
            <form onSubmit={this.handleSubmit}>
                <h2>Search Product</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name</th>
                                
                            <td>
                                <input type="text" name="jwproductname" id="jwproductname" value={this.state.jwproductname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Product Description</th>
                                
                            <td>
                                <input type="text" name="jwproductdescription" id="jwproductdescription" value={this.state.jwproductdescription} onChange={this.handleChange}  />
                            </td>
                        </tr>

                        <tr>
                            <th>Product Price</th>
                                
                            <td>
                                <input type="text" name="jwproductprice" id="jwproductprice" value={this.state.jwproductprice} onChange={this.handleChange}  />
                            </td>
                        </tr>


                        <tr>
                            <th>Amount in Stock</th>
                                
                            <td>
                                <input type="text" name="jwinventory" id="jwinventory" value={this.state.jwinventory} onChange={this.handleChange}  />
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
        );
    }
});




var ProductList = React.createClass({
    render: function () {
        var productNodes = this.props.data.map(function (product) {
            //map the data to individual donations
            return (
                <Product
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

    render: function () {
        
        if(this.props.jwprostatus === 1) {
            var thestatus = "Active";
        } else {
            thestatus = "Not Active";
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
        

                </tr>
        );
    }
});





ReactDOM.render(
    <ProductBox />,
    document.getElementById('content')
);

