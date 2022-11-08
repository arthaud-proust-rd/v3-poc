const ROUTES = require('./routes');
const axios = require('axios');
const fs = require('fs');
const path = require("path");

module.exports = class VCubManager {
    constructor() {
        this.storage_path = path.join(__dirname,'./storage.json');
        this.storage = {};

        this.loadStorage();

        if(!this.isLogged()) {
            this.login();
        }
    }

    isLogged(){
        return !!this.storage.access_token;
    }

    loadStorage() {
        if (fs.existsSync(this.storage_path)) {
            this.storage = JSON.parse(fs.readFileSync(this.storage_path).toString());
        } else {
            this.storage = {};
        }
    }

    saveStorage() {
        fs.writeFileSync(this.storage_path, JSON.stringify(this.storage));
    }

    async login() {
        const res = await axios.post(ROUTES.auth.login, {
            organizationId: 7,
            password: process.env.PASSWORD,
            username: process.env.EMAIL,
        })

        this.storage.access_token = res.data.access_token;
        this.saveStorage();
    }

    async getRentInProgress() {
        if(!this.isLogged()) {
            return 'User not logged';
        }
        const res = await axios.get(ROUTES.rent.in_progress, {
            headers: {
                Cookie: `token=${this.storage.access_token}`
            }
        })

        return res.data.content;
    }
}