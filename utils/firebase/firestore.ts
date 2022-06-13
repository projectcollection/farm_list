import { doc, getDoc, updateDoc, UpdateData } from "firebase/firestore";
import { db } from "../../config/firebase";

export { doc_exists, update_doc };

async function doc_exists(collection: string, id: string): Promise<boolean> {
    const doc_snap = await getDoc(doc(db, collection, id));

    return doc_snap.exists();
}

async function update_doc(
    collection: string,
    id: string,
    data: UpdateData<any>
): Promise<boolean> {
    const ref = doc(db, collection, id);
    try {
        await updateDoc(ref, data);
        return true;
    } catch (err) {
        return false;
    }
}
