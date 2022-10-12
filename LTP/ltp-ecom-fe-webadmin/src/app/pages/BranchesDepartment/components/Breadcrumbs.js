import { Link, makeStyles } from '@material-ui/core';
import MBreadcrumbs from 'app/components/Breadcrumbs';
import { urlBranch } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import React from 'react';
import { useHistory } from 'react-router-dom';

function Breadcrumbs({ links }) {
  const classes = useStyles();
  const history = useHistory();
  const rootLink = {
    name: '',
    href: urlBranch,
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
        href={urlBranch}
        onClick={(event) => handleClick(event, rootLink)}>
        Danh sách văn phòng đại diện
      </Link>
      {links.map((link, key) => <Link key={key}
        className={classes.link}
        color="inherit"
        className={key + 1 == links.length ? classes.link : classes.activeLink}
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