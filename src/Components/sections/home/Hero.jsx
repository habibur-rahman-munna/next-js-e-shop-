import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-cover bg-center h-screen"style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/05/35/13/82/360_F_535138292_62ZnI4Hcw37J8Jaeg4E9TzJwUciCwSnp.jpg')" }}>
      <div className="container mx-auto flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our E-commerce Store</h1>
          <p className="text-lg mb-6">Discover amazing products and shop online with ease.</p>
          <Link href="/product"className="bg-white text-black hover:bg-red-600 hover:text-white rounded py-2 px-8 capitalize mt-3 hover:border border-black hover:border-none inline-block">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
