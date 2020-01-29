import React from "react";
//FUZZY SEARCH
import Fuse from "fuse.js";
//API
import house from "../API/house";
import senate from "../API/senate";
import finance from "../API/finance";
//ANTD
import Spin from "antd/es/spin";
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
    politician: {
      crp_id: "N00034580",
      id: "K000383",
      short_title: "Sen.",
      full_name: "Angus King",
      missed_votes_pct: 0,
      votes_with_party_pct: 90.34,
      votes_against_party_pct: 9.66,
      state: "ME",
      party: "ID",
      url: "https://www.king.senate.gov"
    },
    contributions: [
      {
        "@attributes": {
          org_name: "JStreetPAC",
          total: "88085",
          pacs: "0",
          indivs: "88085"
        }
      },
      {
        "@attributes": {
          org_name: "Northrop Grumman",
          total: "41300",
          pacs: "10000",
          indivs: "31300"
        }
      },
      {
        "@attributes": {
          org_name: "Bath Iron Works",
          total: "35650",
          pacs: "0",
          indivs: "35650"
        }
      },
      {
        "@attributes": {
          org_name: "Paloma Partners",
          total: "35600",
          pacs: "0",
          indivs: "35600"
        }
      },
      {
        "@attributes": {
          org_name: "League of Conservation Voters",
          total: "31853",
          pacs: "9999",
          indivs: "21854"
        }
      },
      {
        "@attributes": {
          org_name: "General Dynamics",
          total: "31500",
          pacs: "10000",
          indivs: "21500"
        }
      },
      {
        "@attributes": {
          org_name: "Unum Group",
          total: "27286",
          pacs: "10000",
          indivs: "17286"
        }
      },
      {
        "@attributes": {
          org_name: "Bernstein, Shur et al",
          total: "27025",
          pacs: "0",
          indivs: "27025"
        }
      },
      {
        "@attributes": {
          org_name: "Cooney & Conway",
          total: "27000",
          pacs: "0",
          indivs: "27000"
        }
      },
      {
        "@attributes": {
          org_name: "Democracy Engine",
          total: "22425",
          pacs: "0",
          indivs: "22425"
        }
      }
    ],
    financialSummary: { total: "5188522.72", spent: "4808143.08" },
    personalAssets: [
      {
        "@attributes": {
          name: "Vanguard 500 Index",
          holdings_low: "1001002",
          holdings_high: "5016000"
        }
      },
      {
        "@attributes": {
          name: "Vanguard Intermediate Term Tax Exempt Fund",
          holdings_low: "1000001",
          holdings_high: "5000000"
        }
      },
      {
        "@attributes": {
          name: "MAINE TAX EXEMPT CTF",
          holdings_low: "1000001",
          holdings_high: "5000000"
        }
      },
      {
        "@attributes": {
          name: "Windswept Villas LLC",
          holdings_low: "250001",
          holdings_high: "500000"
        }
      },
      {
        "@attributes": {
          name: "Residence & Rental/POTTER ST BRUNSWICK",
          holdings_low: "250001",
          holdings_high: "500000"
        }
      }
    ],
    topIndustries: [
      {
        "@attributes": {
          industry_code: "W06",
          industry_name: "Retired",
          indivs: "559657",
          pacs: "0",
          total: "559657"
        }
      },
      {
        "@attributes": {
          industry_code: "Q02",
          industry_name: "Democratic/Liberal",
          indivs: "231688",
          pacs: "600",
          total: "232288"
        }
      },
      {
        "@attributes": {
          industry_code: "F07",
          industry_name: "Securities & Investment",
          indivs: "190290",
          pacs: "26000",
          total: "216290"
        }
      },
      {
        "@attributes": {
          industry_code: "F10",
          industry_name: "Real Estate",
          indivs: "160676",
          pacs: "46216",
          total: "206892"
        }
      },

      {
        "@attributes": {
          industry_code: "Q03",
          industry_name: "Leadership PACs",
          indivs: "4000",
          pacs: "162000",
          total: "166000"
        }
      }
    ],
    isLoading: false
  };

  onTermSubmit = async term => {
    console.log("first");
    console.log(this.state.politician);
    let crp_id; //Congress Member ID
    this.setState({ isLoading: true });
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

    /*If A Congress Member does not have personal assets we set name and holdings to null
    and zero then in asset table return empty table*/
    if (personalAssets.data.response.member_profile.assets) {
      this.setState({
        personalAssets: personalAssets.data.response.member_profile.assets.asset
      });
    } else {
      this.setState({
        personalAssets: [
          {
            "@attributes": {
              name: "null",
              holdings_low: "0",
              holdings_high: "0"
            }
          }
        ]
      });
    }

    const topIndustry = await finance.get("/?method=candIndustry", {
      params: {
        cid: crp_id
      }
    });
    this.setState({
      topIndustries: topIndustry.data.response.industries.industry
    });
    this.setState({ isLoading: false });
    console.log(this.state.topIndustries);
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
                {this.state.isLoading ? (
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className="spinner-container" style={{padding: "50px"}}>
                      <Spin className="loading-spinner" />
                    </div>
                  </Col>
                ) : (
                  <AssetTable
                    politicianAssets={this.state.personalAssets}
                    politicianIndustries={this.state.topIndustries}
                  />
                )}
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Dimitri Michel © 2019
            <br />
            Data Courtesy of ProPublica & OpenSecrets.org
          </Footer>
        </Layout>
      </div>
    );
  }
}
export default App;
