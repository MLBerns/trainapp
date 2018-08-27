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
        <option value="UPN">UPN</option>
        <option value="DS9">DS9</option>
        <option value="B5">B5</option>
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
        <option value="Hiawatha">Hiawatha</option>
        <option value="Something1">Something1</option>
        <option value="Something2">Something2</option>
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