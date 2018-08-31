import React, { Component } from 'react';
import CardList from './CardList';
import { robots } from './robots';
import SearchBox from './SearchBox';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onInputChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  
  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.trim().toLowerCase());
    });

    if (this.state.robots === 0) {
      return <h1>WAITING IS GOOD</h1>;
    } else {
      return (
        <div className="tc">
          <h1>RoboFriends</h1>
          <SearchBox searchChange={this.onInputChange} />
          <CardList robots={filteredRobots} />
        </div>
      );
    }
  }
}

export default App;
