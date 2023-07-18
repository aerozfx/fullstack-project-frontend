import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";  
import axios from "axios";
import { UserContext } from "../../../context/userContext";
const Login = () => {
  const {updateUserId} = useContext(UserContext)
  const [error, setError] = useState({
    error: false,
    message: ""
  })
  const {register, handleSubmit, formState: {errors} } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      let res = await axios.post("api/login", {...data})
      updateUserId(res.data.user)
      navigate("/")
      } catch (error) {
        console.log(error)
      setError({error: true})
    }
  }
  return (
    <section className="login-form">
      <h2 className="title">Bienvenido/a de nuevo!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <span>Email:</span>
          <input {...register("email", {required: true})}/>
          {errors.email?.type === "required" && <p className="error">El campo email es requerido</p>}
        </label>
        <label htmlFor="password">
          <span>Password:</span>
          <input  {...register("password", {required: true})} type="password" />
          {errors.email?.type === "required" && <p className="error">El campo contraseña es requerido</p>}
        </label>
        {error.error && <p className="error">Email o contraseña incorrectos</p>}
        <button>Entrar</button>
      </form>
    </section>
  );
};

export default Login;
