import { motion } from "motion/react";

type Props = {
  size?: number;
};

export default function Spinner({ size }: Props) {
  return (
    <motion.div
      style={{
        width: size || 10,
        height: size || 10,
      }}
      className="border-2 border-moonlightSlight border-dotted rounded-full"
      animate={{ rotateZ: "360deg" }}
      transition={{
        duration: 0.9,
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  );
}
