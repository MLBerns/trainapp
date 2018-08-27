import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import Train from "./Train"
import TrainEdit from "./TrainEdit"
import bb from "billboard.js"

class TrainIndex extends React.Component {
  constructor(props) {
    super()
    this.state = {
      trains: props.trains,
      adding: false,
      sort_by: 'run_number'
    }
  }

  componentDidMount() {
    this.renderPieGraph()
  }

  componentDidUpdate () {
    this.renderPieGraph()
  }

  renderPieGraph () {
    const { trains } = this.props
    const amtrak = _.filter(trains, function(train) {return train.train_line == "Amtrak"} ).length
    const el = _.filter(trains, function(train) {return train.train_line == "El"} ).length
    const metra = _.filter(trains, function(train) {return train.train_line == "Metra"} ).length
    const foo = bb.generate({
      data: {
        columns: [
      ["Amtrak", amtrak],
      ["El", el],
      ["Metra", metra]
        ],
        type: "pie",
      },
      bindto: "#graph"
    });
  }

  toggleAddState () {
    this.setState({adding: !this.state.adding})
  }

  handleSubmit (data) {
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
    $.post('/trains', {train: train}).done(function(data){
      this.setState({adding: false})
      this.addTrain(data)
    }.bind(this))
  }

  handleDelete (train_id, run_number) {
    var result = confirm(`Are you sure you want to delete run ${run_number}?`);
    if (result) {
      $.ajax({
        url: `/trains/${train_id}`,
        type: 'DELETE'
      }).done(function(data){
        this.removeTrain(data)
      }.bind(this));
    }
  }

  addTrain (train) {
    let trains = this.state.trains
    trains.push(train)
    const sort_by = this.state.sort_by
    this.setState({trains: _.sortBy(trains, function(train) {
      return train[sort_by]
    })})
  }

  removeTrain (train) {
    var trains = this.state.trains
    _.remove(trains, function(t){
      return t.id == train.id
    })
    this.setState({trains: trains})
  }

  setSortMethod (e) {
    this.setState({trains: _.sortBy(this.state.trains, function(train) {
      return train[e.target.name]
    })})
  }

  render () {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>
                Train Line<br/>
                <button onClick={this.setSortMethod.bind(this)} name="train_line">Sort</button>
              </th>
              <th>
                Route<br/>
                <button onClick={this.setSortMethod.bind(this)} name="route">Sort</button>
              </th>
              <th>
                Run Number<br/>
                <button onClick={this.setSortMethod.bind(this)} name="run_number">Sort</button>
              </th>
              <th>
                Operator ID<br/>
                <button onClick={this.setSortMethod.bind(this)} name="operator_id">Sort</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.trains.map(function(train) {
              return (
                <Train
                  key={train.id}
                  train={train}
                  handleDelete={this.handleDelete.bind(this)}
                />
              )
            }.bind(this))}
            {this.state.adding && (
              <TrainEdit handleSubmit={this.handleSubmit.bind(this)}/>
            )}
          </tbody>
        </table>
        <button className="add_button" onClick={this.toggleAddState.bind(this)}>
          {this.state.adding ? "Cancel Adding" : "Add Train Line"}
        </button>
        <div id="graph"></div>
      </div>
    );
  }
}

TrainIndex.propTypes = {
  trains: PropTypes.array
};

export default TrainIndex
