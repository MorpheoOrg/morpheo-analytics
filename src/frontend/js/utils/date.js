/**
 * Created by guillaume on 8/19/16.
 */

export const parseUTC = date =>
    new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
        ),
    );

export default parseUTC;
