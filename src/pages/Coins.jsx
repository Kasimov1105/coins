import React, { useContext, useState } from 'react';
import { CoinsContext } from '../components/ContextProvider';
import { Link } from 'react-router-dom'; 
import { IoEyeSharp } from 'react-icons/io5'; 
import { Carusel}  from '../components/Carusel';
import { Pagenation } from '../components/PageNation';

function Coins() {
  const { coins, loading, toggleCoinSelection, selectedCoins, currency } = useContext(CoinsContext);
  const [searchCoin, setSearchCoin] = useState('');
  const isCoinSelected = (coin) => selectedCoins.includes(coin.id);

  const getPriceDisplay = (price, currency) => {
    switch (currency) {
      case 'USD':
        return `$${price.toFixed(2)}`;
      case 'EUR':
        return `€${price.toFixed(2)}`;
      case 'TRY':
        return `₺${price.toFixed(2)}`;
      case 'RUB':
        return `₽${price.toFixed(2)}`;
      case 'INR':
        return `₹${price.toFixed(2)}`;
      default:
        return price.toFixed(2);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }
  const filteredCoins = coins.filter((coin) => 
  coin.name.toLowerCase().includes(searchCoin.toLowerCase()) || 
  coin.symbol.toLowerCase().includes(searchCoin.toLowerCase())
);
  return (
    <div className="overflow-x-auto max-w-[1200px] px-1 m-auto mt-16">
      <Carusel/>
      <input type="text" value={searchCoin}  onChange={(e) => setSearchCoin(e.target.value)} placeholder="Search For a Crypto Currency.." className="input mt-2 input-bordered w-full text-sm lg:text-base" />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className='text-center lg:text-start lg:text-lg md:text-lg'>Coin</th>
            <th className='lg:text-lg md:text-lg'>Price</th>
            <th className='lg:text-lg md:text-lg'>24h Change</th>
            <th className='lg:text-lg md:text-lg'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id} className="bg-base-200">
              <td >
                <div className='flex gap-3 flex-wrap justify-center text-center lg:justify-start '>
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="coin-image w-10 h-10 lg:w-14 lg:h-14 "
                />
                <Link className="flex flex-col text-center lg:text-start" to={`/coins/${coin.id}`}>
                  <h3 className=" text-[12px] md:text-[15px] lg:text-2xl  font-['Roboto'] font-normal">
                    {coin.symbol.toUpperCase()}
                  </h3>
                  <p className="text-[12px] md:text-[15px] lg:text-sm   font-['Roboto']">{coin.name}</p>
                </Link>
                </div>
              </td>
              <td className='p-1' > <p className='text-[12px] md:text-[15px] lg:text-[16px]'> {getPriceDisplay(coin.current_price, currency)}</p></td>
              <td className='p-1'>
                <div className="flex gap-2 text-center items-center">
                  <IoEyeSharp className='text-base lg:text-2xl'
                    style={{
                      cursor: 'pointer',
                      color: isCoinSelected(coin) ? 'green' : 'gray',
                    }}
                    onClick={() => toggleCoinSelection(coin)}
                  />
                  <div className='text-[12px] md:text-[15px] lg:text-[16px]'
                    style={{
                      color: coin.price_change_percentage_24h > 0 ? 'green' : 'red',
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </td>
              <td className='text-[12px]  md:text-[15px] lg:text-[16px] p-2 '>{coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagenation/>
    </div>
  );
}

export default Coins;
