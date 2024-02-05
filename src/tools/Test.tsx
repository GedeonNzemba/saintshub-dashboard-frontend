import { useEffect, useRef } from "react";
import { cloudName, cloudPreset } from "./util";
import { Avatar, Button, Container, Stack, Typography } from "@mui/material";

const UploadWidget = () => {
    const cloudinaryRef = useRef<any>();
    const widgetRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
      cloudinaryRef.current = (window as any).cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: cloudName,
        upload_preset: cloudPreset
      },  function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          // Access the secure_url of the uploaded image
          const secureUrl = result.info.secure_url;
          console.log("Secure URL: ", secureUrl);
        } else {
          // Handle error case
          console.error("Error uploading image:", error);
        }
      })
  }, []);

    return (
        <Stack
        direction="column"
        spacing={2}
        mt={5}
        style={{ alignItems: 'center' }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://i.pravatar.cc/300"
          sx={{ width: 150, height: 150 }}
        />
        <Typography
          variant="h6"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          Pastor & Wife
        </Typography>
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => widgetRef.current.open()} style={{ marginRight: 20 }}>
            Select Image
          </Button>
          <Button variant="outlined" >Upload Image</Button>
        </Container>
      </Stack>
    )
}

export default UploadWidget