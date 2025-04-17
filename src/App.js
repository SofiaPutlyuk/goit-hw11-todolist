import React from 'react';
import TodoEditor from './components/TodoEditor';
import Filter from './components/Filter';
import './App.css';

class App extends React.Component {
  state = {
    filter: '',
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    return (
      <div>
        <Filter
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
        />
         <TodoEditor filter={this.state.filter} />
      </div>
    );
  }
}

export default App;
