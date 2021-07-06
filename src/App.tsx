import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from './contexts/AuthContext';
import { RoomsContextProvider } from './contexts/RoomsContext';

import { Room } from './pages/Room';
import { RoomListing } from './pages/RoomListing';
import GlobalStyle from './styles/global';
import light from './styles/themes/light';

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
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
    </ThemeProvider>
  );
}

export default App;
