const Header = ({ text }) => {
  return (
    <header
      className="m-0 font-sans antialiased font-normal text-base leading-default 
        bg-transparent text-slate-500 mt-4 p-4"
    >
      <h1 className="text-xl md:text-3xl font-bold uppercase">
        <span className="text-primary-100">{text ? text : ""}</span>
      </h1>
    </header>
  );
};

export default Header;
