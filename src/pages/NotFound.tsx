import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está tentando acessar não existe.</p>
      <Link to="/">Ir para a página de login</Link>
    </div>
  );
};

export default NotFound;
