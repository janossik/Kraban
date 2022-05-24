import Navigation from "@components/Navigation";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navigation />
      <>{children}</>
    </>
  );
};

export default MainLayout;
