import React from "react";
import Chart from "react-apexcharts";
import "c3/c3.css";
import { Col } from "antd";
import "./ContributorsChart.css";

const ContributorsChart = React.memo(props => {
  console.log(props);
  const contributorsList = [];
  const contributionTotal = [];
  props.contributions.forEach(contributor =>
    contributorsList.push(contributor["@attributes"].org_name)
  );
  props.contributions.forEach(contributor =>
    contributionTotal.push(contributor["@attributes"].total)
  );

  const options = {
    legend: {
      show: true,
      itemMargin: {
        horizontal: 6,
        vertical: 3},
    },
    colors: [
      "#17bebb",
      "#546E7A",
      "#d35050",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"
    ],
    chart: {
      width: "100%"
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: ["Contributors"]
    },
    yaxis: {
      title: {
        text: "Dollars"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return "$" + val;
        }
      }
    }
  };
  const series = [
    {
      name: [contributorsList[0]],
      data: [contributionTotal[0]]
    },
    {
      name: [contributorsList[1]],
      data: [contributionTotal[1]]
    },
    {
      name: [contributorsList[2]],
      data: [contributionTotal[2]]
    },
    {
      name: [contributorsList[3]],
      data: [contributionTotal[3]]
    },
    {
      name: [contributorsList[4]],
      data: [contributionTotal[4]]
    },
    {
      name: [contributorsList[5]],
      data: [contributionTotal[5]]
    },
    {
      name: [contributorsList[6]],
      data: [contributionTotal[6]]
    },
    {
      name: [contributorsList[7]],
      data: [contributionTotal[7]]
    },
    {
      name: [contributorsList[8]],
      data: [contributionTotal[8]]
    },
    {
      name: [contributorsList[9]],
      data: [contributionTotal[9]]
    }
  ];

  return (
    <Col span={17}>
      <div>
        <Chart options={options} series={series} type="bar" height="300" />
      </div>
    </Col>
  );
});

export default ContributorsChart;
