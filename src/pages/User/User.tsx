import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Link } from "react-router-dom";
import {
  validatePassword,
  passwordRules,
} from "../../utils/validationPassword";

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordValidation = validatePassword(formData.password);

  const allRulesSatisfied =
    Object.values(passwordValidation).every(Boolean) &&
    formData.username.trim().length > 0;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRulesSatisfied) {
      alert("❌ Certifique-se de preencher todos os campos corretamente.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/persons", formData);
      alert("✅ Usuário criado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setFormData({ username: "", password: "", role: "USER" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("❌ Erro ao criar usuário. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-teal-100 min-h-screen flex items-center justify-center font-quicksand relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid mb-4"></div>
            <p>Carregando...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white px-14 py-10 rounded-xl shadow-lg text-center relative"
      >
        <h1
          className=" text-4xl mb-10 p-2
        sm:text-6xl sm:p-0
        md:text-6xl md:p-0
        lg:text-6xl lg:p-0
        xl:text-6xl xl:p-0"
        >
          Criar Usuário
        </h1>
        <fieldset className="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nome de Usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
        </fieldset>
        <fieldset className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-5 transform -translate-y-1/2 text-white"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-teal-400"
              >
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-teal-400"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 00 1 6.75 12Z" />
              </svg>
            )}
          </button>
        </fieldset>
        {formData.password.length > 1 &&
          !Object.values(passwordValidation).every(Boolean) && (
            <div className="absolute text-sm min-w-48 top-1 left-10 mt-8 ml-4 bg-black p-3 rounded-2xl shadow-2xl">
              <h2 className="font-bold mb-2 text-white">
                Requisitos da senha:
              </h2>
              <ul>
                {Object.entries(passwordRules).map(([key, description]) => (
                  <li
                    key={key}
                    className={`${
                      passwordValidation[key as keyof typeof passwordValidation]
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        <fieldset className="mb-4">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full block bg-black rounded p-2 text-white"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
            <option value="MANAGER">Gerente</option>
          </select>
        </fieldset>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 p-3 rounded-lg hover:bg-teal-600 text-white shadow-md"
        >
          {isLoading ? "Criando..." : "Criar Usuário"}
        </button>
        <div className="mt-4 text-center">
          <p>
            Já é um usuário?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Clique aqui para entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
