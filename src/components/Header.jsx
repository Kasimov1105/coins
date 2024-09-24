import React, { useContext } from "react";
import ThemeControl from "./ThemeControl";
import { Link } from "react-router-dom";
import { WatchListDrawer  } from "./Drawer";
import { CoinsContext } from "./ContextProvider";
function Header() {
  
  const { setCurrency } = useContext(CoinsContext);
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
 
  
  
  return (
    <div  className="fixed  bg-secondary-content top-0 left-0 w-full  z-50   ">
      <div className="flex max-w-[1260px] h-16 m-auto items-center text-center justify-between">
        <Link to={`/`}>
          <img  src="/CRYPTOFOLIO.svg" alt="cryptolio" />
        </Link>
        <div className="flex lg:gap-3 gap-2 items-center text-center  justify-between">
          <ThemeControl  />
          <select  className="lg:select select-ghost text-xs rounded-md h-8 w-20 py-1 px-2 text-white bg-slate-600 lg:bg-slate-600 focus:text-white"
            onChange={handleCurrencyChange}>
             <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TRY">TRY</option>
            <option value="RUB">RUB</option>
          </select>
          <WatchListDrawer/>
        </div>
      </div>
    </div>
  );
}

export default Header;
