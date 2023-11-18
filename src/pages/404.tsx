import { Link } from "@chakra-ui/next-js";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { PageWithAppBar } from "~/components/layout/AppBar";

export default function NotFound() {
  return (
    <PageWithAppBar>
      <Box textAlign="center" py={[32, null, 16, 24, 32]} px={16}>
        <Heading display="inline-block" as="h2" size="3xl" color="primary">
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2} fontWeight="medium">
          Not found
        </Text>
        <Text fontSize="7xl" mt={3} mb={2} fontWeight="medium">
          🐒
        </Text>
        <Text fontSize="lg" mb={6}>
          Nothing to lurk here, go away
        </Text>
        <Link href="/">
          <Button variant="primary" size="lg">
            Go to home
          </Button>
        </Link>
      </Box>
    </PageWithAppBar>
  );
}
