var CartBox = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    loadCartFromServer: function () {
       
        $.ajax({
            url: '/getcartc',
            data: {
                'customerkey': cnum.value
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
        this.loadCartFromServer();
    },

    render: function () {
        return (
            <div>
                <h1>View Carts</h1>
                <Cartform onCartSubmit={this.loadCartFromServer} />
                <br />
                <div id="theresults">
                    <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Daily ID</th>
                                <th>Pickup</th>
                                <th>Made</th>
                            </tr>
                        </thead>
                        <CartList data={this.state.data} />
                    </table>
                </div>
            </div>
        );
    }
});

var Cartform = React.createClass({
    getInitialState: function () {
        return {
           CartCust: "",
           data: []
        };
    },
    handleOptionChange: function (e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadCusts: function () {
        $.ajax({
            url: '/getcusts/',
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
        this.loadCusts();
        
    },

    handleSubmit: function (e) {
        //we don't want the form to submit, so we prevent the default behavior
        e.preventDefault();

        
        var CartCust = cnum.value;

        console.log("Cust Num: " + CartCust);
       
        if (!CartCust) {
            return;
        }

        this.props.onCartSubmit({
           
            CartCust: CartCust
        });

    },

    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    validateDollars: function (value) {
        var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
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
            <div>
                <div id="theform">
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                           <tr>
                            <th>
                                Cart Customer
                            </th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>
                        </tr>

                    </tbody>
                </table><br/>
                <input type="submit" value="View Cart" />

                </form>
                </div>
            </div>
        );
    }
});

var CartList = React.createClass({
    render: function () {
        var cartNodes = this.props.data.map(function (cart) {
            return (
                <Cart
                    key={cart.dbcartid}
                    cartid={cart.dbcartid}
                    cartcust={cart.dbcustomername}
                    cartdate={cart.dbcartdate}
                    cartdailyid={cart.dbcartdailyid}
                    cartpickup={cart.dbcartpickup}
                    cartmade={cart.dbcartmade}
                >
                </Cart>
            );

        });

        //print all the nodes in the list
        return (
            <tbody>
                {cartNodes}
            </tbody>
        );
    }
});



var Cart = React.createClass({

    render: function () {

        if (this.props.cartpickup == 1) {
            var thepickup = "YES";
        } else {
            var thepickup = "NO";
        }

        if (this.props.cartmade == 1) {
            var themade = "YES";
        } else {
            var themade = "NO";
        }

        return (

            <tr>
                <td>
                    {this.props.cartid}
                </td>
                <td>
                    {this.props.cartcust}
                </td>
                <td>
                    {this.props.cartdate}
                </td>
                <td>
                    {this.props.cartdailyid}
                </td>
                <td>
                    {thepickup}
                </td>
                <td>
                    {themade}
                </td>
            </tr>
        );
    }
});

var SelectList = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (custID) {
            return (
                <option
                    key={custID.dbcustomerkey}
                    value={custID.dbcustomerkey}
                >
                    {custID.dbcustomerkey} - {custID.dbcustomername} 
                </option>
            );
        });
        return (
            <select name="cnum" id="cnum">
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
    <CartBox />,
    document.getElementById('content')
);

