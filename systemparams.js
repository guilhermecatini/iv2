const env = 'P'; // P = Prdocution / H = Homolog

if (env=='P') {
    const globalParams = {
        accessPort: 8888,
        dataBaseName: 'iv2',
        protectRoutes: true, 
        enableRegisterUsers: false
    }
} else {
    const globalParams = {
        accessPort: 8889,
        dataBaseName: 'iv2tst',
        protectRoutes: false, 
        enableRegisterUsers: true
    }
}

module.exports = globalParams;