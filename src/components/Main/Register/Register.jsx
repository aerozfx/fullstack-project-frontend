
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { useForm } from "react-hook-form";
import { validate } from "uuid";
const Register = () => {
  const [error, setError] = useState({email: "", nickname: ""})
  const {handleSubmit, register, formState: {errors}} = useForm()
  let navigate = useNavigate()
  const {updateUserId} = useContext(UserContext)

  // TODO Añadir validación de use-form-hook
  const onSubmit = async (data) => {
    let res = await axios.post("/api/register", {...data})
    if(res?.data?.state === "error"){
      setError({...res.data})
      return
      }
    navigate("/")
    console.log(res.data.message)
    updateUserId(res.data.message["user_id"])
  }
  return (
    <section className="register-form">
      <h2 className="title">REGISTRO</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nickname">
          <span>Nickname:</span>
          <input {...register("nickname", {required: true})} className={error?.nickname ? "input-error" : ""}/>
          {error.nickname && <p className="error">{error.nickname}</p>}
          {errors.nickname?.type === "required" && <p className="error">Este campo es requerido</p>}
        </label>
        <label htmlFor="name">
          <span>Name:</span>
          <input {...register("name", {required: true})} />
          {errors.name?.type === "required" && <p className="error">Este campo es requerido</p>}
        </label>
        <label htmlFor="surname">
          <span>Surname:</span>
          <input {...register("surname", {required: true})}/>
          {errors.surname?.type === "required" && <p className="error">Este campo es requerido</p>}
        </label>
        <label htmlFor="email">
          <span>Email:</span>
          <input {...register("email", {required: true})} className={error?.nickname ? "input-error" : ""}/>
          {error.email && <p className="error">{error.email}</p>}
          {errors.email?.type === "required" && <p className="error">Este campo es requerido</p>}
        </label>
        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" {...register("password", {required: true, pattern: {
            value: /^(?=.*\d)(?=.*)(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
          }})} />
          {errors.password?.type === "required" && <p className="error">Este campo es requerido</p>}
          {errors.password?.type === "pattern" &&
          <article className="error">
            <p>La contraseña debe cumplir los siguientes requisitos</p>
            <ul className="password-regex">
              <li>Debe tener entre 8 y 16 caracteres</li>
              <li>Debe contener un dígito</li>
              <li>Debe tener una minúscula</li>
              <li>Debe tener una mayúscula</li>
            </ul>
            </article>}
        </label>
        <button>Registrarse</button>
      </form>
    </section>
  );
};

export default Register;
