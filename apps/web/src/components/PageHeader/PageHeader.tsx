import type { ReactNode } from "react";
import { PageHeaderContainer } from "./PageHeaderElements";

type PageHeaderProps = {
  title: string;
  action?: ReactNode;
};

export const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <PageHeaderContainer>
      <h1>{title}</h1>
      {action}
    </PageHeaderContainer>
  );
};
