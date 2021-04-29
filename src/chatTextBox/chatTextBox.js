import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './style';
import { withStyles } from '@material-ui/core/styles';


class ChatTextBox extends Component {
    constructor(props) {
        super(props)
        this.state={
            chatText:""
        }
    }
    
    userClickedInput=()=>{
        this.props.messageReadfn();
    }

    submitMessage=()=>{
        console.log("Subit")
        if(this.messageValid(this.state.chatText)){
            this.props.submitMessagefn(this.state.chatText)
            document.getElementById("chattextbox").value = "";
        }
    }
    userTyping=e=>{
        console.log("Typing")
        e.keyCode === 13 ? this.submitMessage() : this.setState({chatText:e.target.value})
    }
    messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

    render() {
        const { classes } = this.props;
        return <div className={classes.chatTextBoxContainer}>
  <TextField
          placeholder='Type your message..' 
          onKeyUp={(e) => this.userTyping(e)}
          id='chattextbox' 
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}>
        </TextField>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>

        </div>
    }
}

export default withStyles(styles)(ChatTextBox);

