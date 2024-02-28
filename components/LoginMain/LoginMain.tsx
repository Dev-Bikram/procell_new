import { Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import { useEffect, useState } from 'react'

import assest from '@/json/assest'
import validationText from '@/json/messages/validationText'
import CustomButton from '@/ui/Button/CustomButton'
import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper'
import Image from 'next/image'
import Link from 'next/link'
import * as yup from "yup"
import CommonFormLeft from '../CommonFormLeft/CommonFormLeft'

import { loginMutation } from '@/api/functions/user.api'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { useAppSelector } from '@/hooks/redux/useAppSelector'
import { setCookieClient } from '@/lib/functions/storage.lib'
import { emailRegex } from '@/lib/regex'
import { setLoginData } from '@/reduxtoolkit/slices/userSlice'
import InputFieldCommon from '@/ui/CommonInput/CommonInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'sonner'
import styled from '@emotion/styled'



const LoingMainWraper = styled(Box)`
    .loginMain-wrapper{
        position: relative;
        padding: 50px 0 80px;
        @media(max-width: 1199px){
            padding: 40px 0;
        }
        .loginwrapmain{
            position: relative;
            .MuiGrid-container{
                align-items: center;
                .wrapInner-loginform{
                    position: relative;
                    border-radius: 10px;
                    background: var(--white);
                    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.25);
                    padding: 34px 42px 34px 43px;
                    @media(max-width: 1199px){
                        padding: 30px 25px;
                    }
                    @media(max-width: 899px){
                        padding: 20px 15px;
                        margin-top: 30px;
                    }
                    h2{
                        color: var(--color343641);
                        margin-bottom: 25px;
                        @media(max-width: 600px){
                            flex-wrap: wrap;
                            margin-bottom: 15px;
                            font-size: 24px;
                        }
                    }
                    .single-inputWrap{
                        position: relative;
                        margin-bottom: 20px;
                        .input_style_wrap{
                            position: relative;
                            img{
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                z-index: 1;
                                left: 22px;
                                @media(max-width: 899px){
                                    left: 15px;
                                }
                                @media(max-width: 600px){
                                    left: 10px;
                                }
                            }
                        }
                    }
                    .checkbox-common{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 35px;
                        @media(max-width: 600px){
                            margin-bottom: 25px;
                        }
                        .MuiFormControlLabel-root{
                            margin: 0;
                            .MuiCheckbox-root{
                                padding: 0;
                                margin-right: 20px;
                                @media(max-width: 600px){
                                    margin-right:5px;
                                }
                            }
                            span{
                                font-size: 14px;
                                color: var(--color343641);
                                font-weight: 400;
                                @media(max-width: 374px){
                                    font-size: 12px;
                                }
                                &.Mui-checked{
                                    svg{
                                    width: 30px;
                                    height: 26px;
                                    background: url(${assest.checkBoxcusmBx2});
                                    }
                                }
                                svg{
                                    width: 30px;
                                    height: 26px;
                                    background: url(${assest.checkBoxcusmBx});
                                    path{
                                        display: none;
                                    }
                                }
                            }

                        }
                        .forgetpassWrd-wrp{
                            a{
                                font-size: 14px;
                                color: var(--color343641);
                                font-weight: 400;
                                display: inline-block;
                                &:hover{
                                    color: var(--colorF68939);
                                }
                                @media(max-width: 374px){
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                    .submtbtn-wraplogin{
                        position: relative;
                        text-align: center;
                        margin-bottom: 30px;
                        button{
                            min-width: auto;
                        }
                    }
                    .orlogin-txtwrap{
                        position: relative;
                        text-align: center;
                        &:before{
                            background: url("/assets/images/lineigline01.svg") no-repeat center;
                            background-size: 100% 100%;
                            position: absolute;
                            content: "";
                            width: 100%;
                            height: 2px;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        p{
                            display: inline-block;
                            padding: 0 15px;
                            background: var(--white);
                            z-index: 1;
                            position: relative;
                        }
                    }
                    .login-signinlinks{
                        text-align: center;
                        margin-top: 15px;
                        p{
                            font-size: 20px;
                            color: var(--color343641);
                            font-weight: 400;
                            @media(max-width: 1199px){
                                font-size: 16px; 
                            }
                            a{
                                font-weight: 700;
                                color: var(--color343641);
                                margin-left: 5px;
                                &:hover{
                                    color: var(--colorF68939);
                                }
                            }
                        }
                    }
                }
            }
            
        }
        
    }
    
`


const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email(validationText.error.email_format)
      .required(validationText.error.enter_email)
      .matches(emailRegex , validationText.error.email_format),
    password: yup.string().trim().required(validationText.error.enter_password),
    deviceToken: yup.string().nullable()
     
  });

  export type LoginSchemaFormData = yup.InferType<typeof schema>;


