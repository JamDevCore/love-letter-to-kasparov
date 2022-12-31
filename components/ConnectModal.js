
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  injected,
  walletconnect,
} from '../utils/connectors';


const ConnectModal = ({ activate, open, setOpen, setProvider }) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h4 className="mb-4">Connect Wallet</h4>
              <div className="flex flex-col justify-around">
                <ul role="list" className="divide-y divide-gray-200 px-0">
                  <li className="py-4 flex">
                    <button
                      type="button"
                      className="w-full h-full cursor-pointer my-auto flex"
                      onClick={async () => {
  
                        await activate(injected, () => {
                        });
                        setTimeout(async () => {
                          let { provider } = await injected.activate();
                          setProvider(provider);
                        },1000);
                        setOpen(false);

                      }}
                    >
                      <img className="w-10 ml-0" src="/metamask.svg"/>
                      <div>
                        <p className="my-auto bold ml-2 text-black text-left"> Metamask</p>
                        <p className="my-auto bold ml-2 text-gray-500" > Connect with browser wallet</p>
                      </div>
     
                    </button>
                  </li>
                  <li className="py-4 flex">
                    <button
                      type="button"
                      className="w-full h-full cursor-pointer my-auto flex"
                      onClick={async () => {
                        await activate(injected, () => {
                        });
                        setTimeout(async () => {
                          let { provider } = await injected.activate();
                          setProvider(provider);
                        },1000);
                        setOpen(false);

                      }}
                    >
                      <img className="w-10 ml-0" src="/trust.png"/>
                      <div>
                        <p className="my-auto bold ml-2 text-black text-left"> Trust Wallet</p>
                        <p className="my-auto bold ml-2 text-gray-500" > Connect with Trust Wallet</p>
                      </div>
     
                    </button>
                  </li>
                  <li className="py-4 flex">
                    <button
                      type="button"
                      className="w-full h-full cursor-pointer my-auto mx-auto flex"
                      onClick={async () => {
                        await activate(walletconnect, () => {
                        });
                        setTimeout(async () => {
                          await walletconnect.activate();
                          await walletconnect.activate();
                          let { provider } = await walletconnect.activate();
                          setProvider(provider);
                        },1000);
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      <img src="/walletconnect.svg" className="w-10 ml-0"/>
                      <div>
                        <p className="my-auto bold ml-2 text-black text-left" > Wallet Connect</p>
                        <p className="my-auto bold ml-2 text-gray-500" > Connect with mobile wallet</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>);
};

export default ConnectModal;





