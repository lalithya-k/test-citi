import React,{useState} from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

const BarGraph = ({data,colors}) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const spent = () => {
        let sum = 0
        for(let i=0;i<data.length;i++)
        {
            sum = sum + data[i].expenseAmount
            console.log(sum)
        }
        return sum
    }
    
    return (
        <div>
        <BarChart width={600} height={500} data={data}
        style={{marginTop : '70px', marginRight : '-120px'}}
        >
            
            <Bar dataKey="expenseAmount" label={{ position: "top" }}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${colors[index % colors.length]})`} />
                ))}
            </Bar>


            
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </BarChart>
        <h2 style={{ marginTop: '20px' , fontSize : '30px'}} >{`Total Amount Spent : ${spent()}`}</h2>
        </div>
    );
}

export default BarGraph