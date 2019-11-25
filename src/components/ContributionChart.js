import React from "react";
import C3Chart from "react-c3js";
import "c3/c3.css";
import { Col } from "antd";

const ContributionChart = props => {
  const contributorsList = [];
  const contributionTotal = [];
  props.contributions.forEach(contributor =>
    contributorsList.push(contributor["@attributes"].org_name)
  );
  props.contributions.forEach(contributor =>
    contributionTotal.push(contributor["@attributes"].total)
  );
  console.log(props);

  const BarChart = ({ data }) => (
    <C3Chart
      title={{
        show: false,
        text: "Top Ten Contributors",
        position: "top-center",
        padding: {
          top: 10,
          right: 20,
          bottom: 20,
          left: 50
        }
      }}
      axis={{x: {tick: {values: ["Donors"]}}}}
      data={{
        json: data,
        type: "bar",
        title: "usage ",
        colors: {
          [contributorsList[0]]: "#4A5FBF",
          [contributorsList[1]]: "#97CC04",
          [contributorsList[2]]: "#588B8B",
          [contributorsList[3]]: "#D33232",
          [contributorsList[4]]: "#322A3B",
          [contributorsList[5]]: "#222A68",
          [contributorsList[6]]: "#34B7A4",
          [contributorsList[7]]: "#CA552D",
          [contributorsList[8]]: "#6C7658",
          [contributorsList[9]]: "#686898"
        }
      }}
    />
  );

  const chartData = {
    bar: {
      [contributorsList[0]]: [50000],
      [contributorsList[1]]: [30000],
      [contributorsList[2]]: [66000],
      [contributorsList[3]]: [36000],
      [contributorsList[4]]: [72000],
      [contributorsList[5]]: [16000],
      [contributorsList[6]]: [30070],
      [contributorsList[7]]: [51030],
      [contributorsList[8]]: [12000],
      [contributorsList[9]]: [14060]
    }
  };

  return (
    <Col span={20}>
      <div>
        <BarChart data={chartData.bar} />
      </div>
    </Col>
  );
};

export default ContributionChart;
