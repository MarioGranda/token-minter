import { ethers } from "ethers";
import { abi } from "../constants/token/abi";
import { address } from "../constants/token/address";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const getTokenContract = () => {
  return new ethers.Contract(address, abi, provider);
};

export const getTokenName = async () => {
  return await getTokenContract().name();
};

export const getTokenSymbol = async () => {
  return await getTokenContract().symbol();
};

export const getUserBalance = async () => {
  const accounts = await provider.send("eth_accounts", []);
  return Number(await getTokenContract().balanceOf(accounts[0]));
};
