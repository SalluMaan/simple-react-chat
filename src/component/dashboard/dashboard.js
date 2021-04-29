import React, { Component } from 'react'
import ChatList from '../chatList/chatList'
import styles from './style';
import { Button, withStyles } from '@material-ui/core';
import ChatView from '../chatView/chatView';
import ChatTextBox from '../../chatTextBox/chatTextBox';
import NewChat from '../../newChat/newChat';

const firebase =require("firebase");
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state={
            selectedChat:null,
            newChatFormVisible:null,
            email:null,
            chats:[]
        }
    }

    goToChat = async (docKey,msg)=>{
        const userInChat=docKey.split(":")
        const chat =this.state.chats.find(_chat=> userInChat.every(_usr=>_chat.users.includes(_usr)));
        this.setState({
            newChatFormVisible:false
        })
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    }

    newChatSubmit=async (chatObj)=>{
        const docKey=this.buildDocKey(chatObj.sendTo);
        await firebase.firestore().collection("chats").doc(docKey).set({
            receiverHasRead:false,
            users:[this.state.email,chatObj.sendTo],
            messages:[{
                message:chatObj.message,
                sender:this.state.email
            }]
        })

        this.setState({
            newChatFormVisible:false
        })
        this.selectChat(this.state.chats.length - 1)
    }

    submitMessage=(msg)=>{
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr =>_usr !==this.state.email));
        console.log("DOC-KEY",docKey)
        firebase.firestore().collection("chats").doc(docKey).update({
            messages:firebase.firestore.FieldValue.arrayUnion({
                sender:this.state.email,
                message:msg,
                // timestamp:Date.now,


            }),
            receiverHasRead:false
        })
    }
    
    buildDocKey=(friend)=>[this.state.email,friend].sort().join(":")
    newChatBtnClicked=()=>{
        this.setState({
            newChatFormVisible:true,selectedChat:null
        })

    }

    selectChat= async (chatIndex)=>{
        console.log("Select Chat Parent",chatIndex)
      await  this.setState({
            selectedChat:chatIndex,
            newChatFormVisible:false
        })
        this.messageRead();
    }

    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(async _user=>{
          if(!_user){
              this.props.history.push("/login")
          }else{
              await firebase
              .firestore()
              .collection("chats")
              .where("users","array-contains",_user.email)
              .onSnapshot(async res=>{
                  const chats=res.docs.map(_doc=> _doc.data());
                      await this.setState({
                          email:_user.email,
                          chats:chats
                      });
                      console.log("State",this.state)
                  
              })
          }
      });
    };
    
    signOut = () => firebase.auth().signOut();
    messageRead=()=>{
        // console.log("MesageRead()")
        const docKey=this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr=> _usr !==this.state.email)[0]);
        console.log("MesageRead()",docKey)
        
        if(this.clickedMessageWhereNotSender(this.state.selectedChat)){
            firebase.firestore().collection("chats").doc(docKey).update({
                receiverHasRead:true
            })
        }else{
            console.log("Clicked Msg where is the user was sender")
        }
    }
    
    clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;


    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1>Dashboard</h1>
                <ChatList 
                newChatBtnClickedfn={this.newChatBtnClicked} 
                selectChatfn={this.selectChat}
                chats={this.state.chats}
                selectedChatIndex={this.state.selectedChat}
                userEmail={this.state.email}
                history={this.props.history}/>
                {
                    this.state.newChatFormVisible ? null:
                    <ChatView
                    // selectChat={this.selectChat}
                    chat={this.state.chats[this.state.selectedChat]}
                    // selectedChatIndex={this.state.selectedChat}
                    user={this.state.email}
                    // history={this.props.history}
                    
                    />
                    }
                    {
                        this.state.selectedChat !==null &&  !this.state.newChatFormVisible ? 
                        <ChatTextBox messageReadfn={this.messageRead} submitMessagefn={this.submitMessage}/>    :null                       
                        
                        }
                        {
                            this.state.newChatFormVisible ?
                            <NewChat goToChatfn={this.goToChat} newChatSubmitfn={this.newChatSubmit} /> :null

                        }
                
                <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);
