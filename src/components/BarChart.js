import React from 'react';
import { Col } from "antd";
import ReactFrappeChart from "react-frappe-charts";
import Chart from "frappe-charts";


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

    return <Col span={20}>
        <Chart
            type="bar"
            colors={["#21ba45"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1, truncateLegends:true,  }}
            height={250}
            data={{
                labels: contributorsList,
                datasets: [{ values: contributionTotal }]
            }}
        />
    </Col>
};

export default BarChart