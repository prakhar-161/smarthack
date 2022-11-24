import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import "./login.css";
import FormInput from "./FormInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    companyname: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      required: true,
      autocomplete:"off",
      pattern: "^[A-Za-z0-9]{3,50}$",
      errorMessage:
        "Username should be 3-50 characters!",
      placeholder: "Username",
      label: "Enter your Username",
    },
    {
      id: 2,
      name: "companyname",
      type: "text",
      autocomplete:"off",
      required: true,
      errorMessage: "Company name is compulsory!",
      placeholder: "Company Name",
      label: "Enter Company Name",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      required: true,
      autocomplete:"off",
      errorMessage:
        "Password should be atleast 6-16 characters and must include atleast 1 letter, 1 number and 1 special character ",
      placeholder: "Password",
      label: "Enter password",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = JSON.stringify(Object.fromEntries(data.entries()));
    const myObj = JSON.parse(payload);

    axios
      .post("/api/user/signup/", {
        username: myObj.username,
        companyname: myObj.companyname,
        password: myObj.password,
      })
      .then((result) => {
        toast.success(" Successful registration!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // useNavigate('/dashboard');
      })
      .catch((err) => {
        var msg = "";
        if (typeof err.response == "undefined") {
          msg = "Server error, please try later!";
        } else {
          msg = err.response.data.errors[0].msg;
        }
        toast.error(msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container fluid className="sponsor-section" id="about">
        <Container>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              letterSpacing: "0.5rem",
              paddingBottom: "3rem",
              paddingTop: "7rem",
            }}
          >
            <span className="purple"> REGISTER </span>
          </h1>
          <Row>
            <div className="form-gallery">
              <form onSubmit={handleSubmit} className="form-content">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <style type="text/css">
                  {`
    .btn-outline-light:hover{
      color: white;}
      .btn-outline-light:active{
        color:green;
      }    
    `}
                </style>
                <div
                  className="g-recaptcha"
                  data-sitekey="6Ld2Cf0fAAAAAGUlXmCKZBT8j6cG0Dk5kb7qzriZ"
                ></div>
                <Button
                  variant="outline-light"
                  type="submit"
                  style={{
                    display: "flex",
                    fontSize: "1.5rem",
                    width: "auto",
                    height: "auto",
                    background: "none",
                    marginTop: "3rem",
                    marginBottom: "3rem",
                    justifyContent: "center",
                    align: "center",
                  }}
                >
                  Register !
                </Button>{" "}
              </form>
            </div>
          </Row>
        </Container>
      </Container>
      <ToastContainer />
    </>
  );
}
