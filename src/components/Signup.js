import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
//import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as yup from "yup";
import toast from "react-hot-toast";
import { useFormik } from 'formik';
import { APII } from '../global';
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
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const signupValidationSchema = yup.object({
  
  username: yup.string().required("").min(1),
  email: yup.string().required("").min(8),
  password: yup.string().required("").min(4),
  
})


const Signup = () => {

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues: {
        username: "",
        email: "",
        password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (newList) => {
        // console.log("new member: ", newList)
        addUser(newList)
    },
})
const addUser = (newList) => {
    fetch(`${APII}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(newList),
        headers: { "Content-Type": "application/json" }
    })
        .then((data) => data.json())
        .then((data) => {
            if (data.message === "Username already exists") {
                console.log("username already exists");
            } else {
                console.log("login successfull");
                toast.success("Registration Successful");
                navigate('/login')
            }
        })
}

  const navigate = useNavigate();
  
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
        <div className='login-input'>
        <TextField
            name="username"
            label="User Name"
            variant="outlined"
            onChange={handleChange}
            value={values.username}
            onBlur={handleBlur}
        />
        {touched.username && errors.username ? errors.username : null}
        <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? errors.email : null}
        <TextField
            name="password"
            label="Password"
            variant="outlined"
            type='password'
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? errors.password : null}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
    </div>
         <Button variant="contained" type="submit" color='success'>Register</Button>
        <Link>
        <span onClick={() => navigate('/login')} className='nav'>LOGIN HERE</span>
        </Link>
        </Form>
      </Wrapper>
    </Container>
  )
  }
export default Signup