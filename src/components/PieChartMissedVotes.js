import React from "react";
import Chart from "react-apexcharts";
import { Col } from "antd";

const CircleChart = React.memo(props => {
  const votesAttended = Math.round(100 - props.politicianInfo.missed_votes_pct);
  const votesMissed = Math.round(props.politicianInfo.missed_votes_pct);

  const options = {
    labels: ["Votes Attended", "Votes Missed"],
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
  const series = [votesAttended, votesMissed];

  return (
    <Col span={8}>
      <div style={{ padding: "10px" }}>
        <Chart options={options} series={series} type="pie" height="200" />
      </div>
    </Col>
  );
});

export default CircleChart;
