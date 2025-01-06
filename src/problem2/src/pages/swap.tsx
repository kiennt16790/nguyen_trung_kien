import { SwapCard } from '../components/swap-card';
import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import bnb from '../assets/bnb.png';

export const Swap = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)] flex-col">
      <SwapCard />
      {/* random position */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-24 top-[100px] hidden lg:block">
        <img src={btc} alt="btc" className="w-24 h-24" />
      </div>
      <div className="absolute top-1/2 hidden lg:block left-[200px] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
        <img src={eth} alt="eth" className="w-24 h-24" />
      </div>
      <div className="absolute bottom-1/2 hidden lg:block right-[200px] transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
        <img src={bnb} alt="bnb" className="w-24 h-24" />
      </div>
    </div>
  );
};
