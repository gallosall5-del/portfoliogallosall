import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Header(props) {
  const { title } = props;

  useEffect(() => {
    document.title = `${title} — Gallo SALL`;
  }, [title]);

  return <h1 className="header">{title}</h1>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
