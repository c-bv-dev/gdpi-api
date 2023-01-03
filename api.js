const express = require("express");
const cors = require("cors");
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const commonEn = require("./translations/en/common.json");
const commonFr = require("./translations/fr/common.json");
const middlewaresEn = require("./translations/en/middlewares.json");
const middlewaresFr = require("./translations/fr/middlewares.json");
const { createBill } = require("./middlewares/billingProcess");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(cors());
app.use(i18nextMiddleware.handle(i18next));

/**-------------------------------------
 **               I18NEXT
 *--------------------------------------* */
i18next
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        resources: {
            en: {
                translation: {
                    ...commonEn,
                    ...middlewaresEn
                }
            },
            fr: {
                translation: {
                    ...commonFr,
                    ...middlewaresFr
                }
            },
        },
        fallbackLng: 'en',
        preload: ['en', 'fr']
    });



/**-------------------------------------
 **               ROUTES
 *--------------------------------------* */

// VERIFICATION API ONLINE
app.get("/", (req, res) => {
    const response = req.t("general.apionline")
    res.status(200).send(response);
});

// TICKETS
app.use("/tickets", require("./routes/tickets"));

// ADMIN
app.use("/admin", require("./routes/admin"));

// PROJECTS
app.use(require("./routes/projects"));

// SGDS
app.use(require("./routes/sdgs"));

// CARTS
app.use(require("./routes/carts"));

// TRANSACTIONS
app.use(require("./routes/transactions"));

// USERS
app.use(require("./routes/users"));

// 404 ROUTE NOT FOUND
app.use("*", (req, res) => {
    const response = req.t("general.notfound")
    res.status(404).send(response);
});
module.exports = app;