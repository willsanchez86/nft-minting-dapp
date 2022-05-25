import NftImage from './components/NftImage';

function App() {
  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex bg-gradient-to-br from-red-300 to-stone-900">
      <div className="h-5/6 w-1/2 bg-black bg-blend-color-dodge m-auto text-center">
        <div className="flex flex-col h-full">
          <header className="font-coiny uppercase h-1/5 text-5xl font-bold p-10">PUBLIC SALE</header>
          <main className="flex flex-1 flex-wrap">
            <div className="flex flex-1 p-8">
              <NftImage />
            </div>
            <div className="flex flex-1 flex-col p-12">
              <div className="flex justify-between gap-4">
                <button className="btn btn-square btn-lg text-white text-5xl pb-1">+</button>
                <h1 className="font-sans h-1/5 text-4xl text-center font-bold mt-2">1</h1>
                <button className="btn btn-square btn-lg justify-self-end text-white text-4xl pb-1">-</button>
              </div>
              <p>Max Mint Amount: 10</p>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex text-3xl">
                  <h1 className="justify-start">Total</h1>
                  <h1  className="ml-auto"><span>0.1 ETH</span>+ GAS</h1>
                </div>
              </div>
              <button className="btn btn-wide text-xl m-auto font-bold">Connect Wallet</button>
            </div>
          </main>
          <footer className="h-1/5 p-3 border-t border-gray-300">
            <h1 className="font-sans text-2xl font-bold p-4">CONTRACT ADDRESS</h1>
            <p>aasfdyafdbkdgdfggbedkfydjfbsjdhfbjhsdfb</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
