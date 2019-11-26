import React from "react";
import Chart from "react-apexcharts";
import "c3/c3.css";
import { Col } from "antd";

const CircleChart = props => {
  const votesWith = Math.round(props.politicianInfo.votes_with_party_pct);
  const votesAgainst = Math.round(
    100 - props.politicianInfo.votes_with_party_pct
  );
  console.log(props.politicianInfo);
  const options = {
    labels: ["Votes With Party", "Votes Against Party"],
    plotOptions: {
      pie: {
        height: "auto",
        width: "auto"
      }
    }
  };
  const series = [votesWith, votesAgainst];

  return (
    <Col span={8}>
      <div style={{ background: "#F0F2F5", padding: "10px" }}>
        <Chart options={options} series={series} type="pie" />
      </div>
    </Col>
  );
};

export default CircleChart;
