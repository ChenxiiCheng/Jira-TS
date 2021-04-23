import * as React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: string;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
  loading: boolean;
}

export const List = ({ list, users, loading }: ListProps) => {
  return (
    <Table
      loading={loading}
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
