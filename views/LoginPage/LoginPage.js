import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
//import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
//Blockchain code
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import ErrorBox from "components/Errorbox/Error.js";
import { useHistory } from "react-router-dom"; // version 5.2.0
// import { useMoralis } from "react-moralis";

//import image from "assets/img/bg7.jpg";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { isAuthenticated } = useMoralis();
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  ////blockchain
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const { authError, login } = useMoralis();
  const history = useHistory();

  if (isAuthenticated) {
    // const history = useHistory();

    history.push("/landing-page");
  }
  ///reset password
  const loginFunction = async (email, password) => {
    await login(email, password);
    console.log("Login called");
    // console.log(authError);
    // const id = Moralis.User.current();
    // var log = "login";
    // var user;
  };
  // const resetPassword = () => {
  //   //getting email from email input
  //   if (email) {
  //     Moralis.User.requestPasswordReset(email)
  //       .then(() => {
  //         alert("Successfully Password Email Sent");
  //         // Password reset request was sent successfully
  //       })
  //       .catch((error) => {
  //         // Show the error message somewhere
  //         alert("Error: " + error.code + " " + error.message);
  //       });
  //   } else {
  //     alert("Enter email first");
  //   }
  // };
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // console.log(Object.keys(formErrors).length);
    // console.log(isSubmit);
    // if (Object.keys(formErrors).length === 0) {

    // }
  };
  function checkData() {
    console.log("Inside check data function for login");
    loginFunction(formValues.email, formValues.password);

    history.push("/landing-page");
  }
  useEffect(() => {
    // console.log(formErrors);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {
    //   console.log(formValues);
    // }
    return () => {
      setFormValues({}); // This worked for me
      setFormErrors({});
      setIsSubmit({});
      setCardAnimation({});
      loginFunction({});
    };
  }, []);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    // if (!values.username) {
    //   errors.username = "Username is required!";
    // }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div>
      <Header
        absolute
        color="white"
        brand="MARKAZ"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 40,
          color: "white",
        }}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundColor: "#008060",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="green" className={classes.cardHeader}>
                    <h4> Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  {authError && (
                    <ErrorBox
                      alert="Invalid Credentials"
                      message={authError.message}
                    />
                  )}
                  {/* <Button
                    className={classes.metamaskButton}
                    isLoading={isAuthenticating}
                    onClick={() => authenticate()}
                  >
                    Authentication with MetaMask
                  </Button> */}
                  <p className={classes.divider}></p>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      // onChange={(event) => setEmail(event.currentTarget.value)}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p className={classes.warningPara}>{formErrors.email}</p>

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      // value={password}
                      // onChange={(event) =>
                      //   setPassword(event.currentTarget.value)
                      // }
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <p className={classes.warningPara}>{formErrors.password}</p>
                  </CardBody>
                  {/* <Button
                    simple
                    color="green"
                    size="sm"
                    onClick={resetPassword}
                    className={classes.loginbtn}
                  >
                    Forgot Password?
                    {/* Request Password change for{" "}
                    {email ? email : "[Please enter email in field]"} */}
                  {/* </Button>  */}
                  <CardFooter className={classes.cardFooter}>
                    {Object.keys(formErrors).length === 0 && isSubmit
                      ? // <div className="ui message success">Signed in successfully</div>
                        checkData()
                      : console.log("Error in form!")}
                    <Button
                      color="black"
                      // href=""
                      onClick={handleSubmit}
                      // onClick={() => loginFunction(email, password)}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                  <div className={classes.endings}>
                    <h4 className={classes.new}>Not a member?</h4>
                    {/* <h4> */}
                    <Button simple color="green" size="lg" href="/signup-page">
                      Signup now
                    </Button>

                    {/* </h4> */}
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
