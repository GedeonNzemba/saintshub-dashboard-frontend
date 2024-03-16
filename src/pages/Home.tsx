import React, { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { cloudName, cloudPreset } from '../tools/util'
import { ChurchDoc } from '../tools/tools'
import { handleCreateChurch } from '../request/createChurch'
import BeautifulLoader from '../components/loader/Loader'
import galleryImageDemo from '../assets/gallery.gif'
import pastorWifeImageDemo from '../assets/pastorWife.gif'
import churchIMageDemo from '../assets/church.gif'
import churchBannersDemo from '../assets/banners.gif'
import defaultLogo from '../assets/logo.gif'


interface DeaconTrustee {
  names: string
  descriptions: string
  image: string
}

interface PastService {
  title: string
  preacher: string
  sermon: string
}

interface Songs {
  title: string
  songUrl: string
}

interface Principal {
  pastor: string
  wife: string
  image: string
  description: string
}

interface IMAGES {
  churchLogo: boolean
  pastorWife: boolean
  churchImage: boolean
  churchBanners: boolean
  deacon: boolean
  trustee: boolean
  gallery: boolean
}

export const Home: React.FC = () => {
  const cloudinaryRef = useRef<any>()
  const widgetRef: React.MutableRefObject<any> = useRef()

  const [loading, setLoading] = useState<boolean>(false)
  const [formDataSubmitted, setFormDataSubmitted] = useState<boolean>(false)

  // const [logo, setLogo] = useState<string>('')

  const [deacons, setDeacons] = useState<DeaconTrustee[]>([
    { names: '', descriptions: '', image: '' },
  ])
  const [trustees, setTrustees] = useState<DeaconTrustee[]>([
    { names: '', descriptions: '', image: '' },
  ])
  const [pastService, setPastService] = useState<PastService[]>([
    { title: '', preacher: '', sermon: '' },
  ])
  const [songs, setSongs] = useState<Songs[]>([{ title: '', songUrl: '' }])

  // IMAGES
  const [image, setImage] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const [state, setState] = useState<IMAGES>({
    churchLogo: false,
    pastorWife: false,
    churchImage: false,
    churchBanners: false,
    deacon: false,
    trustee: false,
    gallery: false,
  })
  const [pastorWife, setPastorWife] = useState<string>('')
  const [churchImage, setChurchIMage] = useState<string>('')
  const [churchBanners, setChurchBanners] = useState<string[]>([])
  const [gallery, setGallery] = useState<string[]>([])

  const [churchName, setChurchName] = useState<string>('')
  const [churchLocation, setChurchLocation] = useState<string>('')
  const [churchLogo, setChurchLogo] = useState<string>('')

  const [principal, setPrincipal] = useState<Principal>({
    pastor: '',
    wife: '',
    description: '',
    image: '',
  })

  const [indexNumber, setIndexNumber] = useState<number>(0)
  // const [churchImage, setChurchImage] = useState<string>()

  const [formData, setFormData] = useState<ChurchDoc>({
    logo: '',
    name: '',
    principal: {
      description: '',
      image: '',
      pastor: '',
      wife: '',
    },
    location: '',
    image: '',
    banner: [],
    securities: {
      deacons: [
        {
          names: '',
          descriptions: '',
          image: '',
        },
      ],
      trustees: [
        {
          names: '',
          descriptions: '',
          image: '',
        },
      ],
    },
    oldServices: [
      {
        preacher: '',
        sermon: '',
        title: '',
      },
    ],
    gallery: [],
    songs: [],
  })

  const handleChurchNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChurchName(event.target.value)
  }

  const handleChurchLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChurchLocation(event.target.value)
  }

  const handlePastorNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrincipal({ ...principal, pastor: event.target.value })
  }

  const handleWifeNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrincipal({ ...principal, wife: event.target.value })
  }

  const handlePrincipalDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrincipal({ ...principal, description: event.target.value })
  }

  // const handleChurchBannerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const banners: string[] = []
  //   setChurchBanners(banners)
  //   console.log(event)
  // }

  const handleDeaconFieldChange = (
    field: keyof DeaconTrustee,
    value: string,
    index: number
  ) => {
    setDeacons((prevDeacons) =>
      prevDeacons.map((deacon, i) =>
        i === index ? { ...deacon, [field]: value } : deacon
      )
    )
  }

  const handleTrusteeFieldChange = (
    field: keyof DeaconTrustee,
    value: string,
    index: number
  ) => {
    setTrustees((prevTrustees) =>
      prevTrustees.map((trustee, i) =>
        i === index ? { ...trustee, [field]: value } : trustee
      )
    )
  }

  const handlePastServiceFieldChange = (
    field: keyof PastService,
    value: string,
    index: number
  ) => {
    setPastService((prevPastService) =>
      prevPastService.map((service, i) =>
        i === index ? { ...service, [field]: value } : service
      )
    )
  }

  const handleSongsFieldChange = (
    field: keyof Songs,
    value: string,
    index: number
  ) => {
    setSongs((prevSongs) =>
      prevSongs.map((song, i) =>
        i === index ? { ...song, [field]: value } : song
      )
    )
  }

  const handleAddDeacon = () => {
    setDeacons((prevDeacons) => [
      ...prevDeacons,
      { names: '', descriptions: '', image: '' },
    ])
  }

  const handleAddTrustee = () => {
    setTrustees((prevtrustee) => [
      ...prevtrustee,
      { names: '', descriptions: '', image: '' },
    ])
  }

  const handleAddPastServices = () => {
    setPastService((prevPastService) => [
      ...prevPastService,
      { title: '', preacher: '', sermon: '' },
    ])
  }

  const handleAddSongs = () => {
    setSongs((prevSongs) => [...prevSongs, { title: '', songUrl: '' }])
  }

  const handleDeaconImageChange = (index: number) => {
    setState({
      ...state,
      churchImage: false,
      pastorWife: false,
      churchBanners: false,
      deacon: true,
      trustee: false,
      gallery: false,
      churchLogo: false,
    })
    widgetRef.current.open()

    // Update the indexNumber state to keep track of the deacon being modified
    setIndexNumber(index)
  }

  const handleTrusteeImageChange = (index: number) => {
    setState({
      ...state,
      churchImage: false,
      pastorWife: false,
      churchBanners: false,
      deacon: false,
      trustee: true,
      gallery: false,
      churchLogo: false,
    })
    widgetRef.current.open()

    // Update the indexNumber state to keep track of the deacon being modified
    setIndexNumber(index)
  }

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        upload_preset: cloudPreset,
      },
      function (error: any, result: any) {
        if (!error && result && result.event === 'success') {
          // Access the secure_url of the uploaded image
          const secureUrl = result.info.secure_url
          console.log('Secure URL: ', secureUrl)
          const banners: string[] = []

          banners.push(secureUrl)

          setImage(secureUrl)
          setImages(banners)
          console.log('banners URL: ', banners)
        } else {
          // Handle error case
          console.error('Error uploading image:', error)
        }
      }
    )
  }, [])

  useEffect(() => {
    if (state.pastorWife) {
      setPastorWife(image)
      setPrincipal({ ...principal, image: image })
    }

    if (state.churchLogo) {
      setChurchLogo(image)
      //setLogo(image)
    }

    if (state.churchImage) {
      setChurchIMage(image)
    }

    if (state.churchBanners) {
      setChurchBanners((prevBanners) => [...prevBanners, ...images])
    }

    if (state.gallery) {
      setGallery((prevGallery) => [...prevGallery, ...images])
    }

    if (state.deacon) {
      // Update the imageURL for the specific deacon using the indexNumber
      setDeacons((prevDeacons) =>
        prevDeacons.map((deacon, i) =>
          i === indexNumber ? { ...deacon, image: image } : deacon
        )
      )
    }

    if (state.trustee) {
      // Update the imageURL for the specific deacon using the indexNumber
      setTrustees((prevTrustees) =>
        prevTrustees.map((trustee, i) =>
          i === indexNumber ? { ...trustee, image: image } : trustee
        )
      )
    }
  }, [image, images, state])

  console.log('STATE out: ', state)
  console.log('pastorWife: ', pastorWife)
  console.log('churchImage: ', churchImage)
  console.log('IMAGES: ', images)

  const uploadNewChurchData = (inputData: ChurchDoc) => {
    handleCreateChurch(inputData)
      .then((data) => console.info('CREATED CHURCH: ', JSON.stringify(data)))
      .then(() => window.alert('Submitted Successfully !'))
      .then(() => setLoading(false))
      .catch((error) => console.log('UNABLE TO CREATE CHURCH: ', error))
  }

  const handleSubmit = () => {
    setLoading(true)

    console.log('church name:', churchName)
    console.log('churchLocation', churchLocation)
    console.log('principal', principal)
    console.log('churchImage', churchImage)
    console.log('churchBanners', churchBanners)
    console.log('gallery', gallery)
    console.log('deacon', deacons)
    console.log('trustee', trustees)
    console.log('pastService', pastService)
    console.log('songs', songs)
    // Perform other actions with the deacons data as needed  console.log('songs', formData)

    setFormData({
      ...formData,
       logo: churchLogo,
      name: churchName,
      principal: {
        ...formData.principal,
        image: pastorWife,
        description: principal.description,
        pastor: principal.pastor,
        wife: principal.wife,
      },
      location: churchLocation,
      image: churchImage,
      banner: churchBanners,
      securities: {
        ...formData.securities,
        deacons: deacons,
        trustees: trustees,
      },
      oldServices: pastService,
      gallery: gallery,
      songs: songs,
    })

    console.log('****** FORM_DATA ******** ', formData)
    setFormDataSubmitted(true)
  }

  useEffect(() => {
    if (formDataSubmitted && Object.keys(formData).length !== 0) {
      // Perform the function to send formData to the database
      console.log('Sending FormData to the database:', formData)

      // Set the flag to indicate that the data has been submitted
      uploadNewChurchData(formData)
    }
  }, [formData, formDataSubmitted])

  return (
    <React.Fragment>
      {/* <Box mt={18}>
        <Typography
          mb={1.5}
          variant="h2"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={600}
          color={'#000'}
        >
          Add Church
        </Typography>
        <Typography
          variant="h4"
          component="h3"
          fontFamily={'roboto'}
          fontWeight={400}
          color={'#878893'}
        >
          All fields should not be empty, Gedeon
        </Typography>
      </Box> */}

      {/* GENERAL */}
      <Box
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          General
        </Typography>

        <TextField
          id="church-name"
          label="Church Name"
          variant="outlined"
          value={churchName}
          onChange={(e) => handleChurchNameChange(e)}
          style={{ width: '100%' }}
          className="textField"
        />

        <TextField
          id="church-location"
          label="Church Location"
          variant="outlined"
          value={churchLocation}
          onChange={(e) => handleChurchLocationChange(e)}
          style={{ width: '100%', marginTop: '1.5rem' }}
          className="textField"
        />

<Stack
          direction="column"
          spacing={2}
          mt={5}
          style={{ alignItems: 'center' }}
        >
          {churchLogo && (
            <Avatar
            alt="Church Logo"
            src={churchLogo}
            sx={{ width: 150, height: 150 }}
          />
          )}

          {!churchLogo && (
             <div>
             <img
                srcSet={defaultLogo}
                src={defaultLogo}
                alt="pastor and wife"
            loading="lazy"
                className="image-container"
              />
          </div>
          )}
          <Typography
            variant="h6"
            component="h2"
            fontFamily={'roboto'}
            fontWeight={500}
            color={'#000'}
            mb={2}
          >
            Church Logo
          </Typography>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setState({
                  ...state,
                  churchLogo: true,
                  churchImage: false,
                  pastorWife: false,
                  churchBanners: false,
                  deacon: false,
                  trustee: false,
                  gallery: false,
                })
                widgetRef.current.open()
              }}
              style={{ marginRight: 20 }}
            >
              Select Image
            </Button>
          </Container>
        </Stack>
      </Box>

      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        {/* PRINCIPAL */}
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          Principal
        </Typography>

        <TextField
          id="pastor-name"
          label="Pastor Name"
          variant="outlined"
          value={principal.pastor}
          onChange={(e) => handlePastorNameChange(e)}
          style={{ width: '100%' }}
          className="textField"
        />

        <TextField
          id="wife-name"
          label="Wife Name"
          variant="outlined"
          value={principal.wife}
          onChange={(e) => handleWifeNameChange(e)}
          style={{ width: '100%' }}
          className="textField field"
        />

        <TextField
          id="principal-description"
          label="Description"
          multiline
          rows={4}
          value={principal.description}
          onChange={(e) => handlePrincipalDescriptionChange(e)}
          style={{ width: '100%' }}
          className="textField field"
        />

        {/* PASTOR & WIFE IMAGE */}
        <Stack
          direction="column"
          spacing={2}
          mt={5}
          style={{ alignItems: 'center' }}
        >
          {pastorWife && (
            <Avatar
            alt="Remy Sharp"
            src={pastorWife}
            sx={{ width: 150, height: 150 }}
          />
          )}

          {!pastorWife && (
             <div>
             <img
                srcSet={pastorWifeImageDemo}
                src={pastorWifeImageDemo}
                alt="pastor and wife"
            loading="lazy"
                className="image-container"
              />
          </div>
          )}
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
            <Button
              variant="outlined"
              onClick={() => {
                setState({
                  ...state,
                  churchImage: false,
                  pastorWife: true,
                  churchBanners: false,
                  deacon: false,
                  trustee: false,
                  gallery: false,
                  churchLogo: false,
                })
                widgetRef.current.open()
              }}
              style={{ marginRight: 20 }}
            >
              Select Image
            </Button>
          </Container>
        </Stack>

        {/* CHURCH IMAGE */}
        <Stack
          direction="column"
          spacing={2}
          mt={5}
          style={{ alignItems: 'center' }}
        >
          {churchImage && (
            <Avatar
            alt="church image"
            src={churchImage}
            sx={{ width: 150, height: 150 }}
          />
          )}

          {!churchImage && (
             <div>
             <img
                srcSet={churchIMageDemo}
                src={churchIMageDemo}
                alt="church image demo"
            loading="lazy"
            className="image-container"
              />
          </div>
          )}
          <Typography
            variant="h6"
            component="h2"
            fontFamily={'roboto'}
            fontWeight={500}
            color={'#000'}
            mb={2}
          >
            Church Image
          </Typography>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setState({
                  ...state,
                  churchImage: true,
                  pastorWife: false,
                  churchBanners: false,
                  deacon: false,
                  trustee: false,
                  gallery: false,
                  churchLogo: false,
                })
                widgetRef.current.open()
              }}
              style={{ marginRight: 20 }}
            >
              Select Image
            </Button>
          </Container>
        </Stack>

        {/* CHURCH BANNER */}
        <Stack
          direction="column"
          spacing={2}
          mt={5}
          style={{ alignItems: 'center' }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontFamily={'roboto'}
            fontWeight={500}
            color={'#000'}
            mb={2}
          >
            Church Banners
          </Typography>

          <ImageList
            sx={{ width: 500, height: 'auto' }}
            cols={3}
            rowHeight={164}
          >
            {churchBanners.length >= 2 &&
              churchBanners.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    alt="image banner"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
          </ImageList>

          {churchBanners.length === 0 && (
              <div>
              <img
                 srcSet={`${churchBannersDemo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                 src={`${churchBannersDemo}?w=164&h=164&fit=crop&auto=format`}
                 alt="church banner demo"
             loading="lazy"
             className="image-container"
               />
           </div>
          )}

          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setState({
                  ...state,
                  churchImage: false,
                  pastorWife: false,
                  churchBanners: true,
                  deacon: false,
                  trustee: false,
                  gallery: false,
                  churchLogo: false,
                })
                widgetRef.current.open()
              }}
              style={{ marginRight: 20 }}
            >
              Select Image
            </Button>
          </Container>
        </Stack>
      </Box>

      {/* DEACONS */}
      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          DEACON
        </Typography>

        {deacons.map((deacon, index) => (
          <div key={index} style={{ marginBottom: 40 }}>
            <TextField
              id={`deacon-name-${index}`}
              label="Deacon Name"
              variant="outlined"
              value={deacon.names}
              onChange={(e) =>
                handleDeaconFieldChange('names', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField"
            />

            <TextField
              id={`deacon-description-${index}`}
              label="Description"
              multiline
              rows={4}
              value={deacon.descriptions}
              onChange={(e) =>
                handleDeaconFieldChange('descriptions', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField field"
            />

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={2}
              mt={2.5}
            >
              <TextField
                disabled
                id={`deacon-image-${index}`}
                label="Deacon Image URL"
                variant="standard"
                value={deacon.image}
                onChange={(e) =>
                  handleDeaconFieldChange('image', e.target.value, index)
                }
                style={{ width: '60%' }}
                className="textField"
              />

              <Button
                variant="contained"
                style={{ backgroundColor: '#052b4e' }}
                onClick={() => handleDeaconImageChange(index)}
              >
                Select & Upload Image
              </Button>
            </Stack>
          </div>
        ))}

        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button variant="contained" onClick={handleAddDeacon}>
            Add New Deacon
          </Button>
        </Container>
      </Box>

      {/* TRUSTEE */}
      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          TRUSTEE
        </Typography>

        {trustees.map((Trustee, index) => (
          <div key={index} style={{ marginBottom: 40 }}>
            <TextField
              id={`trustee-name-${index}`}
              label="Trustee Name"
              variant="outlined"
              value={Trustee.names}
              onChange={(e) =>
                handleTrusteeFieldChange('names', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField"
            />

            <TextField
              id={`trustee-description-${index}`}
              label="Description"
              multiline
              rows={4}
              value={Trustee.descriptions}
              onChange={(e) =>
                handleTrusteeFieldChange('descriptions', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField field"
            />

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              spacing={2}
              mt={2.5}
            >
              <TextField
                disabled
                id={`trustee-image-${index}`}
                label="Trustee Image URL"
                variant="standard"
                value={Trustee.image}
                onChange={(e) =>
                  handleTrusteeFieldChange('image', e.target.value, index)
                }
                style={{ width: '60%' }}
                className="textField"
              />

              <Button
                variant="contained"
                style={{ backgroundColor: '#052b4e' }}
                onClick={() => handleTrusteeImageChange(index)}
              >
                Select & Upload Image
              </Button>
            </Stack>
          </div>
        ))}

        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button variant="contained" onClick={handleAddTrustee}>
            Add New Trustee
          </Button>
        </Container>
      </Box>

      {/* TRUSTEE */}
      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          PAST SERVICE
        </Typography>

        {pastService.map((PastService, index) => (
          <div key={index} style={{ marginBottom: 40 }}>
            <TextField
              id={`pastService-name-${index}`}
              label="Title Name"
              variant="outlined"
              value={PastService.title}
              onChange={(e) =>
                handlePastServiceFieldChange('title', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField"
            />

            <TextField
              id={`pastService-name-${index}`}
              label="Preacher Name"
              variant="outlined"
              value={PastService.preacher}
              onChange={(e) =>
                handlePastServiceFieldChange('preacher', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField field"
            />

            <TextField
              id={`pastService-name-${index}`}
              label="Sermon URL"
              variant="outlined"
              value={PastService.sermon}
              onChange={(e) =>
                handlePastServiceFieldChange('sermon', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField field"
            />
          </div>
        ))}

        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button variant="contained" onClick={handleAddPastServices}>
            Add New PAst Service
          </Button>
        </Container>
      </Box>

      {/* CHURCH BANNER */}
      <Box
        mt={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          GALLERY
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          mt={5}
          style={{ alignItems: 'center' }}
        >
          <ImageList
            sx={{ width: 500, height: 'auto' }}
            cols={3}
            rowHeight={164}
          >
            {gallery &&
              gallery.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    alt={`image - ${index}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            
           
          </ImageList>

          {gallery.length === 0 && (
              <div>
                 <img
                    srcSet={galleryImageDemo}
                    src={galleryImageDemo}
                    alt="image banner"
                loading="lazy"
                className="image-container"
                  />
              </div>
            )}

          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setState({
                  ...state,
                  churchImage: false,
                  pastorWife: false,
                  churchBanners: false,
                  deacon: false,
                  trustee: false,
                  gallery: true,
                  churchLogo: false,
                })
                widgetRef.current.open()
              }}
              style={{ marginRight: 20 }}
            >
              Select Image
            </Button>
          </Container>
        </Stack>
      </Box>

      {/* SONGS  */}
      <Box
        mt={8}
        marginBottom={8}
        sx={{ backgroundColor: '#f7f7f7' }}
        p={4}
        borderRadius={6}
        className="box-shadow"
      >
        <Typography
          variant="h4"
          component="h2"
          fontFamily={'roboto'}
          fontWeight={500}
          color={'#000'}
          mb={2}
        >
          SONGS
        </Typography>

        {songs.map((song, index) => (
          <div key={index} style={{ marginBottom: 40 }}>
            <TextField
              id={`song-title-${index}`}
              label={`Song Title ${index}`}
              variant="outlined"
              value={song.title}
              onChange={(e) =>
                handleSongsFieldChange('title', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField"
            />

            <TextField
              id={`song-name-${index}`}
              label={`Song Url ${index}`}
              variant="outlined"
              value={song.songUrl}
              onChange={(e) =>
                handleSongsFieldChange('songUrl', e.target.value, index)
              }
              style={{ width: '100%' }}
              className="textField field"
            />
          </div>
        ))}

        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button variant="contained" onClick={handleAddSongs}>
            Add New Song
          </Button>
        </Container>
      </Box>

      <Stack direction={'row'} style={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginBottom: 40, backgroundColor: '#040b4b' }}
        >
          Submit
        </Button>
      </Stack>

      <BeautifulLoader visible={loading} />
    </React.Fragment>
  )
}
