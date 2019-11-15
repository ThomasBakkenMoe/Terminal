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
        let textBar = document.querySelector(".text").innerHTML;
        switch (code) {
            case "Backspace":

                textBar.innerHTML.strike();

        }
        if(code != "Enter"){
            textBar += code;
        } else {
            let command = textBar.innerHTML;
            console.log(command);
        }
    }

    handleKeyPress = (event) =>{

        let textBar = document.querySelector(".text");

        if (event.key === 'Enter'){
            console.log("Enter pressed!");
            textBar.innerHTML = "";
        }else if (event.keyCode === 8){
            console.log("Backspace pressed!");
            textBar.innerHTML = textBar.innerHTML.substr(0, textBar.innerHTML.length-2);
        } else {
            textBar.innerHTML += event.key;
        }
    };

    render(){

        window.onkeydown = a => this.handleKeyPress(a);
        return(
            <div className="container">
                <Command></Command>
            </div>

        )
    }
}