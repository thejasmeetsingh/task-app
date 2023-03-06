const sgMail = require("@sendgrid/mail");

const sengridAPIKey = process.env.SENGRID_API_KEY

sgMail.setApiKey(sengridAPIKey);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Thanks for joining in!",
        text: `Welcome aboard ${name}!`
    }

    sgMail.send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
    })
    .catch((error) => {
        console.error(error)
    })
}

const sendAccountDeletionEmail = (email, name) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Bye Bye!",
        text: `See you soon ${name}!`
    }

    sgMail.send(msg)
    .then((response) => {
        console.log(response[0].statusCode)
    })
    .catch((error) => {
        console.error(error)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendAccountDeletionEmail
}