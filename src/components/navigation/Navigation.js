import React             from 'react';
import { NavLink, Link } from 'react-router-dom';
import OffCanvas         from './OffCanvas';


const Navigation = (props) => {
  const headerContent = () => {
    return (
      <Link 
        className="navbar-brand p-0 fs-1 lh-1 link-light" 
        style={{ fontFamily: 'Montserrat' }}
        to="/"
      >WebTek</Link>
    );   
  } 
  
  
  const BodyContent = () => {
    return (
      <nav id="primary-navigation">
        <div className="container-fluid">
          <NavLink className="nav-link" activeClassName="active-link" exact to="/">Home</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/users">Users</NavLink>
          <NavLink className="nav-link" activeClassName="active-link" to="/posts">Posts</NavLink>
        </div>
      </nav>
    );
  };


  /////////////////////////////////////////////////////////////////////////////
  //
  // headerContent can be straight JSX or a function.
  //   <OffCanvas title="not used" headerContent={<h5 className="offcanvas-title text-secondary">Header Content from JSX...</h5>} />
  //   <OffCanvas title="not used" headerContent={headerContent} />
  //
  //   title is an optional string. However, if headerContent is included, it will not get used. 
  //
  //   bodyContent can be straight JSX or a function.
  //   bodyContent={<div className="p-5 bg-light text-center border rounded-3">Bodycontent from JSX...</div>}
  //   bodyContent={bodyContent}
  //
  //   position can be 'start', 'end', 'top', or 'bottom'. It defaults to 'start'.
  //
  //  closeButtonTheme can either be 'default' (i.e., anything but a theme color), or 'white'.
  //
  /////////////////////////////////////////////////////////////////////////////


  return (
    <OffCanvas 
      title="not used" 
      headerContent={headerContent} 
      bodyContent={BodyContent} 
      backdrop={true} 
      position='start'
      scrollable={false}
      closeButton={true}
      closeButtonTheme='white'
      classes='bg-deep-space'
      style={{ borderRight: '2px solid #000' }}
    />      
  );
};


export default Navigation;
