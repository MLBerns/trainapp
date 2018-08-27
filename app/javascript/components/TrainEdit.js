import React from "react"
import PropTypes from "prop-types"

class TrainNew extends React.Component {
  constructor(props) {
    super()
    this.train = {}
    this.train.train_line = React.createRef()
    this.train.route = React.createRef()
    this.train.run_number = React.createRef()
    this.train.operator_id = React.createRef()
    this.state = {
      train_line_value: props.train.train_line || "",
      route_value: props.train.route || "",
      errors: {}
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.train_line_value != this.state.train_line_value) {
      this.setState({route_value: ""})
    }
  }

  handleChange (e) {
    var errors = {}
    var name = e.target.name
    var obj = {}
    obj[name] = e.target.value
    this.props.handleUserInput(obj)
    this.forceUpdate()
  }

  allFieldsPopulated() {
    const isEdit = !_.isEmpty(this.props.train)
    const hasEmptyFields = _.filter(_.values(this.train), function (field) { return field.value == null || field.value == "" }).length > 0
    if (isEdit) {
      return _.filter(_.values(this.props.train), function(val) { return val.length == 0}).length
    } else if (hasEmptyFields) {
      return true
    } else {
      return false
    }
  }

  handleTrainLineChange (e) {
    this.setState({train_line_value: e.target.value})
  }

  handleRouteChange (e) {
    this.setState({route_value: e.target.value})
  }

  renderLineSelect() {
    return (
      <select
        ref={select => this.train.train_line = select}
        value={this.state.train_line_value}
        onChange={this.handleTrainLineChange.bind(this)}
        name='train_line'
      >
        <option value="" disabled hidden>Select Line</option>
        <option value="El">El</option>
        <option value="Metra">Metra</option>
        <option value="Amtrak">Amtak</option>
      </select>
    )
  }

  renderElRoutes() {
    return (
      <select
        ref={select => this.train.route = select}
        value={this.state.route_value}
        onChange={this.handleRouteChange.bind(this)}
        name='route'
      >
        <option value="" disabled hidden>Select Route</option>
        <option value="Blue Line">Blue Line</option>
        <option value="Brown Line">Brown Line</option>
        <option value="Green Line">Green Line</option>
        <option value="Orange Line">Orange Line</option>
        <option value="Pink Line">Pink Line</option>
        <option value="Purple Line">Purple Line</option>
        <option value="Red Line">Red Line</option>
      </select>
    )
  }

  renderMetraRoutes() {
    return (
      <select
        ref={select => this.train.route = select}
        value={this.state.route_value}
        onChange={this.handleRouteChange.bind(this)}
        name='route'
      >
        <option value="" disabled hidden>Select Route</option>
        <option value="BNSF">BNSF</option>
        <option value="HC">HC</option>
        <option value="MD-N">MD-N</option>
        <option value="MD-W">MD-W</option>
        <option value="ME">ME</option>
        <option value="NCS">NCS</option>
        <option value="RI">RI</option>
        <option value="SWS">SWS</option>
        <option value="UP-N">UP-N</option>
        <option value="UP-NW">UP-NW</option>
        <option value="UP-W">UP-W</option>
      </select>
    )
  }

  renderAmtrakRoutes() {
    return (
      <select
        ref={select => this.train.route = select}
        value={this.state.route_value}
        onChange={this.handleRouteChange.bind(this)}
        name='route'
      >
        <option value="" disabled hidden>Select Route</option>
        <option value="California Zephyr">California Zephyr</option>
        <option value="Capitol Limited">Capitol Limited</option>
        <option value="Cardinal">Cardinal</option>
        <option value="City of New Orleans">City of New Orleans</option>
        <option value="Empire Builder">Empire Builder</option>
        <option value="Hiawatha">Hiawatha</option>
        <option value="Hoosier State">Hoosier State</option>
        <option value="Illinois Service">Illinois Service</option>
        <option value="Lake Shore Limited">Lake Shore Limited</option>
        <option value="Michigan Services">Michigan Services</option>
        <option value="Missouri River Runner">Missouri River Runner</option>
        <option value="Southwest Chief">Southwest Chief</option>
        <option value="Texas Eagle">Texas Eagle</option>
      </select>
    )
  }

  render() {
    const {
      train_line,
      route,
      run_number,
      operator_id
    } = this.props.train

    const { editing } = this.props

    return (
      <tr>
        <td>
          {this.renderLineSelect()}
        </td>
        <td>
          {!this.state.train_line_value && (
            <select disabled>
            </select>
          )}
          {this.state.train_line_value == "El" && (
            this.renderElRoutes()
          )}
          {this.state.train_line_value == "Metra" && (
            this.renderMetraRoutes()
          )}
          {this.state.train_line_value == "Amtrak" && (
            this.renderAmtrakRoutes()
          )}
        </td>
        <td>
          <input
            ref={input => this.train.run_number = input}
            name='run_number'
            placeholder='Run'
            value={run_number}
            onChange={this.handleChange.bind(this)}
          />
        </td>
        <td>
          <input
            ref={input => this.train.operator_id = input}
            name='operator_id'
            placeholder='Operator'
            value={operator_id}
            onChange={this.handleChange.bind(this)}
          />
        </td>
        <td>
          <button disabled={this.allFieldsPopulated()} onClick={() => this.props.handleSubmit(this.train)}>
            {editing ? "Submit Edit" : "Add Train"}
          </button>
          { editing && (
            <button onClick={() => this.props.handleSubmit(null)}>
              Cancel Edit
            </button>
          )
          }
        </td>
      </tr>
    )
  }
}

TrainNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUserInput: PropTypes.func,
  train: PropTypes.object,
  editing: PropTypes.bool
}

TrainNew.defaultProps = {
  handleUserInput: () => {},
  train: {},
  edting: false
}

export default TrainNew