import { useAuth } from "@/utils/auth"
import { Avatar, Box, Flex, Link } from "@chakra-ui/core"

const DashboardShell = ({ children }) => {
  const { user } = useAuth()

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link mr={4}>Account</Link>
            <Avatar size="sm" src={user?.photoUrl}/>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default DashboardShell