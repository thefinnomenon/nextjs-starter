import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import DarkModeControl from '@/components/DarkModeControl';
import LanguageControl from '@/components/LanguageControl';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import NavOverlay from '@/components/NavOverlay';
import IconButton from '@/components/IconButton';

type Props = {} & typeof defaultProps;

const defaultProps = Object.freeze({});
const initialState = Object.freeze({
  showOverlay: false,
});

const navItems = [
  { title: 'one', href: '/one' },
  { title: 'two', href: '/two' },
  { title: 'three', href: '/three' },
];

export default function Header(props: Props): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(initialState.showOverlay);

  const handleOpenOverlay = () => {
    setShowOverlay(true);
  };

  return (
    <Wrapper>
      <Link href='/' passHref>
        <LogoLink>
          <Logo src='/vercel.svg' height={40} width={100} alt='Site logo' />
        </LogoLink>
      </Link>
      <Controls>
        <DarkModeControl />
        <LanguageControl />
      </Controls>
      <HamburgerMenu
        icon={faHamburger}
        size='lg'
        altText='Open Menu'
        onClick={() => handleOpenOverlay()}
      />
      <NavItems>
        {navItems.map(({ title, href }) => (
          <Link key={title} href={href} passHref>
            <NavItem>
              <FormattedMessage id={title} />
            </NavItem>
          </Link>
        ))}
      </NavItems>
      <NavOverlay isVisible={showOverlay} setIsVisible={setShowOverlay} />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1366px;
  height: 48px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  background: var(--bg);
`;

const LogoLink = styled.a`
  float: left;
  height: 100%;
  padding-left: 8px;
  display: flex;
  align-items: center;
`;

const Logo = styled(Image)``;

const HamburgerMenu = styled(IconButton)`
  display: none;
  float: right;
  height: 100%;

  @media (max-width: 550px) {
    display: revert;
    margin-right: 8px;
  }
`;

const NavItems = styled.nav`
  float: right;
  height: 100%;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 550px) {
    display: none;
  }
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  height: 100%;
  font-weight: bold;
  color: inherit;
  text-decoration: none;

  &:hover {
    padding-top: 0.2rem;
    border-bottom: 0.2rem solid;
  }
`;

const Controls = styled.div`
  float: right;
  height: 100%;
  padding-right: 8px;
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 550px) {
    display: none;
  }
`;

Header.defaultProps = defaultProps;
