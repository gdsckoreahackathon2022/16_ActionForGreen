import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import { Link } from 'react-router-dom';






//<TextField variant="outlined" label="시리얼 번호 입력" sx={{mt: 2, mb:2}}/>
//<MailOn>메일 알림 켜기<Switch /></MailOn>

const signup = () => {
    return (
        <React.Fragment>

            <Maindiv>

                <TextField variant="outlined" label="비밀번호 입력" type="password" sx={{ mt: 2, mb: 2 }} />
                <TextField variant="outlined" label="비밀번호 확인" type="password" sx={{ mt: 2, mb: 2 }} />
                <TextField variant="outlined" label="이메일 입력" type="email" sx={{ mt: 2, mb: 2 }} />



                <Buttonwrap>
                    <Button variant="contained" sx={{ mt: 10, mr: 10 }}>설정 완료</Button>
                    <StyledLink to="./dashboard">
                        <Button variant="outlined" sx={{ mt: 10, ml: 10 }}> 취소</Button>
                    </StyledLink>
                </Buttonwrap>

            </Maindiv>


            <Copyright>Copyright @ GDSC Hackathon Team</Copyright>
        </React.Fragment>
    );
}




const Maindiv = styled.div`
position: absolute;
display: inline-flex;
flex-row: row wrap;

align-content: space-around;
flex-direction: column;

top: 50%;
left: 50%;
transform: translate(0%,-50%);

margin: 0 auto;
width: 700px;
margin-left: -350px;

`



const Copyright = styled.div`
text-align: center;
position: absolute;
left:50%;
top:95%;
transform: translate(-50%, -50%);
margin: 0 auto;
display: flex;
justify-content: center;

font-size:small;
color: rgba(0,0,0,0.54);
`
/*
const MailOn = styled.div`
background-color: #F7E600;
border-radius: 4px;
margin-top: 90px;
text-align: center;
padding: 7px;
box-shadow: 3px 3px 3px grey;
font-family: 'Roboto';
`
*/
const Buttonwrap = styled.div`
float: center;
text-align: center;

`

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default signup;