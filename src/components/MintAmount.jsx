import { useContext } from 'react';
import MintingContext from '../context/MintingContext';

function MintAmount() {
  const { mintAmount, incrementMintAmount, decrementMintAmount } =
    useContext(MintingContext);

  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={incrementMintAmount}
        className="btn btn-square btn-lg text-white text-5xl pb-1"
      >
        +
      </button>
      <h1 className="font-sans h-1/5 text-4xl text-center font-bold mt-2 text-brand-light-red">
        {mintAmount}
      </h1>
      <button
        onClick={decrementMintAmount}
        className="btn btn-square btn-lg justify-self-end text-white text-4xl pb-1"
      >
        -
      </button>
    </div>
  );
}

export default MintAmount;
