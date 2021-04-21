import styled from "@emotion/styled";

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
