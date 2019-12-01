import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Col } from "antd";

const IndustryTable = React.memo(props => {
  console.log(props);
  const industryList = [];
  const industryTotal = [];
  const politicalActionCommitteeTotal = [];
  const individualsTotal = [];

  props.politicianIndustries.forEach(industry =>
    industryList.push(industry["@attributes"].industry_name)
  );
  props.politicianIndustries.forEach(industry =>
    industryTotal.push(industry["@attributes"].total)
  );
  props.politicianIndustries.forEach(industry =>
    politicalActionCommitteeTotal.push(industry["@attributes"].pacs)
  );
  props.politicianIndustries.forEach(industry =>
    individualsTotal.push(industry["@attributes"].indivs)
  );
  console.log(industryTotal);
  console.log(individualsTotal);
  console.log(politicalActionCommitteeTotal);
  const columns = [
    {
      title: "Industry",
      dataIndex: "industry_name"
    },
    {
      title: "Total",
      dataIndex: "total"
    }
  ];
  const data = [
    {
      key: "1",
      industry_name: industryList[0],
      total: industryTotal[0]
    },
    {
      key: "2",
      industry_name: industryList[1],
      total: industryTotal[1]
    },
    {
      key: "4",
      industry_name: industryList[3],
      total: industryTotal[3]
    },
    {
      key: "5",
      industry_name: industryList[4],
      total: industryTotal[4]
    },
    {
      key: "6",
      industry_name: industryList[5],
      total: industryTotal[5]
    },
    {
      key: "7",
      industry_name: industryList[6],
      total: industryTotal[6]
    },
    {
      key: "8",
      industry_name: industryList[7],
      total: industryTotal[7]
    },
    {
      key: "9",
      industry_name: industryList[8],
      total: industryTotal[8]
    },
    {
      key: "10",
      industry_name: industryList[9],
      total: industryTotal[9]
    }
  ];
  return (
    <Col span={11}>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        bordered={true}
        style={{ padding: "10px 0px 0px 0px"  }}
      />
    </Col>
  );
});
export default IndustryTable;
