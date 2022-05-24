import Button from "@/components/Button";
import useGet from "@/hooks/useGet";
import ColumnService from "@/service/ColumnService";
import ProjectService from "@/service/ProjectService";
import TaskService from "@/service/TaskService";
import { IColumnProps, ITaskProps } from "@/types";
import { queryWithAuthorization } from "@/utils/client";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import styled from "styled-components";

const Column = (props: IColumnProps) => {
  const {
    query: { id },
  } = useRouter();
  const [tasks] = useGet<ITaskProps[]>(() =>
    TaskService.readAll(id as string, props.id)
  );
  return (
    <div>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div>
        <ul>
          {tasks?.map((props) => {
            return <div key={props.id}>{JSON.stringify(props)}</div>;
          })}
        </ul>
      </div>
    </div>
  );
};
const Mesh = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;
const Project = () => {
  const {
    query: { id },
  } = useRouter();
  const [project] = useGet(() => ProjectService.readOne(id as string));
  const [columns] = useGet<IColumnProps[]>(() =>
    ColumnService.readAll(id as string)
  );

  return (
    <div>
      <div>{project?.title}</div>
      <div>
        <ul>
          {project?.teams.map((team) => (
            <li key={team}>{team}</li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => {
          if (!columns) {
            return;
          }
          queryWithAuthorization(
            "post",
            `/api/project/${id}/column/${columns[0].id}/tasks`,
            null,
            {
              title:
                "Eu minim adipisicing voluptate qui nostrud ex elit consectetur consectetur exercitation laboris.",
              user: {
                uid: "MAR7e8vtxfbnNT2RcWjixS0GH603",
                name: "Tomasz Zalewski",
              },
              backgroundColor: "#d00",
              color: "#fff",
              description:
                "Commodo enim mollit duis esse in. Irure tempor ut voluptate officia esse adipisicing cupidatat. Ea irure commodo tempor adipisicing laboris quis irure minim ex laboris aliquip commodo. Id excepteur esse id duis. Ipsum ut id non magna culpa adipisicing officia id excepteur laboris fugiat.",

              createdAt: new Timestamp(
                new Date().getUTCSeconds() + 2_592_000,
                0
              ),
              deadline: new Timestamp(
                new Date().getUTCSeconds() + 2_592_000 * 2,
                0
              ),
              updatedAt: new Timestamp(
                new Date().getUTCSeconds() + 2_592_000 * 3,
                0
              ),
            }
          ).catch((err) => console.log(err));
        }}
      >
        Add Task
      </Button>
      <Button
        onClick={() => {
          queryWithAuthorization("post", `/api/project/${id}/columns`, null, {
            title: "Nostrud fugiat cupidatat sint sit fugiat proident proident",
            order: columns ? `${columns?.length}` : "0",
            wip: "3",
          }).catch((err) => console.log(err));
        }}
      >
        Add Column
      </Button>
      <Mesh>
        {columns?.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </Mesh>
    </div>
  );
};

export default Project;
