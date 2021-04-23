import * as React from "react";
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

type Props = {
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
};

export const Row = styled.div<Props>`
  display: flex;
  justify-content: ${({ between }) => (between ? "space-between" : undefined)};
  align-items: center;
  margin-bottom: ${({ marginBottom }) => marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      typeof gap === "number" ? gap + "rem" : gap ? "2rem" : undefined};
  }
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
