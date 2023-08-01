import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as React from 'react';

import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = (props) => {
  const router = useRouter();
  const params =  useSearchParams();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      email: '1011844207',
      password: '0509184255',
      submit: null
    },
    
    onSubmit: async (values, helpers) => {
      try {
        
        await auth.signIn(values.email, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

 
  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );
  const [open, setOpen] = React.useState(false);
    return (
    <>
      <Head>
        <title>
          تسجيل الدخول 
        </title>
      </Head>
      <Dialog  open={open}>
      <DialogTitle color='#007A70' fontFamily='zaraid_serif'>من فضلك ادخل OTP</DialogTitle>
     
      <List sx={{ p: 3 }} >
        <ListItem disableGutters>
        <TextField id="outlined-basic" label="OTP" variant="outlined"  color="success" />
          </ListItem>
          <ListItem >
          <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, backgroundColor:'#50738E'}}
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit}
                  color='success'
                >
                  ادخل
                </Button>
          </ListItem>
       
       
      </List>
    </Dialog>
    
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div >
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4" color="#007A70" fontFamily='zaraid_serif'>
                تسجيل الدخول
              </Typography>
              <Typography
                color="#007A70"
                variant="body2"
                fontFamily='zaraid_serif'
              >
                لا تملك حساب؟
                &nbsp;
                <Link
                
                color="#007A70"
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                  fontFamily='zaraid_serif'
                >
                  انشاء حساب جديد
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
              color="#007A70"
                label="بيانات المستخدم"
                value="email"
                fontFamily='zaraid_serif'
              />
             
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                 

                <Stack spacing={3}>
                  <TextField
                  color="success" 
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="رقم التعريف ID"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type='text'
                    value={formik.values.email}
                    fontFamily='zaraid_serif'
                  />
                  <TextField
                  color="success" 
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="رقم الهاتف"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.password}
                    fontFamily='zaraid_serif'
                  />
                </Stack>
             
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3, backgroundColor:'#50738E'}}
                   
                  
                  variant="contained"
                  onClick={()=> {setOpen(true)}}
                >
                  تسجيل
                </Button>
              
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
            
                </Alert>
              </form>
            )}
            {method === 'phoneNumber' && (
              <div>
                <Typography
                  sx={{ mb: 1 }}
                  variant="h6"
                >
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
