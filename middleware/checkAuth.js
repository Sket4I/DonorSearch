import { db } from "../models/index.js"
import jwt from 'jsonwebtoken'

const User = db.users

export async function checkAuthentication(req, res, next) {
    try {
        const token = req.cookies.token
        if (token) {
            jwt.verify(token, process.env.secretKey, (err, decodedToken) => {
                if (err) {
                    console.log(err)
                    res.locals.user = null
                    next()
                } else {
                    const user = User.findOne({
                        where: {
                            id: decodedToken.id
                        }
                    })
                    if (user) {
                        res.body.user = user
                        next()
                    }
                }
            })
        } else {
            res.locals.user = null
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

export async function reqAuthentication(req, res, next) {
    // GETTING TOKEN FROM BROWSER
    const token = req.cookies.token;
    // VERIFYING USER - IF USER PASS THEN USER ABLE TO VISIT PARTICLUR ROUTE
    jwt.verify(token, process.env.secretKey, (err, decodedToken) => {
        // FAIELD TO VERIFY TOKEN USER NEED TO LOGIN TO CREATE NEW ACCESS TOKEN
        if (err) {
            console.log("There is no token error: ", err.message);
            res.redirect('/user/login');
        } else {
            // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
            console.log("decoded token", decodedToken);
            next();
        }
    });
}




// IF USER IS LOGGED IN THEY CAN'T GO TO LOGIN OR REGESTRATION PAGE
export async function notReqAuthentication(req, res, next) {
    // VERIFYING USER
    const token = req.cookies.token;
    // IF THERE IS A TOKEN NAME WITH JWT THEN IT IT WON'T LET USER GO SOME ROUTE
    if (token) {
        console.log("There is an token");
        res.redirect('/');
    } else {
        // IF THERE IS NO TOKEN THEN USER ALLOW TO VISIT CERTAIN ROUTE
        console.log("There is no token ");
        next();
    }
}