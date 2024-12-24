import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="max-w-4xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Agrix - Todos os direitos reservados.</p>
        <p>
          Desenvolvido por <strong><a href="https://github.com/Christofani" target="_blank" rel="noopener noreferrer">Christofani</a></strong> .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
