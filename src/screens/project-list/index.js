import * as React from "react";
import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });
  const [list, setList] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  React.useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [param]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
