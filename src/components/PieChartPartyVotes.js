import React from "react";
import Chart from "react-apexcharts";
import { Col } from "antd";

const PieChartPartyVotes = React.memo(props => {
  const votesWith = Math.round(props.politicianInfo.votes_with_party_pct);
  const votesAgainst = Math.round(
    100 - props.politicianInfo.votes_with_party_pct
  );

  const options = {
    labels: ["With Party", "Against Party"],
    plotOptions: {
      pie: {
        height: "auto",
        width: "auto"
      }
    },
    colors: ["#5582db", "#d35050"],
    responsive: [
      {
        breakpoint: undefined
      }
    ],
    legend: {
      position: "bottom"
    }
  };
  const series = [votesWith, votesAgainst];

  return (
    <Col span={8}>
      <div
      >
        <Chart options={options} series={series} type="pie" height="200" />
      </div>
    </Col>
  );
});

export default PieChartPartyVotes;
