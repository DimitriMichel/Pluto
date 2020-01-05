import React from "react";
import {Form, Input} from "antd"
import "./main.css";
const { Search } = Input;

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = event => {
    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <div style={{ paddingTop: "18px" }}>
        <Form>
          <Search
            placeholder="Enter Congress Member"
            size="default"
            style={{ maxWidth: 350 }}
            onSearch={this.onFormSubmit}
            value={this.state.term}
            onChange={event => this.setState({ term: event.target.value })}
          />
        </Form>
      </div>
    );
  }
}

export default SearchBar;
