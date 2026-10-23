import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ArrowRight, Briefcase, Code, EnvelopeSimple, FilePdf, GraduationCap, House, SquaresFour, User,
} from '@phosphor-icons/react';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';
import Social from './Social';

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

// Icônes Phosphor des tuiles du menu mobile, par route.
const MENU_ICONS = {
  '/': House,
  '/about': User,
  '/skills': Code,
  '/education': GraduationCap,
  '/experience': Briefcase,
  '/projects': SquaresFour,
  '/contact': EnvelopeSimple,
};

function MenuIcon({ href }) {
  const Icon = MENU_ICONS[href] || House;
  return <Icon size={24} weight="duotone" aria-hidden="true" />;
}

MenuIcon.propTypes = { href: PropTypes.string.isRequired };

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  // Menu mobile : se ferme au changement de page ou avec Échap, et bloque le
  // défilement de la page tant qu'il est ouvert.
  const location = useLocation();
  useEffect(() => setExpanded(false), [location]);
  useEffect(() => {
    if (!expanded) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setExpanded(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [expanded]);

  const pages = data?.sections?.filter((s) => s.type !== 'link') ?? [];
  const cv = data?.sections?.find((s) => s.type === 'link');

  return (
    <>
      <Navbar
        fixed="top"
        expand="lg"
        variant={theme.bsPrimaryVariant}
        className="navbar-custom"
        expanded={expanded}
      >
        <Container>
          {data?.logo && (
            <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
              <img
                src={data?.logo?.source}
                className="d-inline-block align-top"
                alt="Accueil — Gallo SALL"
                style={
                  data?.logo?.height && data?.logo?.width
                    ? { height: data?.logo?.height, width: data?.logo?.width }
                    : styles.logoStyle
                }
              />
            </Navbar.Brand>
          )}
          <button
            type="button"
            className={`menu-toggle${expanded ? ' menu-toggle--open' : ''}`}
            aria-controls="mobile-menu"
            aria-expanded={expanded}
            aria-label={expanded ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setExpanded(!expanded)}
          >
            <span />
            <span />
          </button>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {data
                && data.sections?.map((section, index) => (section?.type === 'link' ? (
                  <ExternalNavLink
                    key={section.title}
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {section.title}
                  </ExternalNavLink>
                ) : (
                  <InternalNavLink
                    key={section.title}
                    onClick={() => setExpanded(false)}
                    end={index === 0}
                    className="navbar__link"
                    to={section.href}
                    theme={theme}
                  >
                    {section.title}
                  </InternalNavLink>
                )))}
            </Nav>
            <ThemeToggler
              onClick={() => setExpanded(false)}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className={`mobile-menu__backdrop${expanded ? ' mobile-menu__backdrop--open' : ''}`}
        aria-hidden="true"
        onClick={() => setExpanded(false)}
      />
      <div
        id="mobile-menu"
        className={`mobile-menu${expanded ? ' mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!expanded}
        inert={expanded ? undefined : ''}
      >
        <div className="mobile-menu__profile">
          <img src="images/about/profile.webp" alt="" width="48" height="48" />
          <div>
            <strong>Gallo SALL</strong>
            <span className="mobile-menu__status">Disponible</span>
          </div>
          <button
            type="button"
            className="menu-toggle menu-toggle--open"
            aria-label="Fermer le menu"
            onClick={() => setExpanded(false)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav className="mobile-menu__grid" aria-label="Menu principal">
          {pages.map((section, index) => {
            const isContact = section.href === '/contact';
            return (
              <NavLink
                key={section.title}
                to={section.href}
                end={index === 0}
                className={`mobile-menu__tile${isContact ? ' mobile-menu__tile--cta' : ''}`}
                style={{ transitionDelay: expanded ? `${60 + index * 35}ms` : '0ms' }}
              >
                <MenuIcon href={section.href} />
                <span>{isContact ? 'Me contacter' : section.title}</span>
                {isContact && <ArrowRight className="mobile-menu__arrow" size={20} weight="bold" aria-hidden="true" />}
              </NavLink>
            );
          })}
        </nav>
        <div className="mobile-menu__footer">
          <div className="mobile-menu__actions">
            {cv && (
              <a className="btn-pill btn-ghost" href={cv.href} target="_blank" rel="noopener noreferrer">
                <FilePdf size={20} weight="duotone" aria-hidden="true" />
                Mon CV
              </a>
            )}
            <ThemeToggler />
          </div>
          <Social />
        </div>
      </div>
    </>
  );
};

export default NavBar;
