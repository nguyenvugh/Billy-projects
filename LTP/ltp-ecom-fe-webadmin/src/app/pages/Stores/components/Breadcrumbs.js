import { Link, makeStyles } from '@material-ui/core';
import MBreadcrumbs from 'app/components/Breadcrumbs';
import { urlStore } from 'app/Layouts/AuthenticatedLayout/Sidebar/url';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Breadcrumbs({ links }) {
  const classes = useStyles();
  const history = useHistory();
  const rootLink = {
    name: '',
    href: urlStore,
  };

  const handleClick = (event, link, index) => {
    if (index + 1 === links.length) return;
    event.preventDefault();
    history.push(link.href);
  };
  return (
    <MBreadcrumbs>
      <Link
        className={classes.link}
        color="inherit"
        href={urlStore}
        onClick={(event) => handleClick(event, rootLink)}>
        Danh sách hệ thống cửa hàng
      </Link>
      {links.map((link, key) => <Link key={key}
        className={key + 1 === links.length ? classes.link : classes.activeLink}
        color="inherit"
        onClick={(event) => handleClick(event, link, key)}>
        {link.label}
      </Link>)}
    </MBreadcrumbs>
  );
}

const useStyles = makeStyles(theme => ({
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