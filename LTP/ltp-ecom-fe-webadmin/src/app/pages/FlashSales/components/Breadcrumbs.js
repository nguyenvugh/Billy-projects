import React from 'react';
import { Link, Breadcrumbs as MBreadcrumbs, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { urlFlashSale } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';

function Breadcrumbs({ links }) {
  const classes = useStyles();
  const history = useHistory();
  const rootLink = {
    name: '',
    href: urlFlashSale
  };

  const handleClick = (event, link, index) => {
    if (index + 1 == links.length) return;
    event.preventDefault();
    history.push(link.href);
  };
  return (
    <MBreadcrumbs className={classes.breadcrumbs} separator="›" aria-label="breadcrumb">
      <Link
        className={classes.link}
        color="inherit"
        href={urlFlashSale}
        onClick={(event) => handleClick(event, rootLink)}>
        Flashsale
      </Link>
      {links.map((link, key) => <Link key={key}
        className={key + 1 == links.length ? classes.link : classes.activeLink}
        color="inherit"
        onClick={(event) => handleClick(event, link, key)}>
        {link.label}
      </Link>)}
    </MBreadcrumbs>
  );
}

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    '& .MuiBreadcrumbs-separator': {
      color: '#000000',
      fontSize: '18px',
      fontWeight: 600,
    }
  },

  activeLink: {
    color: '#000000',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'none'
    }
  },
  link: {
    color: '#000000',
    fontSize: '18px',
    fontWeight: 600,

    '&:hover': {
      textDecoration: 'none'
    }
  }
}));


Breadcrumbs.defaultProps = {
  links: []
};

export default Breadcrumbs;