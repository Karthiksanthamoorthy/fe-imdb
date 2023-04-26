import styled from "styled-components";
//import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { login } from "../redux/apiCalls";
import { useNavigate } from 'react-router-dom';
import { APII } from '../global';
import { useFormik } from 'formik';
import toast from "react-hot-toast";
import { TextField } from '@mui/material';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

// const Error = styled.span`
//   color: red;
// `;


const Login = () => {

  const navigate = useNavigate();

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
        username: "",
        password: "",
    },
    onSubmit: async (values) => {
        // console.log(values);

        const data = await fetch(`${APII}/api/auth/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values)
        })

        if (data.status === 401) {
            toast.error ("Login Failed");
            console.log("Login Failed");
        } else {
            const result = await data.json();
            toast.success("Login Success");
            localStorage.setItem("token",result.token)
            navigate("/")
        }

    }
})
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
        <div className='login-input'>
                    <TextField
                        name="username"
                        label="User Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.username}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    <Button variant="contained" type="submit" color='error'>Login</Button>
            
           <Link>
           <span onClick={() => navigate('/register')} className='nav'>CREATE A NEW ACCOUNT REGISTER HERE</span></Link>
       </div> 
       </Form>
      </Wrapper>
    </Container>
  )
}

export default Login;