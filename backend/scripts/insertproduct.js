var ProductBox = React.createClass({
    
    handleProductSubmit: function (product) {

        $.ajax({
            url: '/product',
            dataType: 'json',
            type: 'POST',
            data: product,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                window.location.reload(true);
                alert("Product added to Inventory Successfully.");
            }.bind(this),
            
            });



    },
    render: function () {
        return (
            <div className="ProductBox">
                <h1>New Product</h1>
                <ProductForm2 onProductSubmit={this.handleProductSubmit}/>
                <a href="/home.html">Return to Home Page</a>
            </div>
        );
    }
});

var ProductForm2 = React.createClass({
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


        if (!this.validateProductPrice(jwproductprice)) {
           console.log("BA D EMAIL " + this.validateProductPrice(jwproductprice));
            return;

        }

        this.props.onProductSubmit({
            jwproductname: jwproductname,
            jwproductdescription: jwproductdescription,
            jwproductprice: jwproductprice,
            jwinventory: jwinventory,
            jwproductstatus: jwproductstatus,

        });

    },

    commonValidate: function () {
        return true;
    },

    

    //validation for product price
    validateProductPrice: function (value) {
        const decimalPattern = /^[+-]?(\d+\.\d+|\.\d+)$/;
        
    
        if (!decimalPattern.test(value)) {
            const priceError = "Please enter a valid decimal number for the product price.";
            this.setState({ validateError: priceError });
            return false;
        }
        return true;
    },

    validateName: function(value) {
        const namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    
        if (!namePattern.test(value)) {
            const nameError = "Please enter a valid name containing only letters.";
            this.setState({ validateError: nameError });
            return false;
        }
        return true;
    },
    
    
    
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render: function () {

        return (
            <form className="ProductForm" onSubmit={this.handleSubmit}>
                
                <table>
                    <tbody>
                    




                        <tr>
                            <th>Product Name </th>
                            <td>
                <TextInput
                    value={this.state.jwproductname}
                    uniqueName="jwproductname"
                    textArea={false}
                    required={true}
                    minCharacters={2}
                    validate={this.validateName}
                    onChange={this.setValue.bind(this, 'jwproductname')}
                    errorMessage="Product Name MUST not contain Numbers."
                    emptyMessage="Enter a Product Name" />
                            </td>
                        </tr>


                        <tr>
                            <th>Product Description</th>
                            <td>
                <TextInput
                    value={this.state.jwproductdescription}
                    uniqueName="jwproductdescription"
                    textArea={false}
                    required={true}
                    minCharacters={6}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'jwproductdescription')}
                    errorMessage="Not a Valid Name"
                    emptyMessage="Enter a Email Member Name" />
                            </td>
                        </tr>

                        <tr>
                            <th>Product Price</th>
                            <td>
                <TextInput
                    value={this.state.jwproductprice}
                    uniqueName="jwproductprice"
                    textArea={false}
                    required={true}
                    minCharacters={3}
                    validate={this.validateProductPrice}
                    onChange={this.setValue.bind(this, 'jwproductprice')}
                    errorMessage="Not a Valid Name"
                    emptyMessage="Enter a Price for the Product" />
                            </td>
                        </tr>

                        
                        <tr>
                            <th>Amount in Stock</th>
                            <td>
                                <TextInput
                                    value={this.state.jwinventory}
                                    uniqueName="jwinventory"
                                    textArea={false}
                                    required={true}
                                    minCharacters={1}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'jwinventory')}
                                    errorMessage="Not a Valid Stock Number"
                                    emptyMessage="EMPTY FIELD" />
                                            </td>
                                        </tr>

                            
                                        <tr>
                            <th>Active Product</th>
                            <td>
                                <input
                                    type="radio" 
                                    name="jwproductstatus" 
                                    id="jwproductstatusyes" 
                                    value="1"
                                    checked={this.state.selectedOption === "1"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Active Product
                                <input
                                    type="radio" 
                                    name="jwproductstatus" 
                                    id="jwproductstatusno" 
                                    value="0"
                                    checked={this.state.selectedOption === "0"}
                                    onChange={this.handleOptionChange} 
                                    className="form-check-input"
                                />Non-Active Product
                            </td>
                        </tr>



                        


                        
                    </tbody>
                </table>

                <input type="submit" value="Insert Product" />

            </form>
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
    <ProductBox />,
    document.getElementById('content')
);
