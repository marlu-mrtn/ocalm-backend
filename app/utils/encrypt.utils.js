import bcrypt from 'bcrypt';

const encrypt = {
    hashed: function (password) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    compared: function (password, hash) {
        return bcrypt.compareSync(password, hash);
    },
}

export default encrypt;
