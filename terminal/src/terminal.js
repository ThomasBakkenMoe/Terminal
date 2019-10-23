import React from 'react';
import './App.css';
import {Component} from 'react-simplified';
import {Command} from "./command";

export class Terminal extends Component{

    /*
    Want to add Weather, to give weather info about your location
    Movies, to give local movie theatre information
    Joke, to give random joke
     */

    addText(code){
        let textBar = document.querySelector(".text");
        if(code != "Enter"){
            textBar.innerHTML += code;
        } else {
            let command = textBar.innerHTML;
            console.log(command);
        }

    }
    render(){

        window.onkeypress = a =>  this.addText(a.key);
        return(
            <div className="container">
                <Command></Command>
            </div>

        )
    }
}