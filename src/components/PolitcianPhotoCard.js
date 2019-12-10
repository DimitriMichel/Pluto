import React from "react";
import { Card, Col } from "antd";
import "./PoliticianPhotoCard.css";
const { Meta } = Card;

const PolitcianPhotoCard = props => {
  //console.log(props.politicianInfo);
  return (
    <Col xs={11} sm={11} md={11} lg={4}>
      <Card
        bodyStyle={{ padding: "10px" }}
        cover={
          <img
            className="politicianImage"
            alt="Politician"
            src={`https://theunitedstates.io/images/congress/original/${props.politicianInfo.id}.jpg`}
          />
        }
      >
        <Meta className="cardtitle" title={props.politicianInfo.full_name} />
      </Card>
    </Col>
  );
};
export default PolitcianPhotoCard;
