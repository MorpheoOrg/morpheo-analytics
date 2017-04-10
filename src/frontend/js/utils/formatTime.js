/**
 * Created by guillaume on 2/22/17.
 */
import {parse, isValid, setHours, setMinutes} from 'date-fns';

const format = value => value === '' || typeof value === 'undefined' || !value ?
    null :
    !(value && isValid(parse(value))) ?
        // not valid date (ex '13:37'), create date with given time
        setHours(setMinutes(new Date(), value.split(':')[1]), value.split(':')[0]) :
        // valid date, parse it
        parse(value);

export default format;
