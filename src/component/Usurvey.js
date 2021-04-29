import React, { Component } from 'react'
var firebase=require("firebase");
var uuid=require("uuid");

const firebaseConfig = {
    apiKey: "AIzaSyAqOJreHXXWGTM99gtmrAszq53ub7RW9EQ",
    authDomain: "usurvey-firebase.firebaseapp.com",
    databaseURL: "https://usurvey-firebase.firebaseio.com",
    projectId: "usurvey-firebase",
    storageBucket: "usurvey-firebase.appspot.com",
    messagingSenderId: "364301318446",
    appId: "1:364301318446:web:d0e1ef962d62941416a2bf",
    measurementId: "G-9MDXVFNVMJ"
  };
  firebase.initializeApp(firebaseConfig);

export default class Usurvey extends Component {
    constructor(props) {
        super(props)
        
    }
    
    state={
        name:"",
        nameFlag:false,
        isSubmit:false,
        uid:uuid.v1(),
        answers:{
            answer1:"",
            answer2:"",
            answer3:""
        }


    }
    onInputChange=(e)=>{
        console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
    e.preventDefault();

    };
    
    nameSubmit=(e)=>{
        this.setState({nameFlag:true});
        console.log("Name :",this.state);
        e.preventDefault();

    };
    
    answerSelected=(e)=>{
        var answers =this.state.answers;
        if (e.target.name==="answer1") {
            answers.answer1=e.target.value;
        }else if (e.target.name==="answer2") {
            answers.answer2=e.target.value;
        }else if (e.target.name==="answer3") {
            answers.answer3=e.target.value;
        }

        this.setState({
            answers
        },()=>{
            console.log("Selected",this.state)
        })

    }

    questionSubmit=e=>{
        firebase.database().ref("Usurvey/"+this.state.uid).set({
            name:this.state.name,
            answers:this.state.answers  
        });
        this.setState({
            isSubmit:true
        })
        this.get();

    }


    // get data from db
    get(){
        var database=firebase.database();
        var ref=database.ref("Usurvey");
        var data;
        ref.on("value",function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                data=childSnapshot.val();
                console.log(data.name)
            })
            
        })

    }
    render(){
        var std_name;
        var questions;
        var result;

        if(this.state.name ==="" || this.state.isSubmit===false ){
            std_name=
            <div>
                <h1>Hey Students Let us your name:</h1>
                <form>
                    <input className="namy" onChange={this.onInputChange} name="name" type="text" placeholder="Enter Your Name..."/>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={this.nameSubmit} > Ok  </button>
                </form>
            </div>;
            console.log("Name state:",this.state.name)
        }
        if(this.state.nameFlag===true && this.state.isSubmit===false){
            console.log("ELSEIF")
        std_name=<h1>Welcome To The Survey {this.state.name}</h1>;
        questions= <div>
            <h2>Here are the questions u need to answer:</h2>
            <form onSubmit={this.questionSubmit}>
                <div className="card d-inline-block">
                    <label htmlFor="">What kind of courses you like the most:</label>
                    <br/>
                    <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> Technology
                    <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} /> Design
                    <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} /> Marketing
                </div>
                <br/>

                <div className="card d-inline-block">
                    <label htmlFor="">You are a:</label>
                    <br/>
                    <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} /> Student
                    <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} /> in-job
                    <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} /> looking-job
                </div>
                <br/>

                <div className="card d-inline-block">
                    <label htmlFor="">Is online Learning helpful: </label>
                    <br/>
                    <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} /> Yes
                    <input type="radio" name="answer3" value="no" onChange={this.answerSelected} /> No
                    <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} /> May be
                </div>
                <br/>

                <input className="feedback-button" type="submit" value="submit"/>

            </form>
        </div>

        } else if(this.state.isSubmit === true){
        std_name=<div><h1>Thanks, {this.state.name}</h1>
        <h3>Answers :</h3>
        <h6>What kind of courses you like the most:<h5 className="text-primary">{this.state.answers.answer1}</h5></h6>
        <h6>You are a:<h5 className="text-primary">{this.state.answers.answer2}</h5></h6>
        <h6>Is online Learning helpful:<h5 className="text-primary"> {this.state.answers.answer3}</h5></h6>
        </div>
        
        }
        return (
            <div>
                {std_name}
                ___________________________________________
                {questions}
            </div>
        )
    }
}
