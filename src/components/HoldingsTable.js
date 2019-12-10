import React from "react";
import "antd/dist/antd.css";
import { Table, Col } from "antd";

const HoldingsTable = React(props => {
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
            dataIndex: "total"
        }
    ];

    // list of dictionaries created to fulfill dataSource requirement of antd table. *index required*
    const data = props.politicianIndustries.map((industry, index) => {
        const { industry_name, total, pacs, indivs } = industry["@attributes"];
        return {
            key: index,
            industry_name,
            total,
            PACs: pacs,
            Individuals: indivs
        };
    });

    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Table
                columns={columns}
                dataSource={data}
                size="small"
                scroll={{ x: 850 }}
                pagination={false}
                bordered={true}
                style={{ padding: "10px 10px 0px 0px" }}
            />
        </Col>
    );
});
export default HoldingsTable;
