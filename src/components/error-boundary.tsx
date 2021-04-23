import * as React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

type Props = {
  fallbackRender: FallbackRender;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }

    return children;
  }
}
