import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleSignup = () => {
    let isValid = true;

    // Reset errors
    setErrors({ username: '', password: '' });

    // Validate username and password length
    if (username.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'username too short!' }));
      isValid = false;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'password too short!' }));
      isValid = false;
    }

    // Check if username exists
    // if () {
    // setErrors((prevErrors) => ({ ...prevErrors, username: 'username already exists!' }));
    // isValid = false
    // }

    if (isValid) {
      // bulabula
    }
  };

  const formSchema = yup.object().shape({
    // email: yup.string().email("Invalid email").required("Must enter email"),
    username: yup.string().required("Must enter a name").min(5).max(25),
    // password: yup.string().required("Must enter a password").max(15),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then(
        (res) => {
          if (res.ok){
            res.json()
            .then(data => console.log(data))
          }
        }
      )
    },
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Signup</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor='username'>Username:</label>
              <input
                type="text"
                className={`form-control ${errors.username && 'is-invalid'}`}
                value={formik.values.username}
                onChange={formik.handleChange}
                name = 'username'
                id = 'username'
                required
              />
              {/* {errors.username && <div className="invalid-feedback">{errors.username}</div>} */}
              <p style={{color : "red"}}> {formik.errors.username}</p>
            </div>
            <div className="form-group">
              <label>Password:</label>
              {/* <input
                type="password"
                className={`form-control ${errors.password && 'is-invalid'}`}
                value={formik.values.password}
                name = 'password'
                id = 'password'
                onChange={formik.handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>} */}
            </div>
            <div className="text-center">
              <button className="btn btn-warning" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
