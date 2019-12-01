import React from "react";
import { Form, Input } from "antd";
import './SearchBar.css'

const { Search } = Input;

class SearchBar extends React.Component {
  state = {term: ''};

  onFormSubmit = event => {
    this.props.onFormSubmit(this.state.term)
  };

  render() {
    return (
        <div className="barTop">
          <Form style={{margin: "auto"}}>
            <Search
              placeholder="Enter Congress Member"
              size="default"
              style={{ maxWidth: 400}}
              onSearch={this.onFormSubmit}
              value={this.state.term}
              onChange={event => this.setState({term: event.target.value})}
            />
          </Form>
        </div>
    );
  }
}

export default SearchBar;
