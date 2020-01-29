import React from "react";
import { Card, Col, Divider } from "antd";
const { Meta } = Card;

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
    <div>
      <Col xs={11} sm={11} md={11} lg={4}>
        <Card
          bodyStyle={{ padding: "10px" }}
          cover={
            <img
              className="politicianImage"
              alt="Politician"
              src={`https://theunitedstates.io/images/congress/225x275/${props.politicianInfo.id}.jpg`}
            />
          }
        >
          <Meta className="cardtitle" title={props.politicianInfo.full_name} />
        </Card>
      </Col>
      <Col xs={13} sm={13} md={13} lg={3}>
        <Card style={{ maxWidth: 170 }} bodyStyle={{ padding: 12 }}>
          <p style={{ margin: 0 }}>{politcianParty}</p>
          <Divider dashed="true" style={{ marginTop: 10, marginBottom: 13 }} />
          <p style={{ margin: 0 }}>State: {politcianState}</p>
          <Divider dashed="true" style={{ marginTop: 10, marginBottom: 13 }} />
          <p style={{ margin: 0 }}>{politicianTitle}</p>
          <Divider dashed="true" style={{ marginTop: 10, marginBottom: 15 }} />
          <p style={{ margin: 0 }}>
            <a
              href={props.politicianInfo.url}
              style={{
                backgroundColor: "#5482DB",
                color: "white",
                padding: "5px 10px 5px 10px",
                borderRadius: "3px"
              }}
            >
              Website
            </a>
          </p>
        </Card>
      </Col>
    </div>
  );
};

export default PolitcianInfoCard;
