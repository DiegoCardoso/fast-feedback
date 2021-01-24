import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from "@chakra-ui/core"

const SiteTableHeader = ({ isPaidAccount }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
    </Flex>
  </Box>
)

export default SiteTableHeader