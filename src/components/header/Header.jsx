const Header = ({ username }) => {
  return (
    <header
      className="m-0 font-sans antialiased font-normal text-base leading-default 
        bg-gray-50 text-slate-500 mt-4"
    >
      <h1 className="text-xl md:text-3xl font-bold">
        Hola, <span className="text-primary-100">{username ? username : ""}</span>
      </h1>
    </header>
  );
};

export default Header;
