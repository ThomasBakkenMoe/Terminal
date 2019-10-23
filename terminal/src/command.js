import React from 'react';
import './App.css';
import {Component} from 'react-simplified';

export class Command extends Component{
    render(){
        return(
            <div>
                <div className="root">
                    ~root $
                </div>
                <div className="text">
                    {this.props.children}
                </div>
            </div>
        )
    }
}