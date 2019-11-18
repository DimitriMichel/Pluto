import React from "react";
import SearchBar from "./SearchBar";
import BarChart from "./BarChart";
import house from "../API/house";
import senate from "../API/senate";
import { Layout, Card, Menu, Row, Col } from "antd";
import Fuse from "fuse.js";
import finance from "../API/finance";
import "./layout.css";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class App extends React.Component {
  state = {
    politician: [],
    contributions: []
  };
  onTermSubmit = async term => {
    let crp_id;

    // Fuzzy search configurations
    const options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["full_name"]
    };

    // Fetch list of members of The U.S. Senate and create full_name property for fuzzy search
    const senatorsList = await senate.get("", {});
    senatorsList.data.results[0].members.forEach(
      listMember =>
        (listMember.full_name = `${listMember.first_name} ${listMember.last_name}`)
    );
    console.log(senatorsList);

    // Find specific senator from search term and set crp_id
    const senatorSearch = new Fuse(
      senatorsList.data.results[0].members,
      options
    );
    const senatorSearchResult = senatorSearch.search(`${term}`);
    console.log(senatorSearchResult);
    if (senatorSearchResult.length > 0) crp_id = senatorSearchResult[0].crp_id;

    // Fetch list of members of The U.S. House of Representatives and create full_name property for fuzzy search
    const representativesList = await house.get("", {});

    representativesList.data.results[0].members.forEach(
      listMember =>
        (listMember.full_name = `${listMember.first_name} ${listMember.last_name}`)
    );

    // Find specific representative from search term and set crp_id
    const representativesSearch = new Fuse(
      representativesList.data.results[0].members,
      options
    );
    const representativesSearchResult = representativesSearch.search(`${term}`);

    if (representativesSearchResult.length > 0)
      crp_id = representativesSearchResult[0].crp_id;
    console.log(representativesSearchResult[0]);
    this.setState({ politician: representativesSearchResult[0] });

    // Obtain top ten contributor data, financial summary, personal assets and from returned politician
    const topContributions = await finance.get("/?method=candContrib", {
      params: {
        cid: crp_id
      }
    });
    console.log(topContributions);
    const contributorsObject = topContributions.data.response.contributors.contributor;
    console.log(contributorsObject);
    const contributorsList = contributorsObject.forEach(contributor => console.log(contributor["@attributes"].org_name)
    );

    const financialSummary = await finance.get("/?method=candSummary", {
      params: {
        cid: crp_id
      }
    });
    console.log(financialSummary);
    const personalAssets = await finance.get("/?method=memPFDprofile", {
      params: {
        cid: crp_id
      }
    });
    console.log(personalAssets);
  };

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
          </Header>
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 20, minHeight: 280 }}>
              <Row>
                <Col span={6}>
                  <Card
                    className="logo"
                    bodyStyle={{ padding: "10px" }}
                    cover={
                      <img
                        alt="example"
                        src="https://theunitedstates.io/images/congress/original/O000172.jpg"
                      />
                    }
                  >
                    <Meta className="cardtitle" title="Alexandria" />
                  </Card>
                </Col>
                <BarChart />
              </Row>
              <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Dimitri Michel © 2019</Footer>
        </Layout>
      </div>
    );
  }
}
export default App;
