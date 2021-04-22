import * as React from "react";
import { Project } from "screens/project-list/list";
import { useAsync } from "./useAsync";
import { cleanObject } from "utils/index";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  React.useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
