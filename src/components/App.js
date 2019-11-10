import React from "react";
import SearchBar from "./SearchBar";
import house from "../API/house";
import senate from "../API/senate";
import { Layout, Card } from "antd";

const { Content } = Layout;

class App extends React.Component {
  state = {
    representatives: []
  };
  onTermSubmit = async term => {
    let crp_id;
    let contribution;
    let contributionTotal;

    // Fetch list of members of The U.S. Senate then searches for a specific member and crp_id
    const senators = await senate.get("", {});
    function isSenator(senator){
      return `${senator.first_name} ${senator.last_name}` === term;
    }
    console.log(senators.data.results[0].members.find(isSenator));

    // Fetch list of members of The U.S. House of Representatives then searches for a specific member and crp_id
    const representatives = await house.get("", {});
    function isRepresentative(representative){
      return `${representative.first_name} ${representative.last_name}` === term;

    }

    console.log(representatives.data.results[0].members.find(isRepresentative));
  };

  render() {
    return (
      <div>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <Layout style={{ padding: 20 }}>
          <Content>
            <Card title="Card title" bordered={false} style={{ width: 300 }}>
              <p>Card content</p>
              <p>{this.state.representatives.length}</p>
              <p>Card content</p>
            </Card>
          </Content>
        </Layout>
      </div>
    );
  }
}
export default App;

