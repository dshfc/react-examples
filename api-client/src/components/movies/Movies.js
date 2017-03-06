import React from 'react';
import Movie from './Movie';
import Message from '../Message';

export default class Movies extends React.Component{

  constructor(props){
    super(props)
    this.state = { results:[], movies:[], error: null }
    this.search = this.search.bind(this)
    this.clear = this.clear.bind(this)
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount(){
    fetch('/favorites')
      .then(r => {
        if (r.status === 200) {
          return r.json()
        } else {
          const err = new Error(`Got status of ${r.status} ${r.statusText}`)
          err.response = r
          throw err
        }
      })
      .then(movies => {
        this.setState({movies})
      })
      .catch(error => {
        this.setState({error})
      })
  }

  add(event, movie){
    event.preventDefault()

    const body = JSON.stringify(movie)
    const headers = new Headers({'Content-Type': 'application/json'})

    fetch('/favorites', {method: 'POST', body, headers })
      .then(r => {
        if (r.status === 200) {
          return r.json()
        } else {
          const err = new Error(`Got status of ${r.status} ${r.statusText}`)
          err.response = r
          throw err
        }
      })
      .then(favorite => {
        movie.added = true
        this.setState({movies: this.state.movies.concat(favorite)})
      })
      .catch(error => {
        this.setState({error})
      })
  }

  delete(event, movie){
    event.preventDefault()

    fetch(`/favorites/${movie.id}`, {method: 'DELETE' })
      .then(r => {
        if (r.status === 200) {
          return r.text()
        } else {
          const err = new Error(`Got status of ${r.status} ${r.statusText}`)
          err.response = r
          throw err
        }
      })
      .then(() => {
        const movieToRemove = this.state.results.find(m => {
          return m.imdbId === movie.imdbId
        })
        movieToRemove.added = false;

        this.setState({
          movies: this.state.movies.filter(m => m.id !== movie.id),
          results: this.state.results,
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({error})
      })
  }

  search(e){
    e.preventDefault()
    const query = this.query.value
    const url = `/movies?q=${query}`
    fetch(url)
      .then(r => r.json())
      .then(results => {
        this.setState({results})
      })
  }

  clear(e){
    e.preventDefault()
    this.query.value = ""
    this.setState({results:[]})
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Message error={this.state.error} answer={''} />
            <div className="panel panel-default">
              <div className="panel-body">
              <div className="col-sm-4">
              </div>
              <form onSubmit={this.search} className="col-sm-4">
                <h2>Movie Search</h2>
                <input type="text" ref={node => this.query = node} />
                <button type="submit" className="btn btn-primary search">Search</button>
                <button onClick={this.clear} className="btn btn-danger">Clear</button>
              </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2>Movies</h2>
            <div className="panel panel-default">
              <div className="panel-body scroll">
                {
                  this.state.results.map((movie,i)=>{
                    return (
                      <Movie key={i}
                        movie={movie}
                        myMovie={false}
                        callbackParent={e => this.add(e, movie)}
                        query={this.query.value}/>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="col-sm-6">
          <h2>My movies</h2>
            <div className="panel panel-default">
              <div className="panel-body scroll">
                  {
                    this.state.movies.map((movie,i)=>{
                      return (
                        <Movie key={i}
                          movie={movie}
                          myMovie={true}
                          callbackParent={e => this.delete(e, movie)}/>
                      )
                    })
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
