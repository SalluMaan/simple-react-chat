import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './style';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require("firebase");

class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: null,
          password: null,
          serverError: false
        };
      }


    handleChange=(type,e)=>{
        switch (type) {
            case "email":
                this.setState({
                    email:e.target.value
                })
                break;
            case "password":
                this.setState({
                    password:e.target.value
                })
                break;
        
            case "passwordConfirmation":
                    this.setState({
                        passwordConfirmation:e.target.value
                    })
                    break;
                    
    
            default:
                break;
        }
    }
    handleLogin= async (e)=>{
        e.preventDefault();
        //authentication with firebase
        const auth=firebase.auth();
       const promise = auth.signInWithEmailAndPassword(this.state.email,this.state.password);

       promise.then(()=>{
        this.props.history.push("/dashboard")
       })
       .catch(err=>{
        this.setState({ serverError: true });
        console.log('Error logging in: ', err);
       })

    }

    // formIsValid=()=>this.state.password ===this.state.passwordConfirmation
   
    render() {
        const { classes } = this.props;
        return (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                Log In!
              </Typography>
              <form
                onSubmit={(e) => this.handleLogin(e)}
                className={classes.form}
              >
                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="login-email-input">
                    Enter Your Email
                  </InputLabel>
                  <Input
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => this.handleChange("email", e)}
                    id="login-email-input"
                  ></Input>
                </FormControl>
                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="login-password-input">
                    Enter Your Password
                  </InputLabel>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    onChange={(e) => this.handleChange("password", e)}
                    id="login-password-input"
                  ></Input>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
              </form>
              {this.state.serverError ? (
                <Typography
                  className={classes.errorText}
                  component="h5"
                  variant="h6"
                >
                  Incorrect Login Information
                </Typography>
              ) : null}
              <h5 className={classes.noAccountHeader}>
                Don't Have An Account?
              </h5>
              <Link className={classes.signUpLink} to="/signup">
                Sign Up!
              </Link>
            </Paper>
          </main>
        );
    }
}

export default withStyles(styles)(Login);
