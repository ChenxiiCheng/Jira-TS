import * as React from "react";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });
  const [list, setList] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const client = useHttp();
  const debouncedParam = useDebounce(param, 2000);

  useMount(() => {
    client("users").then(setUsers);
  });

  React.useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
