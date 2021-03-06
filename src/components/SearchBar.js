import React from "react";
import {Form, Input} from "antd"
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import "./main.css";
const { Search } = Input;

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = event => {
    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <div style={{ paddingTop: "18px"}}>
        <Form style={{textAlign: "center", paddingRight:"2.2rem"}}>
          <Search
            placeholder="Enter Congress Member"
            size="default"
            className="search-bar"
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
