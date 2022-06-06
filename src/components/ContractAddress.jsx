import CollectionConfig from 'config/CollectionConfig';

function ContractAddress() {
  return (
    <footer className="h-1/5 p-3 border-t border-gray-300 text-white">
      <h1 className="font-coiny text-2xl font-bold p-4 text-brand-light-red">
        CONTRACT ADDRESS
      </h1>
      <a
        href={`https://rinkeby.etherscan.io/address/${CollectionConfig.contractAddress}#readContract`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {CollectionConfig.contractAddress}
      </a>
    </footer>
  );
}

export default ContractAddress;
