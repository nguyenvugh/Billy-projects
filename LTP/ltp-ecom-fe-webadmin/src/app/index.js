import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "./app.css";
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import Loading from './Layouts/Loading';
import ModalErrorMessage from './Layouts/Loading/ModalErrorMessage';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Loading />
      <ModalErrorMessage />
      <Switch>
        <Route exact path={'/login'} component={Login} />
        <Route path="/" component={AuthenticatedLayout} />
      </Switch>
    </BrowserRouter>
  );
}