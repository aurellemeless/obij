const config = {
    bcrypt : {
        saltRounds : 10
    },
    cookieConfig : {
	  httpOnly: true, // to disable accessing cookie via client side js
	  //secure: true, // to force https (if you use it)
	  maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
	  signed: true // if you use the secret with cookieParser
	}
};

module.exports = config;