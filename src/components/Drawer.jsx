import { useState, useContext } from "react";
import { CoinsContext } from "./ContextProvider";

export function WatchListDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const { selectedCoins, coins, currency, toggleCoinSelection } =
    useContext(CoinsContext);
    const selectedCoinDetails = coins.filter((coin) =>
    selectedCoins.includes(coin.id)
  );

  function getPriceDisplay(price, currency) {
    switch (currency) {
      case "USD":
        return ` $${price}`;
      case "EUR":
        return `€${price}`;
      case "TRY":
        return `₺${price}`;
      case "RUB":
        return `₽${price}`;
      case "INR":
        return `₹${price}`;
      default:
        return price;
    }
  }
  return (
    <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer-4" className="drawer-button lg:btn  text-sm btn btn-xs h-8  btn-primary lg:btn-primary">WATCH LIST</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"> </label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-48  md:w-80 lg:w-[400px] p-4">
    <label htmlFor="my-drawer-4" className=" lg:max-w-10 w-5 h-5 py-0 px-2 btn btn-sm lg:p-5 ml-auto lg:btn btn-primary">X</label>
    <div className="max-w-full flex gap-4 flex-wrap">
    {selectedCoinDetails.length > 0 ? ( 
              selectedCoinDetails.map((coin) => (
                <div
                  key={coin.id}
                  className="flex border bg-secondary-content rounded-xl lg:rounded-3xl md:rounded-3xl  w-[70px] h-28 lg:w-40 lg:h-52 md:w-36 md:h-44  items-center justify-center py-4"
                >
                  <div className="flex flex-col items-center ">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="object-cover w-10 h-10 md:w-20 md:h-20 lg:w-28 lg:h-28"
                    />
                    <p className="text-[11px] lg:text-base" >
                      {getPriceDisplay(coin.current_price.toFixed(2), currency)}
                    </p>
                    <button
                      onClick={() => toggleCoinSelection(coin)} // Remove tugmasi bosilganda tanlangan mahsulotni o'chirish
                      className="hover:text-white hover:bg-red-600 lg:px-3 lg:py-1 text-xs lg:text-base rounded-md mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">No coins selected.</p>
            )}
    </div>
            
    </ul>
  </div>
</div>
     
  );
}
