const hre = require("hardhat");

async function main() {
  const Create = await hre.ethers.getContractFactory("Create"); // Ensure the name is correct here
  const create = await Create.deploy(); // Deploy the contract

  await create.deployed(); // Wait for the deployment to complete

  console.log("Contract deployed to:", create.address);
}

main().catch((error) => {
  console.error(error); 
  process.exitCode = 1;
});
