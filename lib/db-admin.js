import db from '@/utils/firebase-admin'

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('sideId', '==', siteId)
      .get()

      return { feedback: getDataArrayFromSnaphot(snapshot) }
  } catch (error) {
    return { error }
  }
}

export async function getAllSites() {
  const snapshot = await db.collection('sites').get()

  return { sites: getDataArrayFromSnaphot(snapshot)}
}

/**
 * 
 * @param {FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>} snapshot 
 * 
 * @returns Array
 */
function getDataArrayFromSnaphot(snapshot) {
  const arr = []

  snapshot.forEach(doc => arr
    .push({id: doc.id, ...doc.data()}))

  return arr
}