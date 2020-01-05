import React from "react";
//FUZZY SEARCH
import Fuse from "fuse.js";
//API
import house from "../API/house";
import senate from "../API/senate";
import finance from "../API/finance";
//ANTD
import Spin from 'antd/es/spin'
import Col from "antd/es/col";
import Layout from "antd/es/layout";
import Row from "antd/es/row";
import Divider from "antd/es/divider";
//COMPONENTS
import SearchBar from "./SearchBar";
import PieChartMoneySpent from "./PieChartMoneySpent";
import ContributorsChart from "./ContributorsChart";
import PolitcianInfoCard from "./PloticianInfoCard";
import AssetTable from "./AssetTable";

//ASSETS
import logo from "./images/pluto_icon_heavy.png";
import "./main.css";

const { Header, Content, Footer } = Layout;

/*
all properties such as "xs={13} sm={13} md={13} lg={3}" are responsiveness parameters and are in reference to antd grid
https://ant.design/components/grid/
grid is placed within library Layout
*/

class App extends React.Component {
  state = {
    politician: [],
    contributions: [],
    financialSummary: [],
    personalAssets: [],
    topIndustries: []
  };
  onTermSubmit = async term => {
    let crp_id;

    // Fuzzy search configurations
    const options = {
      shouldSort: true,
      threshold: 0.3,
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

    // Find specific senator from search term and set crp_id
    const senatorSearch = new Fuse(
      senatorsList.data.results[0].members,
      options
    );
    const senatorSearchResult = senatorSearch.search(`${term}`);
    if (typeof senatorSearchResult[0] !== "undefined") {
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

    if (typeof representativesSearchResult[0] !== "undefined") {
      crp_id = representativesSearchResult[0].crp_id;
      this.setState({ politician: representativesSearchResult[0] });
    }

    // Obtain top ten contributor data, financial summary, personal assets and from returned politician
    const topContributions = await finance.get("/?method=candContrib", {
      params: {
        cid: crp_id
      }
    });
    this.setState({
      contributions: topContributions.data.response.contributors.contributor
    });
    const contributorsList = [];
    this.state.contributions.forEach(contributor =>
      contributorsList.push(contributor["@attributes"].org_name)
    );

    const financialSummary = await finance.get("/?method=candSummary", {
      params: {
        cid: crp_id
      }
    });
    this.setState({
      financialSummary: financialSummary.data.response.summary["@attributes"]
    });
    console.log("Financial Summary");
    console.log(this.state.financialSummary);
    const personalAssets = await finance.get("/?method=memPFDprofile", {
      params: {
        cid: crp_id
      }
    });
    this.setState({
      personalAssets: personalAssets.data.response.member_profile.assets.asset
    });
    console.log("Person Assests");
    console.log(this.state.personalAssets);
    const topIndustry = await finance.get("/?method=candIndustry", {
      params: {
        cid: crp_id
      }
    });
    this.setState({
      topIndustries: topIndustry.data.response.industries.industry
    });
  };

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <img src={logo} alt="logo_icon" className="logo" />
            <SearchBar onFormSubmit={this.onTermSubmit} />
          </Header>
          <Content style={{ padding: "30px 25px" }}>
            <div style={{ background: "#fff", padding: 20, minHeight: 280 }}>
              <Row>
                <PolitcianInfoCard politicianInfo={this.state.politician} />
                <ContributorsChart
                  contributions={this.state.contributions}
                  className={"chart"}
                />
              </Row>
              <Divider />
              <Row
                style={{
                  background: "#F0F2F5",
                  padding: "10px",
                  borderRadius: "4px"
                }}
              >
                <div>
                  <Col>
                    <PieChartMoneySpent
                      politicianFinancialSumary={this.state.financialSummary}
                      politicianInfo={this.state.politician}
                    />
                  </Col>
                </div>
              </Row>
              <Divider />
              <Row>
                <AssetTable
                  politicianAssets={this.state.personalAssets}
                  politicianIndustries={this.state.topIndustries}
                />
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
