import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Legend, Tooltip,
} from 'recharts';

export default class PieGraph extends PureComponent {
 constructor(props)
 {
    super(props);
 }
  render() {
      console.log(this.props.data)
    if (this.props.data[0] == null)
    {
        return (
            <p><br />Empty...Go to the "Products" Tab to begin</p>
        )
    }
    else
    {
        return (
            <PieChart width={700} height={700}>
              <Pie dataKey="value" isAnimationActive={false} data={this.props.data} cx={350} cy={350} outerRadius={200} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          );
    }
    
  }
}
