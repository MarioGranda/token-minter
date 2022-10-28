import { FC } from "react";
import "./style.css";

interface Props {
  showBanner: boolean;
  success: boolean;
  userAddress: string;
}
const Banner: FC<Props> = ({ showBanner, success, userAddress }) => {
  return <div className="banner"></div>;
};

export default Banner;
