import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const firebase = require("firebase");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: "",
    };
  }

  handleSignin = (e) => {
    e.preventDefault();
    console.log("Signin");
    if (!this.formIsValid()) {
      this.setState({
        signupError: "Password Doesn't Match",
      });
      return;
    }
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    );
    promise.then((authRes) => {
      const userObj = {
        email: authRes.user.email,
      };
      firebase
        .firestore()
        .collection("users")
        .doc(this.state.email)
        .set(userObj)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch((e) => {
          var err = e.message;
          console.log(err);
          this.setState({ signupError: err });
        });
    });
    promise.catch((e) => {
      var err = e.message;
      console.log(err);
      this.setState({ signupError: err });
    });

    //     const email=this.state.email;
    //     const password=this.state.password;
    //     console.log("Sign -",email,password);
    //     const auth=firebase.auth();
    //     const promise = auth.createUserWithEmailAndPassword(email,password);
    //     promise.then(user=>{
    //         console.log("UserUser---",user.user.email)
    //         var err = "Welcome "+ user.user.email;
    //   firebase.database().ref("users/"+user.uid).set({
    //     "email": user.user.email
    //   });
    //   console.log(user);
    //   this.setState({err: err});
    // });
    // promise
    // .catch(e => {
    //   var err = e.message;
    //   console.log(err);
    //   this.setState(({err: err}));
    // });
  };
  handleChange = (type, e) => {
    switch (type) {
      case "email":
        this.setState({
          email: e.target.value,
        });
        break;
      case "password":
        this.setState({
          password: e.target.value,
        });
        break;

      case "passwordConfirmation":
        this.setState({
          passwordConfirmation: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up!
          </Typography>
          <form onSubmit={(e) => this.handleSignin(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                id="signup-email-input"
                onChange={(e) => this.handleChange("email", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create a Password
              </InputLabel>
              <Input
                type="password"
                autoFocus
                id="signup-password-input"
                onChange={(e) => this.handleChange("password", e)}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Your Password
              </InputLabel>
              <Input
                type="password"
                autoFocus
                id="signup-password-confirmation-input"
                onChange={(e) => this.handleChange("passwordConfirmation", e)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Already Have An Account??
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Login In!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
