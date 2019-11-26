import React, { Component } from "react";
import { Col } from "antd";
import Chart from "react-apexcharts";

class CircleChart2 extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const VotesWith = Math.round(
        this.props.politicianInfo.votes_with_party_pct
    );
    const VotesAgainst = Math.round(
        100 - this.props.politicianInfo.votes_with_party_pct
    );

    this.state = {
      optionsPie: {
        labels: ["Votes With Party", "Votes Against Party"],
        legend: {
          position: "bottom"
        },
        plotOptions: {
          pie: {
            height: "auto",
            width: "auto"
          }
        }
      },
      responsive: [
        {
          breakpoint: undefined
        }
      ],
      seriesPie: [VotesWith, VotesAgainst]
    };

  }

  render() {
    return (
      <Col span={8}>
        <div style={{ background: "#F0F2F5", padding: "10px" }}>
          <Chart
            options={this.state.optionsPie}
            series={this.state.seriesPie}
            type="pie"
          />
        </div>
      </Col>
    );
  }
}

export default CircleChart2;
