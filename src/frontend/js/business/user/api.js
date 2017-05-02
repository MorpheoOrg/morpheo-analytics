/* globals localStorage */
export function fetchSignIn(email, password) {
    // XXX I hard code for now but we will need an auth system soon
    return new Promise((resolve, reject) => resolve({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4',
        user: {
            permission: 'admin',
            has_permission: true,
            id: 'zloten',
            firstName: 'zlotenFirstName',
            lastName: 'zlotenLastName',
        },
    }))
        .then(json => ({res: json}), error => ({
            error,
        }));
}

export const storeLocalUser = ({user: {exp, permission, username, firstName, lastName}, token, email}) => {
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('exp', exp);
    localStorage.setItem('token', token);
    localStorage.setItem('permission', permission);
};

export const removeLocalUser = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('exp');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
};
