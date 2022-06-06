import { useContext } from 'react';
import MintingContext from '../context/MintingContext';

function Status() {
  const { status } = useContext(MintingContext);

  if (status) {
    return (
      <div
        className={`border ${
          status.success ? 'border-green-500' : 'border-brand-pink-400 '
        } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
      >
        <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
          {status.message}
        </p>
      </div>
    );
  }
}

export default Status;
