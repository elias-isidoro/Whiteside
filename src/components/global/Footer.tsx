

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col gap-5 text-[11px] min-[300px]:text-xs py-10">
        <hr/>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row">
            <p>&copy; {new Date().getFullYear()} Dean Kudou. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <p>naed221@gmail.com</p>
            <p className="hidden min-[400px]:block">|</p>
            <p>+63 915-451-1087</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;