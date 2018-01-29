export const getLoginVariables = state => state.settings.login;

export const isLoginVariableSet = state => (
    getLoginVariables(state).ORCHESTRATOR_USER === undefined
);

export default {
    getLoginVariables,
    isLoginVariableSet,
};
