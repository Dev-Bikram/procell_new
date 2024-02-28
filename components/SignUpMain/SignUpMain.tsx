
import { signUpProfileMutation } from "@/api/functions/user.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Alert, Spin } from "antd";


import assest from "json/assest";
import validationText from "json/messages/validationText";
import { emailRegex, passwordRegex } from "@/lib/regex";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation } from "react-query";

import { toast } from "sonner";
import { SignUpNewWrapper } from "styles/StyledComponents/SignUpNewWrapper";
import InputFieldCommon from "ui/CommonInput/CommonInput";
import CustomButtonPrimary from "ui/CustomButtons/CustomButtonPrimary";
import * as yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";


const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email(validationText.error.email_format)
        .required(validationText.error.enter_email)
        .matches(emailRegex, validationText.error.email_format),

   
    
   password: yup.string().trim().required(validationText.error.enter_password)

});

export type signUpSchemaFormData = yup.InferType<typeof schema>;

const Signup = () => {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: {
            fullName: "",
            email: "",
            password: ""
        }
    });

    const { mutate, isLoading, error, data } = useMutation(signUpProfileMutation);
    const router = useRouter();

    const onSubmit : SubmitHandler<{ fullName: string; email: string; password: string;} > = (data) => {
        let payload = {
           
            fullName: data?.fullName,
         
            email: data?.email,
           
            password: data?.password
        };

        mutate(payload, {
            onSuccess: (data) => {
                reset();
                toast.success("Account created successfully! 🎉✨");
                router.push("/login");
            }
        });
    };

    return (
        <SignUpNewWrapper>
            <Box className="sign-up-left">
                <img src={assest.logo_img} alt="logo" />
            </Box>

            <Box
                className="sign-up-rgt"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <Spin spinning={isLoading} size="large">
                    <Box className="loginHeader">
                        <Link href="/">
                            <img src={assest.logo} alt="logo" />
                        </Link>
                    </Box>
                    <Box className="loginHeader">
                        <Typography variant="h1">Sign up for an account</Typography>
                        <Typography variant="body1">
                            Register yourself for Connect and increase your
                            private  revenue.
                        </Typography>
                    </Box>

                    <Grid
                        container
                        spacing={3}
                        className="form_group"
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        {!!error && (
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    {" "}
                                    <Alert
                                        showIcon
                                        // @ts-ignore
                                        message={error?.response?.data?.message}
                                        type="error"
                                    />{" "}
                                </Box>
                            </Grid>
                        )}

                        {data?.data.status === "success" && (
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    {" "}
                                    <Alert
                                        showIcon
                                        // @ts-ignore
                                        message={
                                            "Your pharmacy account registration is currently pending approval from our super admin. Once approved, you will gain access to the full range of features and services offered by our platform."
                                        }
                                        type="success"
                                    />
                                </Box>
                            </Grid>
                        )}

                        
                        <Grid item xs={12} lg={6}>
                            <Typography variant="body1" className="label_txt">
                                Full name
                            </Typography>
                            <InputFieldCommon
                                placeholder="Enter full name"
                                type="text"
                                {...register("fullName")}
                                size="small"
                                error={Boolean(errors.fullName)}
                                helperText={errors.fullName?.message}
                            />
                        </Grid>
                       
                        <Grid item xs={12} lg={6}>
                            <Typography variant="body1" className="label_txt">
                                Email address
                            </Typography>
                            <InputFieldCommon
                                placeholder="Enter email"
                                type="text"
                                {...register("email")}
                                autoComplete="off"
                                size="small"
                                error={Boolean(errors?.email)}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                    
                        <Grid item xs={12} lg={6}>
                            <Typography variant="body1" className="label_txt">
                                Password
                            </Typography>
                            <InputFieldCommon
                                placeholder="Enter password"
                                type="password"
                                autoComplete="off"
                                size="small"
                                isPassword
                                {...register("password")}
                                error={Boolean(errors?.password)}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                      
                    </Grid>

                   
                    <Box className="form-btm">
                        <CustomButtonPrimary
                            type="submit"
                            variant="contained"
                            color="primary"
                           
                        >
                            <Typography variant="body1">Sign up</Typography>
                        </CustomButtonPrimary>

                        <Typography variant="body1">
                            Already have an account? <Link href="/login">Sign in</Link>{" "}
                        </Typography>
                    </Box>
                </Spin>
            </Box>
        </SignUpNewWrapper>
    );
};

export default Signup;
