import React from "react";
import "antd/dist/antd.css";
import { Table, Col } from "antd";

const IndustryTable = React.memo(props => {
  console.log("Industry Table");
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



  const columns = [
    {
      title: "Industry",
      dataIndex: "industry_name",
      width: 210
    },
    {
      title: "Individuals",
      dataIndex: "Individuals",
      width: 210
    },
    {
      title: "PACs",
      dataIndex: "PACs",
      width: 210
    },
    {
      title: "Total",
      dataIndex: "total",

    }
  ];
  const data = [];
  props.politicianIndustries.forEach((industry, index) => {
    const industry_data = {
      key: index,
      industry_name: industry["@attributes"].industry_name,
      total: `$${industry["@attributes"].total}`,
      PACs: `$${industry["@attributes"].pacs}`,
      Individuals: `$${industry["@attributes"].indivs}`
    };
    data.push(industry_data);
  });
  console.log(data);
  return (
    <Col span={12}>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        scroll={{ x: 1300 }}
        pagination={false}
        bordered={true}
        style={{ padding: "10px 10px 0px 0px"}}
      />
    </Col>
  );
});
export default IndustryTable;
