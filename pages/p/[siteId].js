import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { useAuth } from '@/utils/auth'
import { useRef, useState } from 'react'
import Feedback from '@/components/Feedback'
import { auth } from 'firebase'
import { createFeedback } from '@/lib/db'

export async function getStaticProps(context) {
  const sitedId = context.params.siteId
  const auth = useAuth()
  const { feedback } = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default function FeedbackPage({ initialFeedback }) {
  const router = useRouter()
  const auth = useAuth()
  const inputEl = useRef(null)
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = e => {
    e.preventDefault()

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    }

    inputEl.current.value = ''
    setAllFeedback([newFeedback, ...allFeedback])
    createFeedback(newFeedback)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form">
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment"/>
            <Button mt={4} type="submit" fontWeight="medium">
              Add comment
            </Button>
          </FormControl>
        </Box>  
      )}

      {initialFeedback &&
        initialFeedback.map(feedback => (
          <Feedback key={feedback.id} {...feedback}/>
        ))
      }
    </Box>
  )
}