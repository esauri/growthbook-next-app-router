import React, { ReactNode } from "react";
import GrowthbookClientProvider from "./GrowthbookClientProvider";
import getUserId from "../../utils/getUserId";

type Props = {
  children: ReactNode;
};

export default function GrowthbookProvider({ children }: Props) {
  const userId = getUserId();

  return (
    <GrowthbookClientProvider id={userId}>{children}</GrowthbookClientProvider>
  );
}
