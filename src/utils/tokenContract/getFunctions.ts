import { ethers } from "ethers";
import { abi } from "../../constants/token/abi";
import { address } from "../../constants/token/address";
import getProvider from "../network/getProvider";

const provider = getProvider();

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
  return (await getTokenContract().balanceOf(accounts[0])).toString();
};
