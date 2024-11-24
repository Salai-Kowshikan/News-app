import { Appbar } from 'react-native-paper';

const NavBar = () => (
  <Appbar.Header elevated>
    <Appbar.Content title="Spilled tea ☕" />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default NavBar;