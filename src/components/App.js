import React from "react";
import SearchBar from "./SearchBar";
import BarChart from "./BarChart";
import house from "../API/house";
import senate from "../API/senate";
import { Layout, Card, Row, Col } from "antd";
import Fuse from "fuse.js";
import finance from "../API/finance";
import "./layout.css";
import 'frappe-charts/dist/frappe-charts.min.css';


const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class App extends React.Component {
  state = {
    politician: [],
    contributions: [],
    contributionsList: [],
    financialSummary: [],
    personalAssets: []
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
    if (typeof senatorSearchResult[0] !== "undefined"){
      crp_id = senatorSearchResult[0].crp_id;
      this.setState({ politician: senatorSearchResult[0] });
    }

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

    if (typeof representativesSearchResult[0] !== "undefined"){
      crp_id = representativesSearchResult[0].crp_id;
      console.log(representativesSearchResult[0]);
      this.setState({ politician: representativesSearchResult[0] });
      console.log(this.state);
    }


    // Obtain top ten contributor data, financial summary, personal assets and from returned politician
    const topContributions = await finance.get("/?method=candContrib", {
      params: {
        cid: crp_id
      }
    });
    this.setState({ contributions: topContributions.data.response.contributors.contributor });
    const contributorsList = [];
    this.state.contributions.forEach(contributor =>
        contributorsList.push(contributor["@attributes"].org_name)
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
                <Col span={4}>
                  <Card
                    className="logo"
                    bodyStyle={{ padding: "10px" }}
                    cover={
                      <img
                        alt="example"
                        src={`https://theunitedstates.io/images/congress/original/${this.state.politician.id}.jpg`}
                      />
                    }
                  >
                    <Meta
                      className="cardtitle"
                      title={this.state.politician.full_name}
                    />
                  </Card>
                </Col>
                <BarChart contributions={this.state.contributions}/>
              </Row>
              <Row>
                <Col span={24}>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Sacha Michel © 2019</Footer>
        </Layout>
      </div>
    );
  }
}
export default App;
