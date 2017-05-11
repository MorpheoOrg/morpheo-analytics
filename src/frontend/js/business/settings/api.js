/* globals localStorage */

export const storeSettings = (settings, value) => {
    localStorage.setItem(settings, value);
};

export default storeSettings;
