import image from '../assets/CarmineChimpanzini.jpg';

function NftImage() {
//   return <img src={image} alt="nft" className="m-auto" />
    return (
        <div className="relative min-h-72 min-w-72">
            {/* <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="object-cover w-full h-full" /> */}
            <img src={image} alt="nft" className="m-auto min-h-full min-w-full" />
            <div className="badge badge-lg absolute w-1/3 h-12 py-2.5 top-2 inset-x-2 bg-black text-white text-xl text-center font-bold">
                <h1><span>0</span> \ 100</h1>
            </div>
        </div>
    )
}

export default NftImage
