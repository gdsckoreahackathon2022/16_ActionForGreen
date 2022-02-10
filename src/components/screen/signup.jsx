import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
//import LockIcon from '@mui/icons-material/Lock';
import LCIcon from "assets/icon.svg";
import signupAPI from "components/AxiosAPI/signupAPI";
import { Link } from "react-router-dom";
//import {useState} from 'react';

//import signupAPI from 'components/AxiosAPI/signupAPI';

//const [values, setValues] = useState({id: "", password: "", email: "", iotserial: ""});
/*
const handelChange =  (event) => {
    const { name, value} = event.target;
    setValues({...values, [name]:value});
}
*/
const signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <React.Fragment>
      <Icondiv>
        <img src={LCIcon} align="center" />
      </Icondiv>
      <Caption>회원 가입</Caption>
      <Maindiv>
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          sx={{ mt: 2, mb: 2 }}
          value={email}
          onChange={e => {
            const { value } = e.target;
            setEmail(value);
          }}
        />
        <TextField
          variant="outlined"
          label="비밀번호"
          type="password"
          sx={{ mt: 2, mb: 2 }}
          value={password}
          onChange={e => {
            const { value } = e.target;
            setPassword(value);
          }}
        />

        {console.log(password, email)}
        <Button
          variant="contained"
          onClick={() => {
            if (signupAPI({ email: email, password: password }) === false) {
              alert("회원가입에 성공하였습니다. 로그인해 주세요.");
              location.href = "./login";
            }
          }}
        >
          회원 가입
        </Button>
      </Maindiv>

      <Ldiv>
        <StyledLink to="./login">
          이미 계정이 있으신가요? 로그인하러 가기
        </StyledLink>
      </Ldiv>
      <Copyright>Copyright @ GDSC Hackathon Team</Copyright>
    </React.Fragment>
  );
};

const Icondiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
const Caption = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  text-align: center;
  font-size: x-large;
`;

const Maindiv = styled.div`
  position: absolute;
  display: inline-flex;
  flex-row: row wrap;

  align-content: space-around;
  flex-direction: column;

  top: 30%;
  left: 50%;
  margin: 0 auto;
  width: 400px;
  margin-left: -200px;
`;

const Ldiv = styled.div`
  position: absolute;
  left: 50%;
  float: right;
  top: 90%;
  transform: translate(-50%, -50%);
  text-align: right;
  color: #1976d2;
`;

const Copyright = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 95%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  display: flex;
  justify-content: center;

  font-size: small;
  color: rgba(0, 0, 0, 0.54);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1976d2;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default signup;
