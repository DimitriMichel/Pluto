import React from "react";
import Chart from "react-apexcharts";
import Col from "antd/es/col";

const PieChartMoneySpent = React.memo(props => {
  /**Percentage of Money Spent Pie Chart**/

  const total = props.politicianFinancialSumary.total;
  const spent = props.politicianFinancialSumary.spent;

  const percentageSpent = (spent / total) * 100;
  const percentSaved = 100 - percentageSpent;

  const options = {
    labels: ["Money Spent", "Money Saved"],
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
  /**Percentage of Votes Missed Pie Chart**/
  const votesAttended = Math.round(100 - props.politicianInfo.missed_votes_pct);
  const votesMissed = Math.round(props.politicianInfo.missed_votes_pct);

  const voteChartOptions = {
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

  /**Votes With or Against Party Pie Chart**/

  const voteChartSeries = [votesAttended, votesMissed];
  const series = [Math.round(percentageSpent), Math.round(percentSaved)];

  const votesWith = Math.round(props.politicianInfo.votes_with_party_pct);
  const votesAgainst = Math.round(
    100 - props.politicianInfo.votes_with_party_pct
  );

  const partyChartOptions = {
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
  const partyChartSeries = [votesWith, votesAgainst];

  return (
    <div>
      <Col span={8}>
        <div>
          <Chart
            options={voteChartOptions}
            series={voteChartSeries}
            type="pie"
            height="200"
          />
        </div>
      </Col>
      <Col span={8}>
        <div
          style={{
            background: "#F0F2F5",
            padding: "0px"
          }}
        >
          <Chart options={options} series={series} type="pie" height="200" />
        </div>
      </Col>
      <Col span={8}>
        <div>
          <Chart
            options={partyChartOptions}
            series={partyChartSeries}
            type="pie"
            height="200"
          />
        </div>
      </Col>
    </div>
  );
});

export default PieChartMoneySpent;
