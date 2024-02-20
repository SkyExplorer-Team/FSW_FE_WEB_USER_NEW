import React, { useCallback, useState } from "react";
import { Alert, Button, Form, Input, Space, Typography } from "antd";
import SubmitButton from "../../components/SubmitButton";
import { useNavigate } from "react-router-dom";

type ValidateStatus = Parameters<typeof Form.Item>[0]["validateStatus"];

interface VerificationFormData {
  verificationCode: string;
}

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}
const { Text } = Typography;

const validateEmail = (
  email: string
): { validateStatus: ValidateStatus; errorMsg: string | null } => {
  const res = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (res == null) {
    return {
      validateStatus: "error",
      errorMsg: "Please enter a valid email address",
    };
  }
  return {
    validateStatus: "success",
    errorMsg: null,
  };
};

const api_base_url = "https://be-java-master-production.up.railway.app";

const Index: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [disabledSave, setDisabledSave] = useState(true);
  const [verificationCode] = useState<string | null>(null);
  const [verificationCodeForm] = Form.useForm();
  const onVerificationFormFinish = (values: VerificationFormData) => {
    console.log("Verification Form values:", values);
    console.log(values.verificationCode);
    handleNext();
    if (values.verificationCode === verificationCode) {
      console.log("A");
    } else {
      console.error("Verification code mismatch");
    }
  };
  const navigate = useNavigate();
  const [isOtpResend, setIsOtpResend] = useState<boolean>(false);
  const [verificationCodeCounter, setVerificationCodeCounter] =
    useState<number>(5);
  const minutes = Math.floor(verificationCodeCounter / 60);
  const seconds = verificationCodeCounter % 60;
  const [passwordForm] = Form.useForm();
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const onPasswordFormFinish = (values: PasswordFormData) => {
    console.log("Password Form values:", values);
    setPasswordData({
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    navigate("/login");
  };
  const startVerificationCodeCounter = useCallback(() => {
    const intervalId = setInterval(() => {
      setVerificationCodeCounter((prevCounter) =>
        prevCounter > 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleOtpResend = () => {
    console.log("OTP Resend clicked");
    if (!isOtpResend) {
      setVerificationCodeCounter(5);
      setIsOtpResend(true);
      // startVerificationCodeCounter();
    }
  };
  const handlePasswordFormChange =
    (fieldName: keyof PasswordFormData) => (value: string) => {
      setPasswordData({
        ...passwordData,
        [fieldName]: value,
      });
    };

  const [email, setEmail] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({ value: "" });

  const onEmailChange = (value: string) => {
    const { validateStatus, errorMsg } = validateEmail(value);

    if (validateStatus === "success") {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
    setEmail({
      value,
      validateStatus,
      errorMsg,
    });
  };

  const handleContinueWithEmail = () => {
    onContactFormFinish();
  };
  const handleVerifyOTP = async (email: string) => {
    try {
      // Continue with the OTP verification logic
      const response = await fetch(
        `${api_base_url}/auth/reset-password-request/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Reset Pasword Request successful:", responseData);
      } else {
        const errorData = await response.json();
        console.error("Reset Pasword Request failed:", errorData);
      }
    } catch (error) {
      console.error("Error during Reset Pasword Request:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };
  const handleNext = () => {
    // Move to the next step
    setStep(step + 1);
  };

  const onContactFormFinish = async () => {
    try {
      startVerificationCodeCounter();

      handleVerifyOTP(email.value);
      handleNext();
    } catch (error) {
      // Handle generic error scenarios during OTP verification
      console.error("Error during OTP verification:", error);

      if (error instanceof Error && error.message.includes("network")) {
        // Handle network-related errors
        console.error(
          "Network error occurred. Please check your internet connection."
        );
      } else if (error instanceof Error && error.message.includes("timeout")) {
        // Handle timeout errors
        console.error("OTP verification timed out. Please try again.");
      } else if (
        error instanceof Error &&
        error.message.includes("validation")
      ) {
        // Handle validation errors
        console.error(
          "Validation error during OTP verification. Please double-check your input."
        );
      } else {
        // Handle other unexpected errors
        console.error("An unexpected error occurred during OTP verification.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block h-screen">
        <img
          src="src/assets/sign-in.png"
          alt="Sign In Image"
          className="w-full rounded p-10 object-contain "
        />
      </div>
      <div className="h-screen flex mx-3 md:mx-5">
        {step == 1 ? (
          <div className="self-start md:self-center mt-5 md:mt-0">
            <h1 className="text-left text-4xl mb-8 font-semibold">
              Forgot your Password?
            </h1>
            <p className="text-neutral-900 text-lg font-normal font-['Plus Jakarta Sans'] leading-7">
              No worries,we've got you covered!
            </p>

            <p className="text-gray-500 text-lg font-normal font-['Plus Jakarta Sans'] leading-7">
              Enter your email address below, and we'll send you a link to reset
              your password.
            </p>
            <div className="h-10"></div>
            <Form>
              <Form.Item
                validateStatus={email.validateStatus}
                help={email.errorMsg}
              >
                <Typography.Title
                  style={{ paddingBottom: 0, marginBottom: 0 }}
                  level={5}
                >
                  Email
                </Typography.Title>
                <Input
                  style={{ marginTop: "0.5rem" }}
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                  }}
                  placeholder="Enter Your Email"
                />
              </Form.Item>
              <div className="h-10"></div>
              <Form.Item shouldUpdate>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleContinueWithEmail}
                    type="submit"
                    disabled={disabledSave}
                    className="flex w-full  mb-4 justify-center rounded-md active:bg-primary disabled:bg-gray-300 bg-primary hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
                  >
                    Send Instruction
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        ) : step == 2 ? (
          <div className="flex flex-col gap-5 p-10">
            {isOtpResend ? (
              <Alert
                message={
                  <Text className="font-semibold" style={{ color: "#247535" }}>
                    OTP Resent Successfully
                  </Text>
                }
                description={
                  <Text style={{ color: "#247535" }}>
                    We've resent the OTP code. Please check your inbox or
                    messages.
                  </Text>
                }
                style={{ color: "#247535" }}
                type="success"
                showIcon
              />
            ) : (
              <div></div>
            )}

            <Text className="text-4xl font-semibold">Verify Code</Text>
            <div className="flex flex-col">
              <Text className="text-lg text-neutral">
                Enter the verification code we send you on
              </Text>
              <Text className="text-lg mb-8">{email.value}</Text>
            </div>
            <Form
              form={verificationCodeForm}
              onFinish={onVerificationFormFinish}
            >
              <div className="flex flex-col items-center">
                <div className="w-4/5">
                  <Space direction="horizontal" size="middle">
                    <Form.Item
                      name="code1"
                      rules={[{ required: true, message: "", max: 1, min: 1 }]}
                    >
                      <Input
                        style={{ height: "72px", textAlign: "center" }}
                        size="large"
                        maxLength={1}
                      />
                    </Form.Item>
                    <Form.Item
                      name="code2"
                      rules={[{ required: true, message: "", max: 1, min: 1 }]}
                    >
                      <Input
                        style={{ height: "72px", textAlign: "center" }}
                        size="large"
                        maxLength={1}
                      />
                    </Form.Item>
                    <Form.Item
                      name="code3"
                      rules={[{ required: true, message: "", max: 1, min: 1 }]}
                    >
                      <Input
                        style={{ height: "72px", textAlign: "center" }}
                        size="large"
                        maxLength={1}
                      />
                    </Form.Item>
                    <Form.Item
                      name="code4"
                      rules={[{ required: true, message: "", max: 1, min: 1 }]}
                    >
                      <Input
                        style={{ height: "72px", textAlign: "center" }}
                        size="large"
                        maxLength={1}
                      />
                    </Form.Item>
                    <Form.Item
                      name="code5"
                      rules={[{ required: true, message: "", max: 1, min: 1 }]}
                    >
                      <Input
                        style={{ height: "72px", textAlign: "center" }}
                        size="large"
                        maxLength={1}
                      />
                    </Form.Item>
                  </Space>
                </div>
              </div>
              <div className="mt-5 mb-10 flex flex-col gap-4 items-center">
                <div className="flex flex-row">
                  <Text className="text-neutral">Didn’t receive code?</Text>
                  <Text
                    className={`${
                      verificationCodeCounter === 0
                        ? "text-primary"
                        : "text-neutral"
                    } ml-1 font-semibold cursor-pointer`}
                    onClick={handleOtpResend}
                  >
                    Resend
                  </Text>
                </div>
                <Text className="text-primary">
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </Text>
              </div>
              <Form.Item>
                <SubmitButton form={verificationCodeForm} />
              </Form.Item>
            </Form>
          </div>
        ) : step == 3 ? (
          <div>
            <div className="flex flex-col gap-5 p-10">
              <Text className="text-4xl font-semibold">Set your Password</Text>
              <div className="flex flex-col">
                <Text className="text-lg text-neutral">
                  Create strong password to keep your information safe.
                </Text>
              </div>
              <Form
                form={passwordForm}
                onFinish={onPasswordFormFinish}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  label="Password"
                  name="password"
                  className="font-medium mb-5"
                  rules={[
                    { required: true, message: "Please enter your password" },
                    { min: 8, message: "Use at least 8 characters" },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                  help="Use at least 8 characters"
                >
                  <Input
                    className="font-normal"
                    placeholder="Enter your password"
                    value={passwordData.password}
                    onChange={(e) =>
                      handlePasswordFormChange("password")(e.target.value)
                    }
                    type="password"
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm your Password"
                  name="confirmPassword"
                  className="font-medium"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter confirm password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Password did not match!")
                        );
                      },
                    }),
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Input
                    className="font-normal"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      handlePasswordFormChange("confirmPassword")(
                        e.target.value
                      )
                    }
                    type="password"
                  />
                </Form.Item>
                <Form.Item>
                  <SubmitButton form={passwordForm} />
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <Text className="text-4xl font-semibold">
              Congratulations! You're Cleared for Takeoff!
            </Text>
            <div className="flex flex-col">
              <Text className="text-lg text-neutral">
                Smooth skies ahead! Your account is set up and ready for you to
                book flights, track your journeys, and unlock exclusive travel
                perks. Buckle up for a seamless travel experience!
              </Text>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary mb-2 mt-5"
              size="large"
              block={true}
            >
              Nice !
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
