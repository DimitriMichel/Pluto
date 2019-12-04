import React from "react";
import { Card, Col, Divider, Row } from "antd";
import Chart from "react-apexcharts";

const PolitcianInfoCard = props => {
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
    <Col xs={13} sm={13} md={13} lg={3}>
      <Card style={{maxWidth: 170}} bodyStyle={{ padding: 12 }}>
        <p style={{ margin: 0 }}>{politcianParty}</p>
        <Divider dashed="true" style={{ marginTop: 10, marginBottom: 13 }} />
        <p style={{ margin: 0 }}>State: {politcianState}</p>
        <Divider dashed="true" style={{ marginTop: 10, marginBottom: 13 }} />
        <p style={{ margin: 0 }}>{politicianTitle}</p>
        <Divider dashed="true" style={{ marginTop: 10, marginBottom: 15 }} />
        <p style={{ margin: 0 }}>
          <a>Contact</a>
        </p>
      </Card>
    </Col>
  );
};

export default PolitcianInfoCard;
