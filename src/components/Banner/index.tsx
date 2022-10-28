import { FC } from "react";
import "./style.css";

interface Props {
  showBanner: boolean;
  success: boolean;
  userAddress: string;
}
const Banner: FC<Props> = ({ showBanner, success, userAddress }) => {
  if (!showBanner) {
    return null;
  }
  return (
    <div className={`${!success && "bg-red"} banner`}>
      {success
        ? `Tokens minted to address: ${userAddress}`
        : "Transaction failed"}
    </div>
  );
};

export default Banner;
