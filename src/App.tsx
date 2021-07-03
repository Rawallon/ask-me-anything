import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { RoomsContextProvider } from './contexts/RoomsContext';

import { Room } from './pages/Room';
import { RoomListing } from './pages/RoomListing';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RoomsContextProvider>
          <Switch>
            <Route path="/rooms/:id" component={Room} />
            <Route path="/" component={RoomListing} />
          </Switch>
        </RoomsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
