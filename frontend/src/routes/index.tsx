import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import CreatePoint from '../pages/CreatePoint';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/create-point" component={CreatePoint} />
    <Route path="/update-point/:id" component={CreatePoint} />
    <Route path="/list-points" component={Dashboard} />
  </Switch>
);

export default Routes;
