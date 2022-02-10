const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
dotenv.config();
admin.initializeApp();

app.post("/addUserNoToken", async (req, res) => {
    await admin.firestore().collection("users").doc(req.body.email).set({
        email: req.body.email,
        policy: false,
        serial: req.body.serial,
        alarmLog: []
    });

    res.status(200).send({ result: "success" });
});

app.post("/iotInfo", async (req, res) => {
    await admin.firestore().collection("serial").doc(req.body.number).set({
        number: req.body.number,
        data: req.body.data,
        carbon: req.body.carbon,
        type: parseInt(parseInt(req.body.number) / 1000000)
    }).catch(err => {
        console.log(err);
        res.status(500).send({ result: "fail" });
    });

    res.status(200).send({ result: "success" });
});

app.put("/iotInfo", async (req, res) => {
    const snapshot = (await admin.firestore().collection("serial").doc(req.body.number).get()).data();
    console.log(snapshot);

    const dataList = [...snapshot.data, req.body.data];
    const carbonList = [...snapshot.carbon, req.body.carbon];

    await admin.firestore().collection("serial").doc(req.body.number).update({
        data: dataList,
        carbon: carbonList
    })

    res.status(200).send("uha");
});

const authMiddleware = require("./authMiddleware");
app.use(authMiddleware);

app.get("/info", async (req, res) => {
    console.log(req.user.email);
    const snapshot = await admin.firestore().collection("users").doc(req.user.email).get();
    res.status(200).send(JSON.stringify(snapshot.data()));
});

app.put("/addSerial", async (req, res) => {
    await admin.firestore().collection("users").doc(req.user.email).update({
        serial: req.body.serial
    });

    res.status(200).send();
});

app.get("/getSerial", async (req, res) => {
    const snapshot = await admin.firestore().collection("serial").get();

    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.id);
    });

    res.status(200).json(result);
});

app.get("/stat", async (req, res) => {
    const snapshot = (await admin.firestore().collection("serial").doc(req.query.serial).get()).data();

    const data = snapshot.data[snapshot.data.length - 1];
    const carbon = snapshot.carbon[snapshot.carbon.length - 1];

    res.status(200).send(JSON.stringify({ type: snapshot.type, statData: data, statCarbon: carbon }));
});

app.get("/mail", async (req, res) => {

    let yesterday_total = 0;
    let last_total = 0;

    const emit = await admin.firestore().collection("serial").get();

    emit.forEach(doc => {
        for (let index = doc.data().carbon.length - 1; index >= doc.data().carbon.length - 10; index--) {
            let element = doc.data().carbon[index];
            last_total += parseInt(element);
        }
        yesterday_total += parseInt(doc.data().carbon[doc.data().carbon.length - 1]);
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOpt = {
        from: process.env.GMAIL_USER,
        to: req.user.email,
        subject: "탄소 매출량 요약 보고서",
        text: `전날 모든 사용자의 탄소 배출량: ${yesterday_total}` + "\n"
            + `이전 10일간 모든 사용자의 탄소 배출량: ${last_total}`
    };

    transporter.sendMail(mailOpt, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email Sent: " + info.response);
        }
    });

    res.status(200).send({ result: "success" });
});

exports.user = functions.https.onRequest(app);

exports.storeUserData = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection("users").doc(user.email).set({
        email: user.email,
        policy: false,
        serial: [],
        alarmLog: []
    });
});