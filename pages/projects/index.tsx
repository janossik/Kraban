import ProjectCard from "@/components/ProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCard/ProjectCardSkeleton";
import useGet from "@/hooks/useGet";
import ProjectService from "@/service/ProjectService";
import styled from "styled-components";

const ProjectMesh = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 300px));
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.color.secondaryText};
`;

const Projects = () => {
  const [projects] = useGet(ProjectService.readAll);

  return (
    <ProjectMesh>
      {projects && projects?.length > 0 ? (
        <>
          {projects?.map((props) => (
            <ProjectCard key={props.id} {...props} />
          ))}
        </>
      ) : (
        <>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </>
      )}
    </ProjectMesh>
  );
};

export default Projects;
