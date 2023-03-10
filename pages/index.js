import Web3 from 'web3';
import Head from 'next/head';
import faqs from '../lib/faqs';
import Image from 'next/image'
import FAQ from '../components/FAQ';
import { WinterCheckout } from '@usewinter/checkout';
import {useState, useEffect} from 'react';
import  checkChainId from '../utils/check-chain-id';
import { useWeb3React } from '@web3-react/core';
import ConnectModal from '../components/ConnectModal';
import { useEagerConnect } from '../utils/hooks';
import Modal from '../components/Modal';
import buyNft from '../modules/buy-nft';


let provider;


export default function Home(props) {
  const context = useWeb3React();
  const [showWinter, setShowWinter] = useState(false);
  const [web3, setWeb3] = useState()
  const [connectModal, setShowConnectModal] = useState(false);
  const [address, setAddress] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [activatingConnector, setActivatingConnector] = useState();
  const { connector, activate } = context;


  const setProvider = async (newProvider) => {
    try {
      provider = newProvider;
      const newWeb3 = new Web3(newProvider)
      setWeb3(newWeb3);
      const newAddress = await newWeb3.eth.getAccounts();
      setAddress(newAddress[0]);
      await checkChainId(web3);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  useEagerConnect(setProvider);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full bg-black">
        <navbar className="flex justify-end">{address && <button className="border-2 border-white m-4 text-white  px-4 py-2" >{address.slice(0,4) + '...' + address.slice(38)}</button>}</navbar>
        <div className="bg-black h-full p-2 md:p-4 flex flex-wrap">
          <div className="w-full xl:w-1/2 md:mt-20 p-2 md:p-4 ml-auto mr-0" >
            <h1 className="text-white text-7xl text-right font-bold">A Love Letter To Garry K. Kasparov</h1>
            <p className="text-gray-200 mr-0 text-right text-2xl my-4 font-extralight">140 piece art collection dedicated to the complexities of chess, and the mastery of one of the finest players to ever live</p>
            <p className="text-gray-200 mr-0 text-right text-md my-6 font-bold">0.05 ETH / ${Math.floor((props.eth * 5) / 100)}</p>
            <div className="flex flex-row justify-end mt-8">
              
              <button className="text-black bg-white small-rounded px-4 border-2 border-white py-1 ml-4" onClick={() => setShowWinter(true)} >Buy with card</button>
              <button className="text-white bg-black border-2 border-white small-rounded px-4 py-1 ml-4" onClick={() => setShowPurchaseModal(true)}>Buy with Crypto</button>
            </div>
            <a href="#about" className="pointer text-white text-right mt-8 font-extralight underline block">
           Read on to discover more
            </a>
          </div>
          <img src="/157.png" className="kasparov-image" />
        </div>
        <div className="p-4 sm:p-8 md:p-16 w-full sm:w-1/2 md:w-2/3 mx-auto" id="about">
          <h1 className="text-white text-7xl text-center font-bold">The Art</h1>
          <p className="text-gray-200 mr-0 text-center text-xl my-6 font-extralight" >
              Combining the elegance of chess with the power of code. Each art piece represents a chess game played by Kasparov during his illustrious career.
          </p>
          <p className="text-gray-200 mr-0 text-center text-xl my-6 font-extralight">
             The lines follow the movement of pieces across the board, creating powerful patterns, symmetries and shapes normally unseen. Each line is weighted based on the value of the piece it represents. This
             weighting is proportionate to the standard points system often used to simplify the status of a chess match.
          </p>
          <ul className="text-white m-0 flex justify-center mt-4">
            <li className="text-center mx-2">Pawns = 1</li>
            <li className="text-center mx-2">Knights = 3</li>
            <li className="text-center mx-2" >Bishops = 3</li>
            <li className="text-center mx-2">Rooks = 5</li>
            <li className="text-center mx-2">Queen = 8</li>     
          </ul>
          <p className="text-gray-200 mr-0 text-center text-xl my-6 font-extralight">
            Using a game database containing the PGN notation for Kasparovs games, the game data was parsed then transformed into coordinates that could be used to draw using the P5 Javascript library
          </p>
          <p className="text-gray-200 mr-0 text-center text-xl my-6 font-extralight">
            After copious experimentation with line work, borders, depth, space and more. Simplicity won out. The immense variation between individual games shows the staggering options at a players finger tips, even over so many games
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <Image src="/151.png" width={300} height={300} priority={true} />
          <Image src="/164.png" width={300}  height={300} priority={true} />
          <Image src="/162.png" width={300}  height={300} priority={true} />
          <Image src="/154.png" width={300}  height={300}priority={true} />
          <Image src="/155.png" width={300}  height={300} priority={true} />
          <Image src="/156.png" width={300}  height={300} priority={true} />
        </div>
        <div className="w-full sm:w-1/2 md:w-2/3 mx-auto sm:p-8 md:p-16">
          <h1 className="text-white text-7xl text-center font-bold">The Artist</h1>
          <p className="text-gray-200 mr-0 text-center text-xl my-4 font-extralight" >
            {' I\'m James. Also known as WildSheep. I\'m a web3 developer, founder, art lover, and NFT collector.'} I will continue to deliver art that brings out the beauty often unseen, in patterns, processes and movements of everyday life. This is just the beginning. 
          </p>
          {/* <p className="text-gray-200 mr-0 text-center text-xl my-4 font-extralight">
            { ' Communities I\'m part of that you should check out. I\'m a long time CryptoMorie, an ex-mfer (always a mfer), Gutter Gang lover #GangGang, ZenAcademy ???? student, and Vogu bot (for the OGs who member)'}
          </p> */}
          <img src="/new morie.jpeg" className="w-96 mx-auto p-4" />
        </div>

        <div className="pb-24">
          <h1 className="text-white text-7xl text-center font-bold mb-8">FAQs</h1>
          {faqs.map((value) => {
            return <FAQ key={value.question} question={value.question} answer={value.answer} />;
          })}
        </div>
        <WinterCheckout 
          projectId={8580} 
          production={false} 
          showModal={showWinter} 
          // pass in a function to be called when a successful purchase happens
          // onSuccess={() => setParty(true)}
          // pass in a function to be called when the modal is closed
          onClose={() => setShowWinter(false)}
          // If you want to customize the css of the checkout widget
          appearance={{
            leftBackgroundColor: '#131317',
            rightBackgroundColor: '#22222d',
            buttonTextColor: 'black',
            buttonColor: '#f59e0c',
            primaryTextColor: 'white',
            secondaryTextColor: '#85868a',
            fontFamily: 'Montserrat,sans-serif',
            buttonAndInputBoxShadow: '0 3px 6px 1px rgba(217, 119, 6, 0.2)',
            buttonAndInputFocusBoxShadow: '0 3px 6px 1px rgba(217, 119, 6, 0.8)',
            quantityButtonPlusMinusSvgFilter: 'invert(100%) sepia(100%) saturate(1%) hue-rotate(135deg) brightness(105%) contrast(101%)',
            inputBackgroundColor: '#131317',
            mintingClipLoaderColor: 'white',
            borderColor: 'rgba(245,158,11)'
          }}
        />
        <ConnectModal open={connectModal} setProvider={setProvider} setOpen={setShowConnectModal} activate={activate} />
        <Modal open={showPurchaseModal} setOpen={setShowPurchaseModal}>
          <div key={address} className="p-4">
            <h4  className="text-white text-3xl text-center font-bold my-4">Mint new NFTs</h4>
            <button  className="pointer text-black bg-white small-rounded px-4 border-2 border-white py-1 my-4 mx-auto block w-48"  onClick={() => !address && setShowConnectModal(true)}>{address ? 'Connected' : 'Connect Wallet'}</button>
            <p  className="text-gray-200 mr-0 text-center text-md my-4 font-extralight">Max 15 per transaction</p>
            <div className="mt-1 w-48 block mx-auto ">
              <input
                type="number"
                name="nftAmount"
                id="nftAmount"
                className="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                defaultValue={1}
              />
            </div>
            {web3 && address && <button  disabled={!address} className="pointer text-black bg-white small-rounded px-4 border-2 border-white py-1 my-4 mx-auto block w-48"  onClick={() => address && buyNft({ web3, address })}>Purchase</button>}
          </div>
        </Modal>
      </main>
    </>
  );
}


export async function getServerSideProps() {
  const pricing = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const pricingJson = await pricing.json();
  return {
    props: {
      eth: pricingJson.ethereum.usd,
    }
  };
}
 