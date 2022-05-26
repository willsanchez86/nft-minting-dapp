import image from '../assets/CarmineChimpanzini.jpg';

function NftImage() {
//   return <img src={image} alt="nft" className="m-auto" />
    return (
        <div className="relative w-full">
            {/* <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="object-cover w-full h-full" /> */}
            <img src={image} alt="nft" className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md" />
            <div className="badge badge-lg absolute w-1/3 h-12 py-2.5 top-2 inset-x-2 bg-black text-white text-xl md:text-md text-center font-bold">
                <h1><span>0</span> \ 20</h1>
            </div>
        </div>
    )
}

export default NftImage
