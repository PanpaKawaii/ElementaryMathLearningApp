import React from 'react'

const CheckValidation = (Username, Name, Role, Password, Confirm, Accept) => {

    if (!Username) {
        console.error('Invalid username');
        return {
            value: 'Invalid username',
            name: 'Username',
        };
    }
    if (!Name) {
        console.error('Invalid full name');
        return {
            value: 'Invalid full name',
            name: 'Name',
        };
    }
    if (!Role) {
        console.error('Invalid role');
        return {
            value: 'Invalid role',
            name: 'Role',
        };
    }
    // if (!Phone) {
    //     console.error('Invalid phone number');
    //     return {
    //         value: 'Invalid phone number',
    //         name: 'Phone',
    //     };
    // }
    if (!Password) {
        console.error('Invalid password');
        return {
            value: 'Invalid password',
            name: 'Password',
        };
    }
    if (!Confirm) {
        console.error('Invalid password confirmation');
        return {
            value: 'Invalid password confirmation',
            name: 'Confirm',
        };
    }

    if (Role !== 'Student' && Role !== 'Parent') {
        console.error('Unsupport role');
        return {
            value: 'Unsupport role',
            name: 'Role',
        };
    }
    // if (!/^\d+$/.test(Phone)) {
    //     console.error('Phone number must contain only digits');
    //     return {
    //         value: 'Phone number must contain only digits',
    //         name: 'Phone',
    //     };
    // }
    // if (Phone.length !== 10) {
    //     console.error('Phone number must contain exactly 10 digits');
    //     return {
    //         value: 'Phone number must contain exactly 10 digits',
    //         name: 'Phone',
    //     };
    // }
    if (Password.length < 6) {
        console.error('Password must be at least 6 characters long');
        return {
            value: 'Password must be at least 6 characters long',
            name: 'Password',
        };
    }
    if (Password != Confirm) {
        console.error('Wrong password confirmation');
        return {
            value: 'Wrong password confirmation',
            name: 'Password or Confirm',
        };
    }
    if (Accept === false) {
        console.error('You have not accept provision yet');
        return {
            value: 'You have not accept provision yet',
            name: 'Accept',
        };
    }

    return {
        value: 'OK',
        name: 'OK',
    };
}

export default CheckValidation;