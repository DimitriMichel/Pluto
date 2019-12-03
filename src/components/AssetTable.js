import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Col } from "antd";

const AssetTable = React.memo(props => {
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
            title: "Individuals",
            dataIndex: "Individuals"
        },
        {
            title: "PACs",
            dataIndex: "PACs"
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
            total: industryTotal[0],
            PACs: politicalActionCommitteeTotal[0],
            Individuals: individualsTotal[0]
        },
        {
            key: "2",
            industry_name: industryList[1],
            total: industryTotal[1],
            PACs: politicalActionCommitteeTotal[1],
            Individuals: individualsTotal[1]
        },
        {
            key: "3",
            industry_name: industryList[2],
            total: industryTotal[2],
            PACs: politicalActionCommitteeTotal[2],
            Individuals: individualsTotal[2]
        },
        {
            key: "4",
            industry_name: industryList[3],
            total: industryTotal[3],
            PACs: politicalActionCommitteeTotal[3],
            Individuals: individualsTotal[3]
        },
        {
            key: "5",
            industry_name: industryList[4],
            total: industryTotal[4],
            PACs: politicalActionCommitteeTotal[4],
            Individuals: individualsTotal[4]
        },
        {
            key: "6",
            industry_name: industryList[5],
            total: industryTotal[5],
            PACs: politicalActionCommitteeTotal[5],
            Individuals: individualsTotal[5]
        },
        {
            key: "7",
            industry_name: industryList[6],
            total: industryTotal[6],
            PACs: politicalActionCommitteeTotal[6],
            Individuals: individualsTotal[6]
        },
        {
            key: "8",
            industry_name: industryList[7],
            total: industryTotal[7],
            PACs: politicalActionCommitteeTotal[7],
            Individuals: individualsTotal[7]
        },
        {
            key: "9",
            industry_name: industryList[8],
            total: industryTotal[8],
            PACs: politicalActionCommitteeTotal[8],
            Individuals: individualsTotal[8]
        },
        {
            key: "10",
            industry_name: industryList[9],
            total: industryTotal[9],
            PACs: politicalActionCommitteeTotal[9],
            Individuals: individualsTotal[9]
        }
    ];
    return (
        <Col span={12}>
            <Table

                columns={columns}
                dataSource={data}
                size="small"
                pagination={false}
                bordered={true}
                style={{ padding: "10px 0px 0px 10px", fontSize: "8vw !important"  }}
            />
        </Col>
    );
});
export default AssetTable;