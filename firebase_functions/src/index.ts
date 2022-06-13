import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

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
        snap.after.ref.update({
            updated_at: firestore.Timestamp.fromDate(new Date()),
        });
    });
