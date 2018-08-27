import React from "react"
import PropTypes from "prop-types"
import TrainEdit from "./TrainEdit"

class Train extends React.Component {
  constructor (props) {
    super()
    const {
      id,
      train_line,
      route,
      run_number,
      operator_id
    } = props.train

    this.state = {
      editing: false,
      train: {id, train_line, route, run_number, operator_id}
    }
  }

  handleUserInput (obj) {
    this.setState({train: _.merge(this.state.train, obj)})
  }

  toggleEditState () {
    this.setState({editing: !this.state.editing})
  }

  handleEdit (data) {
    if (data) {
      const {
        train_line,
        route,
        run_number,
        operator_id
      } = data

      const train = {
        train_line: train_line.value,
        route: route.value,
        run_number: run_number.value,
        operator_id: operator_id.value
      }

      $.ajax({
        url: `/trains/${this.props.train.id}`,
        type: 'PUT',
        data: {train: train}
      }).done(function(data){
        this.setState({editing: false})
      }.bind(this));
    } else {
      this.setState({editing: false})
    }
  }

  render() {
    const {
      id,
      train_line,
      route,
      run_number,
      operator_id
    } = this.state.train

    if(this.state.editing){
      return (
        <TrainEdit
          handleSubmit={this.handleEdit.bind(this)}
          train={this.state.train}
          handleUserInput={this.handleUserInput.bind(this)}
          editing
        />)
    } else {
      return (
        <tr>
          <td className='leftmost'>{train_line}</td>
          <td>{route}</td>
          <td>{run_number}</td>
          <td>{operator_id}</td>
          <td className='rightmost'>
            <button onClick={this.toggleEditState.bind(this)}>Edit</button>
            <button onClick={() => this.props.handleDelete(id, run_number)}>Delete</button>
          </td>
        </tr>
      )
    }
  }
}

Train.propTypes = {
  train: PropTypes.object,
  handleDelete: PropTypes.func
};

export default Train