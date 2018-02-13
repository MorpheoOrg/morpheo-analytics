export const getCredentials = state => state.settings.login;

export const isLoginVariableSet = state => (
    getCredentials(state).username === undefined
);

export default {
    getCredentials,
    isLoginVariableSet,
};
