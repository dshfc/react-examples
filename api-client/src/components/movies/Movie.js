import React from 'react';
import './movie.css';

export default class Movie extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }

  add(event){
    this.props.callbackParent(event);
  }

  delete(event){
    this.props.callbackParent(event);
  }

  render(){
    let button

    if (this.props.myMovie) {
      button = (
        <div className="col-sm-3">
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </div>
      )
    } else if (this.props.movie.added) {
      button = (
        <div className="col-sm-3">
          <button disabled className="btn btn-success">Added</button>
        </div>
      )
    } else {
      button = (
        <div className="col-sm-3">
          <button onClick={this.add} className="btn btn-success">Add</button>
        </div>
      )
    }

    return (
      <div>
        <div className="container">
          <div className="panel panel-default movie-panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-3">

                </div>
                <div className="col-sm-3">
                  <h4>Title</h4>
                </div>
                <div className="col-sm-3">
                  <h4>Year</h4>
                </div>
                <div className="col-sm-3">
                  <h4>Poster</h4>
                </div>
              </div>
              <div className="row">
                {button}
                <div className="col-sm-3 title">
                  {this.props.movie.title}
                </div>
                <div className="col-sm-3 year">
                  {this.props.movie.year}
                </div>
                <div className="col-sm-3">
                  <img alt={this.props.movie.title} className="poster" src={this.props.movie.poster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
