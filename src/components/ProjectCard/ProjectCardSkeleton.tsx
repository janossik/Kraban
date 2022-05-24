import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 120px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  position: absolute;
  top: 20px;
  left: 5%;
  display: flex;
  min-height: 20px;
  width: 80%;
  background: rgba(0, 0, 0, 0.3);
`;

const Button = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  height: 100%;
  width: 30px;
  background: rgba(0, 0, 0, 0.3);
`;

const Button2 = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  display: flex;
  height: 40px;
  width: 160px;
  background: rgba(0, 0, 0, 0.3);
`;

const ProjectCardSkeleton = () => {
  return (
    <Wrapper>
      <Title />
      <Button />
      <Button2 />
    </Wrapper>
  );
};

export default ProjectCardSkeleton;
