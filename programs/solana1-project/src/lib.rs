use anchor_lang::prelude::*;

declare_id!("7sxccSdwCxgDaUC5Nhf7NiM96DNqqH4WENhZMpyfFXXz");

#[program]
pub mod solana1_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
