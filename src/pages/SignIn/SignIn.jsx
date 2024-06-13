import Marquee from "react-fast-marquee";
import marq1 from "../../assets/img/login/marque/marq1.png";
import marq2 from "../../assets/img/login/marque/marq2.png";
import marq3 from "../../assets/img/login/marque/marq3.png";
import marq4 from "../../assets/img/login/marque/marq4.png";
import marq5 from "../../assets/img/login/marque/marq5.png";
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SignIn = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onFinish = (values) => {
        console.log('Success:', values);
        signInUser(values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Signed in user : ", user);
                // Reset the form fields
                form.resetFields();
                // Navigate to where they came from 
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Google sign in
    const handleGoogleSignIn = () =>{
        googleSignIn()
           .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Signed in user : ", user);
                // Navigate to where they come from 
                navigate(from, { replace: true });
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
                        <h2 className="font-semibold text-5xl p-4 font-playfair">Now <br /> <br /> <span className="font-extrabold text-6xl">Find your life partner</span> <br /><br /> Easy and fast.</h2>
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
                        <h2 className=" text-3xl font-bold font-playfair my-4 ">Sign In Soul Connect</h2>
                        <p className=" text-base ">Not a member ? <Link className="pointer underline text-blue-500" to="/signup">Sign Up</Link> now</p>
                        <Divider className="bg-blue-500" />
                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

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
                                    Sign In
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

export default SignIn;