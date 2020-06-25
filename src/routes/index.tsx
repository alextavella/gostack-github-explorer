import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Respository from '../pages/Repository';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/repo/:name+" component={Respository} />
    </Switch>
  );
};

export default Routes;
