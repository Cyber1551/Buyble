import React from 'react'
import Client from '../client';
import { auth } from './auth';

export class ListElement extends React.Component
{
   
    constructor(props)
    {
        super(props); 
        this.state = {
            data: [],
            reload: false
        }
    }
    render()
    {
        if (this.state.reload == false)
        {
            this.state.data = this.props.data;
        }
        else
        {
            this.setState({reload: false})
        }
       

        this.items = this.state.data.map((item, key) => {
            console.log(item)
            return (
                <div style={{
                    width: "100%",
                    height: "40px",
                    marginTop: "5px",
                    border: "1px solid black", 
                    textAlign: "left",
                    paddingLeft: "5px"
                }}><div style={{float:"left"}}>{item.name}</div><div style={{float:"right", paddingRight: "20px"}}>Quantity: {item.value}   <button onClick={(e) => this.onClickSub(item.name)}>-</button><button onClick={(e) => this.onClickAdd(item.name)}>+</button></div></div>
             )
        })
        return (
            this.items
        )
         
           
      
    }
    onClickAdd(name)
    {
        let current = this;
        Client.SendToServer("POST", `product/${name}/add`, {"user": auth.getUsername()}, function(data)
        {
            if (data.res)
            {
                current.reloadData()
                
            }
        })
    }
    onClickSub(name)
    {
        let current = this;
        Client.SendToServer("POST", `product/${name}/sub`, {"user": auth.getUsername()}, function(data)
        {
            if (data.res)
            {
                current.reloadData()
                
            }
        })
    }

    reloadData()
    {
        let current = this;
        Client.SendToServer('POST', 'product_list', { "user": auth.getUsername() }, function (data) {
            current.props.home.setState({data: data.res})
            current.setState({reload: true, data: data.res})
        });
    }
}