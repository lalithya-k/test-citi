// import "./App.css";
import React from "react";
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
 
// Sample chart data
const pdata = [
    {
        name: "Day 1",
        Current: 1340,
        // key : 13,
        Previous: 1040,
        Average : 1100,
    },
    // {
    //     name: "Day 1",
    //     student: 15,
    //     Prev: 12,
    // },
    // {
    //     name: "Day 2",
    //     student: 5,
    //     Prev: 10,
    // },
    // {
    //     name: "Day 2",
    //     student: 10,
    //     Prev: 5,
    // },
    {
        name: "Day 2",
        // key : 5,
        Current: 470,
        Previous: 700 ,
        Average : 1100,
    },
    // {
    //     name: "Day 3",
    //     student: 10,
    //     Prev: 8,
    // },
    {
        name: "Day 3",
        Current: 1200,
        Previous: 800,
        Average : 1100,
    },
    {
        name: "Day 4",
        Current: 1120,
        Previous: 1000,
        Average : 1100,
    },
    // {
    //     name: "Week 9",
    //     student: 10,
    //     Prev: 8,
    // },
    {
        name: "Day 5",
        Current:  604,
        Previous: 800 ,
        Average : 1100,
    },
    {
        name: "Day 6",
        Current: 1510,
        Previous: 1400,
        Average : 1100,
    },
    // {
    //     name: "Week 12",
    //     student: 10,
    //     Prev: 8,
    // },
    {
        name: "Day 7",
        Current: 1000,
        Previous: 902,
        Average : 1100,
    },
];  

const LineGraph = () => {
    return (
        <>
            {/* <h2 className="text-heading">Line Chart</h2> */}
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={pdata} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line
                        dataKey="Current"
                        stroke="#3498db"
                        activeDot={{ r: 8 }}
                    />
                    <Line dataKey="Previous" stroke="red" activeDot={{ r: 8 }} />
                    <Line dataKey="Average" stroke="#07bc0c" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default LineGraph