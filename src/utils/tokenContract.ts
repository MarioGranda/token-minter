import { ethers } from "ethers";
import { abi } from "../constants/token/abi";
import { address } from "../constants/token/address";

const getTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(address, abi, provider);
};

export const getTokenName = async () => {
  return await getTokenContract().name();
};

export const getTokenSymbol = async () => {
  return await getTokenContract().symbol();
};
