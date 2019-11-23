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
      data={{
        json: data,
        type: "bar",
        colors: {
          [contributorsList[0]]: "#EB1227",
          [contributorsList[1]]: "#F16C2F",
          [contributorsList[2]]: "#E4C835",
          [contributorsList[3]]: "#7FAF5E",
          [contributorsList[4]]: "#322A3B",
          [contributorsList[5]]: "#7A8089",
          [contributorsList[5]]: "#AAA994",
          [contributorsList[7]]: "#CA552D",
          [contributorsList[8]]: "#6C7658",
          [contributorsList[9]]: "#88A693"
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
      [contributorsList[5]]: [30070],
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
