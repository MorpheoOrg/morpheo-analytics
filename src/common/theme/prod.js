import {createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import indigo from 'material-ui/colors/indigo';

const theme = createMuiTheme({
    palette: createPalette({
        primary: indigo, // Purple and green play nicely together.
    }),
});

export default theme;
