import { Route } from 'react-router-dom';  

export default function PublicLayout({component: Component, ...rest}) {
  return (
    <Route {...rest} render={props => (
      <div>
        <Component {...props} />  
      </div>
    )} />
  );
}