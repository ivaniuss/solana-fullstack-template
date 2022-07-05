import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import {
    Program, Provider, web3
  } from '@project-serum/anchor';
import idl from './idl.json';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');


const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new SolanaMobileWalletAdapter({
                appIdentity: { name: 'Solana Create React App Starter App' },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
            }),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {

    const wallet = useAnchorWallet();

    const getProvider = async() => {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        if(!wallet) {
            return null;
        };
        const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, "processed");

        const provider = new Provider(
          connection, wallet, {preflightCommitment: "processed"},
        );
        return provider;
    }

    const initialize = async () =>{
        const { SystemProgram, Keypair } = web3;
        const programID = idl.metadata.address;
        const provider = await getProvider();
        const baseAccount = Keypair.generate();
        if(!provider){
            throw new Error();
        }

        const a = JSON.stringify(idl);
        const b = JSON.parse(a);
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(b, programID, provider);
        try {
        /* interact with the program via rpc */
        await program.rpc.initialize({});

        // const account = await program.account.my_account.fetch(baseAccount.publicKey);
        // console.log('account: ', account);
        // setValue(account.count.toString());
        } catch (err) {
            console.log("Transaction error: ", err);
        }
    }
    return (
        <div className="App">
            <button onClick={initialize}>initialize</button>
            <WalletMultiButton />
        </div>
    );
};
