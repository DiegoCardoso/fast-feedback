import { db } from '@/utils/firebase-admin'
import { compareDesc, parseISO } from 'date-fns'

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

export async function getUserSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get()

    const sites = []

    snapshot.forEach(doc => {
      sites.push({id: doc.id, ...doc.data()})
    })

    sites.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))

    return { sites }
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