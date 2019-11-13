import React from "react";
import SearchBar from "./SearchBar";
import house from "../API/house";
import senate from "../API/senate";
import { Layout, Card } from "antd";
import Fuse from "fuse.js";

const { Content } = Layout;

class App extends React.Component {
  state = {
    representatives: []
  };
  onTermSubmit = async term => {
    let crp_id;
    let contribution;
    let contributionTotal;

    // Fuzzy search configurations
    const options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "full_name"
      ]
    };

    // Fetch list of members of The U.S. Senate and create full_name property for fuzzy search
    const senatorsList = await senate.get("", {});
    senatorsList.data.results[0].members.forEach(
      listMember =>
        (listMember.full_name = `${listMember.first_name} ${listMember.last_name}`)
    );

    // Find specific senator from search term and set crp_id
    const senatorSearch = new Fuse( senatorsList.data.results[0].members, options);
    const senatorSearchResult = senatorSearch.search(`${term}`);

    if (senatorSearchResult.length > 0)
      crp_id = senatorSearchResult[0].crp_id;
      console.log(senatorSearchResult);

    // Fetch list of members of The U.S. House of Representatives
    const representativesList = await house.get("", {});
    representativesList.data.results[0].members.forEach(
      listMember =>
        (listMember.full_name = `${listMember.first_name} ${listMember.last_name}`)
    );

    // Find specific representative from search term (first and last name)
    const representativesSearch = new Fuse( representativesList.data.results[0].members, options);
    const representativesSearchResult = representativesSearch.search(`${term}`);

    if (representativesSearchResult.length > 0)
      crp_id = representativesSearchResult[0].crp_id;
      console.log(representativesSearchResult);

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
