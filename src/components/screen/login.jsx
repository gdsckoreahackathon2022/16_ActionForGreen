import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
//import Checkbox from '@mui/material/Checkbox';
//import FormGroup from '@mui/material/FormGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import logo from "assets/logo.png";
import { Link } from "react-router-dom";
import loginAPI from "components/AxiosAPI/loginAPI";

/*
<FormGroup>
                    <FormControlLabel control={<Checkbox checked={idsavecheck} onChange={e => { const { value } = e.target; if (value === "on") { setIDSaveCheck("off") } else { setIDSaveCheck("on"); } }} />} label="ID 저장하기" />
                </FormGroup>
                */

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [idsavecheck, setIDSaveCheck] = useState("");
  return (
    <React.Fragment>
      <HeaderImg />
      <Maindiv>
        <TextField
          variant="outlined"
          label="ID"
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

        <Button
          variant="contained"
          sx={{ mt: 10 }}
          onClick={async () => {
            if (
              (await loginAPI({ email: email, password: password })) === true
            ) {
              location.href = "./dashboard";
            } else {
              alert("실패");
            }
          }}
        >
          로그인
        </Button>

        <ResetPwdLbl>
          <StyledLink to="./findpw">비밀번호 재설정</StyledLink>
        </ResetPwdLbl>
        <SignUpLbl>
          <StyledLink to="./signup">회원가입</StyledLink>
        </SignUpLbl>
      </Maindiv>

      <Copyright>Copyright @ GDSC Hackathon Team</Copyright>
    </React.Fragment>
  );
};
const HeaderImg = styled.img.attrs({
  src: `${logo}`
})`
  position: absolute;
  width: 560px;
  height: 190px;
  left: 50%;

  transform: translate(-50%, 0%);
  text-align: center;
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
const ResetPwdLbl = styled.div`
  text-align: left;
  float: left;
  color: #1976d2;
  font-size: small;
`;

const SignUpLbl = styled.div`
  text-align: right;

  float: right;
  color: #1976d2;
  font-size: small;
  margin-top: -17px;
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

export default login;
