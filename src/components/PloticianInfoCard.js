import React from "react";
import { Card, Divider } from "antd";
import Chart from "react-apexcharts";

const PolitcianInfoCard = React.memo(props => {
  const politcianState = props.politicianInfo.state;
  let politcianParty;
  let politicianTitle;
  if (props.politicianInfo.party === "R") {
    politcianParty = "Republican";
  } else if (props.politicianInfo.party === "D") {
    politcianParty = "Democrat";
  } else {
    politcianParty = "Independent";
  }
  if (props.politicianInfo.short_title === "Sen.") {
    politicianTitle = "Senator";
  } else {
    politicianTitle = "Representative";
  }

  return (
    <Card bodyStyle={{ padding: 12 }}>
      <p style={{ margin: 0 }}>{politcianParty}</p>
      <Divider dashed="true" style={{ margin: 12 }} />
      <p style={{ margin: 0 }}>State: {politcianState}</p>
      <Divider dashed="true" style={{ margin: 12 }} />
      <p style={{ margin: 0 }}>{politicianTitle}</p>
      <Divider dashed="true" style={{ margin: 12 }} />
      <p style={{ margin: 0 }}>
        <a>Contact</a>
      </p>
    </Card>
  );
});

export default PolitcianInfoCard;
