import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Room } from './pages/Room';
import { RoomListing } from './pages/RoomListing';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/rooms/:id" component={Room} />
          <Route path="/" component={RoomListing} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
