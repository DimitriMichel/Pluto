import React from 'react';
import { Col } from "antd";
import {chart} from "frappe-charts/dist/frappe-charts.esm"

const BarChart = props => {
    const contributorsList = [];
    const contributionTotal =[];
    props.contributions.forEach(contributor =>
        contributorsList.push(contributor["@attributes"].org_name)
    );
    props.contributions.forEach(contributor =>
        contributionTotal.push(contributor["@attributes"].total)
    );
    console.log(props);
    console.log(contributorsList);
    console.log(contributionTotal);
    return <Col span={18}>BarChart</Col>
};

export default BarChart