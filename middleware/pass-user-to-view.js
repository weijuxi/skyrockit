




// request, response, next
// next is a function that passes the request
// to the next middleware function or controller 
// function in the middleware chain
function passUserToView(req, res, next){
	// res.locals is an object 
	// that when add a key to it like user, 
	// it automatically adds that variable 
	// to every single ejs page in our application
	if(req.session.user){
		res.locals.user = req.session.user
	} else {
		res.locals.user = null
	}
	next()

	// optional one line for the if statement
	// res.locals.user = req.session.user ? req.session.user : null
	// next()
}

module.exports = passUserToView
