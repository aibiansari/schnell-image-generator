const Footer = () => {
  return (
    <p className="block md:hidden text-sm bg-gray-200 text-center p-1 my-4 font-Atkinson">
      &copy; {new Date().getFullYear()} Schnell. All rights reserved.
    </p>
  );
};

export default Footer;
