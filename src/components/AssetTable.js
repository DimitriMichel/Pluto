import React from "react";
import Table from "antd/es/table"
import Col from "antd/es/col"

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

  return (
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
  );
};
export default AssetTable;
