import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const lightTheme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      light: '#4fc2f7',
      main: '#02203c',
      hover:'#76afe4',
      background: '#f6f9fc',
      dark: '#000',
      contrastText: '#000'
    },
  },
  
});

export default lightTheme;