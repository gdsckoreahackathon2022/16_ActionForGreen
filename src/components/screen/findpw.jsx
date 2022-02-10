import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';


const signup = () =>
{
    return( 
    <React.Fragment>
        
        <Caption>비밀번호 찾기</Caption>
    <Maindiv>
        <TextField variant="outlined" label="ID" sx={{mt: 2, mb:2}}/>
        <TextField variant="outlined" label="Email" type="email" sx={{mt:2, mb:2}}/>
        <Button variant="contained" sx={{mt:10}}>비밀번호 변경 링크 전송</Button>

        
    </Maindiv>
    
    <Copyright>Copyright @ GDSC Hackathon Team</Copyright>
    </React.Fragment>
    );
}



const Caption = styled.div`
margin-top: 120px;
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