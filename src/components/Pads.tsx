import React from "react";
import Pad from "./Pad";
import { colors } from "../constants";

export const PadsByComponentName = {
    GreenPad: ({ ...props }) => (
      <Pad color={colors.green} onClick={props.onClick} active={props.active} />
    ),
    RedPad: ({ ...props }) => (
      <Pad color={colors.red} onClick={props.onClick} active={props.active} />
    ),
    YellowPad: ({ ...props }) => (
      <Pad color={colors.yellow} onClick={props.onClick} active={props.active} />
    ),
    BluePad: ({ ...props }) => (
      <Pad color={colors.blue} onClick={props.onClick} active={props.active} />
    ),
};

interface PadsProps {
    pad: { id: string, 
        component: string, 
        active: boolean 
    };
    onClick: Function;
}
  
const Pads: React.FC<PadsProps> = ({ pad, onClick }) => {
    const { component } = pad;
    const Composed = (PadsByComponentName as any)[component];
    return <Composed {...pad} onClick={onClick} />;
};

export default Pads;