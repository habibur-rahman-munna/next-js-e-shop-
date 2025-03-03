const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-20">
        <div className="container mx-auto flex flex-col items-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">E-shop</h1>
          </div>
          <p>&copy;{new Date().getFullYear()} E-shop. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;