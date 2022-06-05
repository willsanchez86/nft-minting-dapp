import image from '../assets/WaragiApe.jpg';

function NftImage({ totalMinted, maxSupply }) {
  return (
    <div className="flex w-full md:w-1/2">
      <div className="relative w-full md:pb-10 md:pr-12">
        <div className="font-coiny z-10 absolute px-4 py-2 top-2 left-2 text-base bg-black text-white rounded-md  flex items-center  font-semibold">
          <p>
            <span>{totalMinted}</span> \ {maxSupply}
          </p>
        </div>
        <img
          src={image}
          alt="nft"
          className="object-cover w-full rounded-md md:w-5/6"
        />
      </div>
    </div>
  );
}

export default NftImage;
