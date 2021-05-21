import React        from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage     from '../pages/HomePage';
import UsersPage    from '../pages/UsersPage';
import PostsPage    from '../pages/PostsPage';
import PostPage     from '../pages/PostPage';
import NotFoundPage from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;


  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <HomePage {...props} value={value}  />;
        }}
      />


      <Route 
        exact path="/users"
        render={(props) => {
          return <UsersPage {...props} value={value}  />;
        }}
      />

      <Route 
        exact path="/posts"
        render={(props) => {
          return <PostsPage {...props} value={value}  />;
        }}
      />

      <Route 
        path="/posts/:id" 
        render={(props) => {
          return <PostPage {...props} value={value}  />;
        }}
      />
      
      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

