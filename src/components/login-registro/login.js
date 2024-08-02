import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FalloContraseña from "../modals/fallocontraseña"
import { navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const LoginForm = ({ login }) => {
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "http://localhost/bd-appqr/v1/user/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email, password: values.password }),
        }
      )
      const data = await response.json()
      if (data.message === "Login exitoso") {
        console.log(data.user)
        setMessage("Login exitoso")

        localStorage.setItem("userName", data.user.name)

        navigate("/appsite")
      } else {
        setMessage("Credenciales incorrectas")
      }
    } catch (error) {
      console.error("Error en el login", error)
      setMessage("Error en el login")
    } finally {
      setSubmitting(false)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  return (
    <div className="form-login">
      <h1 className="h1Login">Iniciar sesión</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label htmlFor="email" className="label-login">Correo electrónico</label>
            <div className="email-input-container">
              <Field
                className="input-login"
                name="email"
                type="email"
                placeholder="Email"
                id="email"
                onChange={e => setFieldValue("email", e.target.value)}
              />
              <ErrorMessage name="email" />
            </div>
            <label htmlFor="password" className="label-login">Contraseña</label>
            <div className="password-input-container">
              <Field
                className="input-login"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                id="password"
                onChange={e => setFieldValue("password", e.target.value)}
              />
              <button
                type="button"
                id="eye-input-login"
                className="toggle-password-button"
                onClick={toggleShowPassword}
              >
                {showPassword ? "👁️​" : "👁️‍🗨️"}
              </button>
            </div>
            <ErrorMessage name="password" />

            <br />
            <br />
            <FalloContraseña />
            <br />
            <button
              type="submit"
              className="btnSubmit animationFundido buform"
              id="btn-entrar-login"
              disabled={isSubmitting}
            >
              <StaticImage
                className="profile-2"
                src="../../images/icons/profile-2.svg"
                alt="profile-2"
              ></StaticImage>
              Entrar
            </button>
            <p>{message}</p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm