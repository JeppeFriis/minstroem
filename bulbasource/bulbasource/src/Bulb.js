import React from 'react';
import './App.css';
import {PieChart, Pie, ResponsiveContainer, Cell, Sector} from 'recharts';

class Bulb extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1,
        }
    }

    renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, fill, fillOpacity}) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius);
        
        const ax = cx + 0.9 * radius * Math.cos(-midAngle * RADIAN);
        const ay = cy + 0.9 * radius * Math.sin(-midAngle * RADIAN);
        
        const bx = cx + 1.1 * radius * Math.cos(-midAngle * RADIAN);
        const by = cy + 1.1 * radius * Math.sin(-midAngle * RADIAN);

        const zx = cx + 1.2 * radius * Math.sign(Math.cos(-midAngle * RADIAN));

        const x = cx + 0.6 * radius * Math.cos(-midAngle * RADIAN);
        const y = cy + 0.6 * radius * Math.sin(-midAngle * RADIAN);

        return (
            <g className="fade-in">
                <path d={`M${ax},${ay}Q${bx},${by},${zx},${by}`} strokeWidth="2" stroke={fill} fill='none'/>
                <text x={zx + 0.005 * cx * Math.sign(Math.cos(-midAngle * RADIAN))} y={by} fill={fill} textAnchor={zx > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${this.props.data[index].name}`}
                </text>
                <text x={x} y={y} fill='white' fillOpacity="0.30" textAnchor={'middle'} fontSize={"3vmin;"} fontWeight="600" dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    };

    render() {
        return (
            <div className="center">
                <img id="bulb" src="/bulb.png"></img>
                <ResponsiveContainer id="pie-chart-container" width="200%" aspect={1}>
                    <PieChart id="pie-svg">
                        <Pie 
                            isAnimationActive={true} 
                            animationDuration={800}
                            data={this.props.data} 
                            outerRadius="47.5%"
                            animationEasing = 'ease'
                            stroke = "#fefcad"
                            strokeWidth = "0.3%"
                            onClick = {this.props.onSourceClick}
                            labelLine = {false}
                            label = {this.renderCustomizedLabel}
                        >
                            {
                                this.props.data.map((entry, index) => <Cell fill={this.props.data[index % this.props.data.length].color}/>)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Bulb;