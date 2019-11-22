import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { Col } from "antd";

const ContributionChart = props => {
    const contributorsList = [];
    const contributionTotal =[];
    props.contributions.forEach(contributor =>
        contributorsList.push(contributor["@attributes"].org_name)
    );
    props.contributions.forEach(contributor =>
        contributionTotal.push(contributor["@attributes"].total)
    );
    console.log(props);

const BarChart = ({ data }) =>
    <C3Chart data={{ json: data, type: 'bar' }} />;

const chartData = {
    bar: {
        [contributorsList[0]]:  [50],
        [contributorsList[1]]: [130, 100, 140, 200, 150, 50],
        [contributorsList[2]]:  [50],
        [contributorsList[3]]:  [50],
        [contributorsList[4]]:  [50],
        [contributorsList[5]]:  [50],
        [contributorsList[5]]:  [50],
        [contributorsList[7]]:  [50],
        [contributorsList[8]]:  [50],
        [contributorsList[9]]:  [50],
    }
};


    return <Col span={20}>
        <div>
            <BarChart data={chartData.bar} />
        </div>
    </Col>
};

export default ContributionChart