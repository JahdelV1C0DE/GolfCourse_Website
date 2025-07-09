var ReservationBox = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      viewthepage: 0,
      playerName: "",
    };
  },
  loadAllowLogin: function () {
    $.ajax({
      url: '/getplayerlogin',
      dataType: 'json',
      cache: false,
      success: function (datalog) {

        this.setState({
          data: datalog,
          viewthepage: datalog[0].dbplayerkey,

          playerName: datalog[0].dbplayername
        });
        // this.setState({ data: datalog });
        // this.setState({ viewthepage: this.state.data[0].dbplayerkey });
        console.log("Logged in:" + this.state.viewthepage);
      }.bind(this),

      error: function (xhr, status, err) {
      }.bind(this)

    });
    console.log("Logged in:" + this.state.viewthepage);
  },
  handleReservationSubmit: function (reservation) {

    $.ajax({
      url: '/reservation',
      dataType: 'json',
      type: 'POST',
      data: reservation,
      success: function (data) {
        this.setState({ datat: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        window.location.reload(true);
        alert("Player Reservation Created Successfully.");
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadAllowLogin();
    // if (this.state.viewthepage != 0) {
    // }

  },

  render: function () {
    if (this.state.viewthepage === 0) {
      return (
        <div>Current Admin Level Invalid</div>
      );
    } else {
      return (
        <div className="ReservationBox">
          <h1>Create a Reservation</h1>
          <Reservationform2 onReservationSubmit={this.handleReservationSubmit} playerName={this.state.playerName} viewthepage={this.state.viewthepage} />
        </div>
      );
    }
  }
});



var Reservationform2 = React.createClass({
  getInitialState: function () {
    return {
      jwreservationdate: "",
      jwreservationtime: "",
      jwreservationdatetime: "",
      jwreservationstatus: "",
      jwreservationplayercount: "",
      data: [],
      reservedDateTimes: []
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value
    });
  },
  convertTo24Hour: function (time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:00`;
  },
  loadResPlayer: function () {
    $.ajax({
      url: '/getplayers',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: '/getReservedDateTime',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ jwreserveddatetime: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadResPlayer();
  },
  handleChange: function (event) {
    var partialState = {};
    partialState[event.target.id] = event.target.value;
    this.setState(partialState);

    if (event.target.id === "jwreservationdate") {
      this.setState({ jwreservationtime: '' });
    }
  },

  handleDateTimeChange: function () {
    var jwreservationdatetime = this.state.jwreservationdate + 'T' + this.state.jwreservationtime;
    this.setState({ jwreservationdatetime: jwreservationdatetime });
  },

  renderTimeOptions: function () {
    var timeOptions = [];
    var reservedTimes = this.state.reservedDateTime ?
      this.state.reservedDateTime.map(rt => rt.jwreservationdateTime) : [];

    var hours, minutes, ampm;

    for (var i = 480; i <= 960; i += 8) {
      hours = Math.floor(i / 60);
      minutes = i % 60;
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      var timeValue = `${hours}:${minutes} ${ampm}`;
      var optionDateTime = this.createDateTime(this.state.jwreservationdate, timeValue);

      if (!reservedTimes.includes(optionDateTime)) {
        timeOptions.push(<option key={timeValue} value={timeValue}>{timeValue}</option>);
      }
    }

    return timeOptions;
  },



  handleSubmit: function (e) {
    e.preventDefault();

    var jwreservationdatetime = this.createDateTime(this.state.jwreservationdate, this.state.jwreservationtime);
    var jwreservationstatus = this.state.jwreservationstatus;
    var jwreservationplayer = this.props.viewthepage;
    var jwreservationplayercount = this.state.jwreservationplayercount;

    this.props.onReservationSubmit({
      jwreservationdatetime: jwreservationdatetime,
      jwreservationstatus: jwreservationstatus,
      jwreservationplayer: jwreservationplayer,
      jwreservationplayercount: jwreservationplayercount,
    });
  },
  createDateTime: function (date, time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return date + 'T' + hours + ':' + minutes + ':00';
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
        <div id="inputForm">
          <form className="reservationForm" onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>Reservation Date</th>
                  <td>
                    <input
                      type="date"
                      uniqueName="jwreservationdate"
                      id="jwreservationdate"
                      value={this.state.jwreservationdate}
                      onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <th>Reservation Time</th>
                  <td>
                    <select
                      id="jwreservationtime"
                      value={this.state.jwreservationtime}
                      onChange={this.handleChange}
                      required>
                      <option value="">Select Time</option>
                      {this.renderTimeOptions()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Number of Players for Reservation</th>
                  <td>
                    <input
                      type="number"
                      title="Select number of players who want to play during this reservation"
                      id="jwreservationplayercount"
                      value={this.state.jwreservationplayercount}
                      onChange={this.handleChange}
                      required>
                    </input>
                  </td>
                </tr>
                <tr>
                  <th>Reservation Status</th>
                  <td><select emptyMessage="Status is required" name="jwreservationstatus" id="jwreservationstatus" defaultValue={this.state.selectValue} onChange={this.setValue.bind(this, 'jwreservationstatus')} required>
                    <option value="" selected disabled>Please Select a Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Cancelled">Cancelled</option>

                  </select>
                  </td>
                </tr>
                <tr>
                  <th>Player Reservation</th>
                  <td>
                    {/* <SelectList data={this.state.data} /> */}
                    {this.props.playerName}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button-container">
              <input type="submit" value="Insert Reservation" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
var SelectList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (resPlayer) {
      return (
        <option
          key={resPlayer.dbplayerkey}
          value={resPlayer.dbplayerkey}
        >
          {resPlayer.dbplayername}
        </option>
      );
    });
    return (
      <select name="jwresplayer" id="jwresplayer">
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
  <ReservationBox />,
  document.getElementById('content')
);