import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage }      from '../pages/HomePage';
import { UsersPage }     from '../pages/UsersPage';
import { UsersPage2 }    from '../pages/UsersPage2';
import NotFoundPage      from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;


  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <HomePage {...props} value={value} />;
        }}
      />

      <Route 
        path="/users"
        render={(props) => {
          return <UsersPage {...props} value={value} />;
        }}
      />

      <Route 
        path="/users2"
        render={(props) => {
          return <UsersPage2 {...props} value={value} />;
        }}
      />
      
      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

