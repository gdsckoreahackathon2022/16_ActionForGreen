import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';


const signup = () =>
{
    return( 
    <React.Fragment>
        <Icondiv>
        <LockIcon align="center" />
</Icondiv>
        <Caption>회원 가입</Caption>
    <Maindiv>
        <TextField variant="outlined" label="ID" sx={{mt: 2, mb:2}}/>
        <TextField variant="outlined" label="비밀번호" type="password" sx={{mt:2, mb:2}}/>
        <TextField variant="outlined" label="Email" type="email" sx={{mt:2, mb:2}}/>
        <TextField variant="outlined" label="IoT Serial" sx={{mt:2, mb:2}}/>
        <Button variant="contained" >회원 가입</Button>

        
    </Maindiv>
    
    <Ldiv>이미 계정이 있으신가요? 로그인하러 가기</Ldiv>
    <Copyright>Copyright @ GDSC Hackathon Team</Copyright>
    </React.Fragment>
    );
}


const Icondiv = styled.div`
margin-top: 100px;
display: flex;
justify-content: center;

`
const Caption = styled.div`
margin-top: 30px;
display: flex;
justify-content: center;

text-align: center;
font-size: x-large;
`


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

`

const Ldiv = styled.div`
position: absolute;
left: 50%;
float: right;
top:90%;
transform: translate(-50%, -50%);
text-align: right;
color: #1976D2;

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


export default signup;