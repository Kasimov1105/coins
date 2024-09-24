import { Carousel } from "flowbite-react";
import { useContext } from "react";
import { CoinsContext } from "../components/ContextProvider";
const customTheme = {
  control: {
    base: "hidden",
  },
};
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
export function Carusel() {
  const { selectedCoins, coins, currency } = useContext(CoinsContext); 
  const selectedCoinDetails = coins.filter(coin => selectedCoins.includes(coin.id)); 
  const countryChunks = chunkArray(selectedCoinDetails, 4);
  function getPriceDisplay(price, currency) {
    switch (currency) {
      case 'USD':
        return` $${price}`;
      case 'EUR':
        return `€${price}`;
        case 'TRY':
        return `₺${price}`;
        case 'RUB':
          return `₽${price}`;
          case 'INR':
            return `₹${price}`;
      default:
        return price;
    }
  }
  return (
    <div className="lg:h-48 h-32 bg-[url('/hero.jpg')]  bg-no-repeat bg-cover sm:h-56 xl:h-64 2xl:h-80">
      {selectedCoinDetails.length === 0 ? (
        <h1 className="lg:text-4xl ml-32  lg:ml-[450px] font-medium">No coins selected</h1>
      ) : (
        <Carousel theme={customTheme} indicators={false}>
          {countryChunks.map((chunk, index) => (
            <div key={index} className="flex items-center gap-5 text-center lg:gap-40 justify-center space-x-4">
              {chunk.map((coin) => (
                <div key={coin.id} className="flex flex-col  justify-center items-center">
                  <img
                  
                    src={coin.image}
                    alt={coin.name}
                    className="object-cover w-10 h-10 lg:h-20 lg:w-20"
                  />
                  <div className="flex flex-col lg:flex lg:flex-row gap-1">
                    <p className="text-sm lg:text-lg  mb-2 font-medium">{coin.name}</p>
                    <div className="text-xs lg:text-base" style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                  <p className="text-xs lg:text-base">
                  {getPriceDisplay(coin.current_price, currency)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
