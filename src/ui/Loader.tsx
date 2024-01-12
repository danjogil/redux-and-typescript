function Loader(): JSX.Element {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
