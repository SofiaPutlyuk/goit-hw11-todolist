import React from 'react';
import styled from 'styled-components';
const Input = styled.input`
padding:30px;
border:2px solid yellow;
width:300px;
`
class Filter extends React.Component {
    render() {
      const { filter, onFilterChange } = this.props;
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Фільтрація доданих завданнь"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          />
        </form>
      );
    }
  }

export default Filter;
