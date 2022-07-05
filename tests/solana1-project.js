const anchor = require("@project-serum/anchor");
const assert = require('assert') 
const {SystemProgram} = anchor.web3;

describe("solana1-project", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
   anchor.setProvider(anchor.AnchorProvider.env());
  // const provider = anchor.AnchorProvider.env();
  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.Solana1Project;
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
  // it("Creates a counter)", async () => {
  //   const program = anchor.workspace.Solana1Project;
  //   /* Call the create function via RPC */
  //   const baseAccount = anchor.web3.Keypair.generate();
  //   await program.rpc.create({
  //     accounts: {
  //       baseAccount: baseAccount.publicKey,
  //       user: provider.wallet.publicKey,
  //       systemProgram: SystemProgram.programId,
  //       signers: [baseAccount],
  //     },
  //   });
  //   /* Fetch the account and check the value of count */
  //   const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  //   console.log('Count 0: ', account.count.toString())
  //   assert.ok(account.count.toString() == 0);
  //   _baseAccount = baseAccount;

  // });  
  
});
