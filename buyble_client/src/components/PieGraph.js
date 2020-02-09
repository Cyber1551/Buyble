import PieChart from 'react-minimal-pie-chart';
import React, { Component } from 'react';

export class PieGraph extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            data: [],
        }
    }
    render(){
        return(
            <PieChart
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}
            />
        )
    }
}