import { clientAuth } from "@/clientFirebase";
import useModal from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import UserService from "@/service/UserService";
import Link from "next/link";
import styled from "styled-components";
import Button from "../Button";

const Wrapper = styled.nav<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: clamp(280px, 100%, 240px);
  padding: 40px 10px 10px;
  transform: translateX(${({ active }) => (active ? 0 : "-100%")});
  transition: 300ms ease-out;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 99;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    li {
      a {
        text-decoration: none;
      }
    }
  }
  button {
    margin-top: auto;
  }
`;

const WrapperMenuButton = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
`;

const MenuButton = styled(Button)`
  min-width: 70px;
  height: 30px;
  background: ${({ theme }) => theme.color.background};
`;

const Navigation = () => {
  const { admin } = useUser();
  const { active, ref, invert, close } = useModal();

  return (
    <div ref={ref}>
      <WrapperMenuButton>
        <MenuButton version="secondary" onClick={invert}>
          {active ? "Close" : "Menu"}
        </MenuButton>
      </WrapperMenuButton>
      <Wrapper active={active}>
        <ul>
          <li>
            <Link href="/">
              <Button as="a" version="tertiary" onClick={close}>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <Button as="a" version="tertiary" onClick={close}>
                Users
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <Button as="a" version="tertiary" onClick={close}>
                Projects
              </Button>
            </Link>
          </li>
          {admin && (
            <li>
              <Link href="/admin">
                <Button as="a" version="tertiary" onClick={close}>
                  admin
                </Button>
              </Link>
            </li>
          )}
        </ul>
        <Button
          onClick={() => {
            if (clientAuth.currentUser) {
              UserService.update(clientAuth.currentUser.uid, {
                status: false,
              });
              clientAuth.signOut();
            }
          }}
        >
          Sign Out
        </Button>
      </Wrapper>
    </div>
  );
};

export default Navigation;
