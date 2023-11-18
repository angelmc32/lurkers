import { useState } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";

import { api } from "~/utils/api";

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { PageWithAppBar } from "~/components/layout/AppBar";
import LoadingPage from "~/components/loader/index";

const User = () => {
  const { query: userIdParams } = useRouter();
  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ready, user } = usePrivy();
  const toast = useToast();

  // const { data: userData } = api.users.getUser.useQuery({
  //   id: userIdParams.id as string,
  // });

  // const { mutate: createUser, isLoading: isSubmitting } =
  //   api.users.createUser.useMutation({
  //     onSuccess: () => {
  //       setIsLoading(false);
  //       toast({
  //         title: `¡Bienvenido ${usernameInputValue}!`,
  //         description: "Tu nombre de usuario registrado exitosamente",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //       const errorMsg =
  //         error.message ?? "No fue posible crear el usuario, intenta de nuevo";
  //       toast({
  //         title: "Ocurrió un error...",
  //         description: errorMsg,
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       setIsLoading(false);
  //     },
  //   });

  const handleUserCreation = () => {
    setIsLoading(true);
    if (!user) return;
    const userEmail = user?.google?.email ?? user?.github?.email;
    const data = {
      id: user?.id.replace("did:privy:", "") ?? "",
      username: usernameInputValue,
      email: userEmail ?? undefined,
    };
    console.log("remove console log to call createUser(data)");
  };

  if (!ready) {
    return (
      <PageWithAppBar>
        <LoadingPage />
      </PageWithAppBar>
    );
  }

  // if (!user?.username) {
  //   return (
  //     <PageWithAppBar>
  //       <Flex justifyContent="center" h="100%" w="100%">
  //         <Flex
  //           flexDirection="column"
  //           justifyContent="start"
  //           alignItems="center"
  //           h="100%"
  //           w={["100%", null, "50%", "40%", "35%"]}
  //           pt={["50%", null, "30%", "17.5%", "15%"]}
  //           pb={8}
  //           px={[8]}
  //           gap={8}
  //         >
  //           <FormControl>
  //             <FormLabel
  //               fontSize={["xl", null, null, "xl"]}
  //               fontWeight="medium"
  //               textAlign="center"
  //               mx={0}
  //               mt={0}
  //               mb={[3]}
  //             >
  //               Escoge un nombre de usuario
  //             </FormLabel>
  //             <Input
  //               focusBorderColor="primary"
  //               borderWidth="1.5px"
  //               type="text"
  //               display="flex"
  //               size="lg"
  //               fontSize="3xl"
  //               textAlign="center"
  //               value={usernameInputValue}
  //               onChange={(event) =>
  //                 setUsernameInputValue(event.currentTarget.value)
  //               }
  //               disabled={isLoading || isSubmitting}
  //             />
  //             <FormHelperText textAlign="center" color="whiteAlpha.800">
  //               Mínimo 5 caracteres, solo letras y números
  //             </FormHelperText>
  //           </FormControl>
  //           <Button
  //             minWidth={"50%"}
  //             size="lg"
  //             variant="primary"
  //             isDisabled={
  //               usernameInputValue.length < 5 || isLoading || isSubmitting
  //             }
  //             isLoading={isLoading || isSubmitting}
  //             loadingText="Creando..."
  //             spinnerPlacement="end"
  //             onClick={handleUserCreation}
  //           >
  //             Crear
  //           </Button>
  //         </Flex>
  //       </Flex>
  //     </PageWithAppBar>
  //   );
  // }

  return (
    <PageWithAppBar>
      <Flex justifyContent="center" h="100%" w="100%">
        <Flex
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          h="100%"
          w={["100%", null, "50%", "40%", "35%"]}
          pt={["50%", null, "30%", "17.5%", "15%"]}
          pb={8}
          px={[8]}
          gap={8}
        >
          {user ? (
            <Heading>{user?.google?.name}</Heading>
          ) : (
            <Text fontSize="2xl">We were not able to find the user 🙊</Text>
          )}
        </Flex>
      </Flex>
    </PageWithAppBar>
  );
};

export default User;
