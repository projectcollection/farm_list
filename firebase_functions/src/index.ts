import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
type Farm = {
    name: string;
    displayName: string;
    phone?: string;
    openHours?: string;
    image?: string;
    created_at?: firestore.Timestamp;
    updated_at?: firestore.Timestamp;
};

exports.on_create_farm = functions.firestore
    .document("farms/{name}")
    .onCreate((snap, context) => {
        snap.ref.update({
            created_at: firestore.Timestamp.fromDate(new Date()),
        });
    });

exports.on_update_farm = functions.firestore
    .document("farms/{name}")
    .onUpdate((snap, context) => {
        const { name, displayName, phone, openHours } =
            snap.before.data() as Farm;

        const {
            name: _n,
            displayName: _d,
            phone: _p,
            openHours: _o,
        } = snap.after.data() as Farm;

        if (
            name === _n &&
            displayName === _d &&
            phone === _p &&
            phone === _p &&
            openHours === _o
        ) {
            return;
        }

        snap.after.ref.update({
            updated_at: firestore.Timestamp.fromDate(new Date()),
        });
    });
