import React from "react";
import Table from "antd/es/table";
import Col from "antd/es/col";

const AssetTable = props => {
  const columns = [
    {
      title: "Investment",
      dataIndex: "name",
      width: 210
    },
    {
      title: "Holdings",
      dataIndex: "holdings",
      width: 210
    }
  ];

  // list of dictionaries created to fulfill dataSource requirement of antd table. *index required*

  const data = props.politicianAssets.map((asset, index) => {
    const { name, holdings_high } = asset["@attributes"];
    return {
      key: index,
      name,
      holdings: `$${holdings_high}`
    };
  });

  const industryColumns = [
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
      dataIndex: "totalDonated"
    }
  ];

  // list of dictionaries created to fulfill dataSource requirement of antd table. *index required*
  const industryData = props.politicianIndustries.map((industry, index) => {
    const { industry_name, total, pacs, indivs } = industry["@attributes"];
    return {
      key: index,
      industry_name,
      totalDonated: `$${total}`,
      PACs: `$${pacs}`,
      Individuals: `$${indivs}`
    };
  });
  console.log(props.politicianAssets[0]["@attributes"].name);

  //if props.proliticanAssets["@attributes"].name is null member had no assets and in parent components has only 1 default state.
  return (
    <div>
      {props.politicianAssets[0]["@attributes"].name !== "null" ? (
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={false}
            bordered={true}
            style={{ padding: "10px 10px 0px 0px" }}
          />
        </Col>
      ) : (
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Table
            size="small"
            pagination={false}
            bordered={true}
            style={{ padding: "10px 10px 0px 0px" }}
          />
        </Col>
      )}
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Table
          columns={industryColumns}
          dataSource={industryData}
          size="small"
          scroll={{ x: 850 }}
          pagination={false}
          bordered={true}
          style={{ padding: "10px 10px 0px 0px" }}
        />
      </Col>
    </div>
  );
};
export default AssetTable;
