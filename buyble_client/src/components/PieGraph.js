import PieChart from 'react-minimal-pie-chart';
import React, { Component } from 'react';

export class PieGraph extends Component {
    
    render(){
        console.log(this.props.data);
        return(
            
            <PieChart
                data = {this.props.data}
            />
        )
    }
}