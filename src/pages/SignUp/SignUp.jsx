import Marquee from "react-fast-marquee";
import marq1 from "../../assets/img/login/marque/marq1.png";
import marq2 from "../../assets/img/login/marque/marq2.png";
import marq3 from "../../assets/img/login/marque/marq3.png";
import marq4 from "../../assets/img/login/marque/marq4.png";
import marq5 from "../../assets/img/login/marque/marq5.png";
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import Swal from "sweetalert2";

const SignUp = () => {
    const { signUpUser, updateUserName, updatePhoto, googleSignIn } = useContext(AuthContext);
    const [form] = Form.useForm();
    const axiosPublic = UseAxiosPublic();

    // Form input Management
    // Successful login
    const onFinish = (values) => {
        console.log('Success:', values);
        // collecting user data for sending to server
        const userData = {
            username: values?.username,
            name: values?.fullName,
            email: values?.email,
            photoUrl: values?.photoUrl,
            role: "user",
            subscription: "regular"
        }
        console.log("this data will go to server", userData);
        signUpUser(values.email, values.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // Update User Data
                updateUserName(values.fullName);
                updatePhoto(values.photoUrl);
                // user display
                console.log("Signed up user details : ", user);
                // send data to server
                axiosPublic.post('/users', userData)
                    .then((res) => {
                        console.log("axios response : ", res.data);
                        // Showing alert for redirecting to home page
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Successfully signed up",
                                text: "Return to home page!",
                                icon: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Ok!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '/';
                                }
                            });
                        }
                    })
                // Reset the form fields
                form.resetFields();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    // Error management
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Google Sign Up
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Signed in user : ", user);
                // collecting user data for sending to server
                const userData = {
                    username: user?.displayName.split(' ').join(''), // generating a username
                    name: user?.displayName,
                    email: user?.email,
                    photoUrl: user?.photoURL,
                    role: "user",
                    subscription: "regular"
                }
                // send data to server
                axiosPublic.post('/users', userData)
                    .then((res) => {
                        console.log("axios response : ", res.data);
                        // Showing alert for redirecting to home page
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Successfully signed up",
                                text: "Return to home page!",
                                icon: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Ok!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '/';
                                }
                            });
                        }
                    })
                // Reset the form fields
                form.resetFields();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    return (
        <div className="container mx-auto border border-blue-500 rounded-xl shadow-lg my-12">
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-blue-300 rounded-t-xl lg:rounded-l-xl lg:rounded-r-none">
                    <div className="my-8">
                        <h2 className="font-semibold text-5xl p-4 font-playfair ">
                            Now <br /> <br />
                            <span className="font-extrabold text-6xl">Find your life partner</span> <br /><br />
                            Easy and fast.
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={marq1} alt="" />
                    </div>
                    <div>
                        <Marquee className="rounded-xl" autoFill={true}>
                            <img className=" h-12 bg-cover" src={marq1} alt="marque image" />
                            <img className=" h-12 bg-cover" src={marq2} alt="marque image" />
                            <img className=" h-12 bg-cover" src={marq3} alt="marque image" />
                            <img className=" h-12 bg-cover" src={marq4} alt="marque image" />
                            <img className=" h-12 bg-cover" src={marq5} alt="marque image" />
                        </Marquee>
                    </div>
                </div>
                <div className="col-span-2 rounded-xl p-12 flex justify-center items-center">
                    <div className="w-full">
                        <h3 className=" text-xl uppercase font-semibold ">Start for free</h3>
                        <h2 className=" text-3xl font-bold font font-playfair my-4 ">Sign Up for Soul Connect</h2>
                        <p className=" text-base ">Already a member ? <Link className="pointer underline text-blue-500" to="/signin">Sign In</Link> now</p>
                        <Divider className="bg-blue-500" />
                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your full name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Your Mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>

                            <Form.Item
                                label="Photo Url"
                                name="photoUrl"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Photo Url!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <h2 className=" border-b border-blue-500">Or Use Social Login</h2>
                            <Button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-4 my-4" type="primary"><FaGoogle /> Sign in with Google</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;