export default function LoingMain() {
    const [open, setOpen]=useState(false)
    const onHandleClose=()=>{
        setOpen(false);
    }
    const onHandleOpen=()=>{
        setOpen(true);
    }
const router = useRouter();
 const dispatch = useAppDispatch();

  const { handleSubmit, register, formState: { errors } } = useForm(
    {
      resolver: yupResolver(schema),
      mode: "all",
      defaultValues: {
        email: "",
        password: "",
        isApproved: true
      }
    }
  )
   
  const { mutate, isLoading, status, data, error } = useMutation(
    {
        mutationKey: ["login"],
        mutationFn: loginMutation
    }
  );
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);
                   
  const onSubmit: SubmitHandler<{ email: string; password: string;} > = (data) => {

    mutate(
      data ,
      {
        onSuccess: (res: any) => {
       
          if (res?.status === 200) {
           
            if (res?.data) {
              setCookieClient("procell_token", res?.data.token);
              const { ...userData } = res?.data?.data
               dispatch( setLoginData(userData));
              router.push("/");
            }
          }
        }
      }
    )
  }

  useEffect(() => {
    if (isLoggedIn) {
     router.push("/");
    }
  }, [isLoggedIn]);

  if (status === "error") {
    // @ts-ignore
    toast.error(error?.response?.data?.message?.message || error?.response?.data?.message)
  }


  if (isLoading) {
    return <CircularProgress disableShrink style={{  position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
       }}/>
}
   


    
    

  return (
    <LoingMainWraper>
        <Box className="loginMain-wrapper">
            <Container fixed>
                <Box className="loginwrapmain">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item md={6} xs={12}>
                            <CommonFormLeft tittle="Lorem Ipsum is simply dummy text" subtittle="Lorem Ipsum is simply dummy text of the printing and standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"/>
                        </Grid>
                          <Grid item md={6} xs={12}>
                        <Stack
                            component="form"
                            sx={{
                              width: '50ch',
                              margin: 'auto'
                            }}
                            spacing={2}
                            noValidate
                             autoComplete="off"
                             onSubmit={handleSubmit(onSubmit)}   
                          >
                            <Box className="wrapInner-loginform">
                                <Typography variant='h2'>Log In</Typography>
                                <Box className="single-inputWrap">
                                    <InputFieldCommon placeholder='Email' type='email'   {...register("email", { required: true })}/>
                                </Box>
                                <Box className="single-inputWrap">
                                    <InputFieldCommon  placeholder='Password'  type='Password'   {...register("password", { required: true })} />
                                </Box>
                                <Box className="checkbox-common">
                                    <FormControlLabel control={<Checkbox/>} label="Remember Me?" />
                                    <Box className="forgetpassWrd-wrp">
                                        <Link href="javascript:void(0)" onClick={onHandleOpen}>Forgot Password</Link>
                                    </Box> 
                                </Box>
                                <Box className="submtbtn-wraplogin">
                                    <CustomButton type="submit" variant='contained' color='primary'>
                                        <Typography variant="caption">Login</Typography>
                                    </CustomButton>
                                </Box>
                                <Box className="orlogin-txtwrap">
                                    <Typography variant='body1'>OR</Typography>
                                </Box>
                                <Box className="login-signinlinks">
                                    <Typography variant='body1'>Don’t have an account?<Link href="/signup">Sign Up</Link></Typography>
                                </Box>
                                      </Box>
                                       </Stack>
                        
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
        <MuiModalWrapper open={open} title={''} onClose={onHandleClose} className="signinModal">
            <Box className="modal-signinwrap">
                <i><Image src={assest.modalsigninicon} alt='modalicon' width={50} height={48}/></i>
                <Typography variant='body1'>A verification link has been sent to your email address. <br/>Please check to complete your forgot password. </Typography>
            </Box>
        </MuiModalWrapper>
    </LoingMainWraper>
  )
}
