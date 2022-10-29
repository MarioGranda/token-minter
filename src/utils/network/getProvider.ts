import { ethers } from "ethers";

const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export default getProvider;
