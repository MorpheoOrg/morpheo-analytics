import {createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import teal from 'material-ui/colors/teal';

const theme = createMuiTheme({
    palette: createPalette({
        primary: teal, // Purple and green play nicely together.
    }),
});

export default theme;
