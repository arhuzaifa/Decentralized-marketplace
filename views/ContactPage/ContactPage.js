import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

import image from "assets/img/bg7.jpg";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const initialValues = { username: "", email: "", message: "" };
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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.message) {
      errors.message = "Message is required";
    } else if (values.message.length < 10) {
      errors.message = "Message must be more than 10 characters";
    } else if (values.message.length > 120) {
      errors.message = "Message cannot exceed more than 120 characters";
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
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem justifyContent="left" xs={12} sm={12} md={6}>
              <h1>Get in touch</h1>
              <h className={classes.subheading}>
                You need more information? Check what other persons are saying
                about our services.Send us a message in case of any query.
              </h>
              <h2>Find us at the office</h2>
              <p className={classes.subheading}>
                Johar Iqbal Town<br></br>
                288 Block C<br></br>Lahore,Pakistan
              </p>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="gray" className={classes.cardHeader}>
                    <h4>Contact Us</h4>
                  </CardHeader>
                  <p className={classes.divider}></p>
                  <CardBody>
                    <CustomInput
                      labelText="Your Name"
                      id="first"
                      name="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={formValues.username}
                      onChange={handleChange}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p className={classes.warningPara}>{formErrors.username}</p>

                    <CustomInput
                      labelText="Email address"
                      id="email"
                      name="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={formValues.email}
                      onChange={handleChange}
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
                      labelText="Your message"
                      id="message"
                      name="message"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={formValues.message}
                      onChange={handleChange}
                      inputProps={{
                        type: "text",
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
                    <p className={classes.warningPara}>{formErrors.message}</p>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      color="green"
                      href="/contact-page"
                      onClick={handleSubmit}
                    >
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
}
