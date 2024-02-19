import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Steps,
  Button,
  Form,
  Input,
  Modal,
  Typography,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Card,
  Space,
  Alert,
} from "antd";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import moment, { Moment } from "moment";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import GoogleSvg from "../../assets/google.svg";
import TermsOfUseModal from "../../components/TermsOfUseModal";
import PrivacyPolicyModal from "../../components/PrivacyPolicyModal";

dayjs.extend(customParseFormat);

const { Step } = Steps;
const { Text } = Typography;

interface PersonalFormData {
  salutation: string;
  firstName: string;
  lastName: string;
  nationality: string;
  dob: string;
}

interface ContactFormData {
  email: string;
  phoneNumber: string;
}
interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

interface VerificationFormData {
  verificationCode: string;
}

// Dummy data for nationality options (replace with actual data)
const nationalityOptions: {
  name: string;
  id: string;
  countryCode: string;
}[] = [
  {
    id: "ae6e9985-8683-494d-9c91-93a7f36d6003",
    name: "UNITED STATES",
    countryCode: "+1",
  },
  {
    id: "45930fd0-5990-469c-80cd-9d7648250139",
    name: "CHINA",
    countryCode: "+86",
  },
  {
    id: "4f42934e-35b6-4fa8-832c-7cdf88c464dc",
    name: "UNITED KINGDOM",
    countryCode: "+44",
  },
  {
    id: "6fb3e59a-ab7b-45d2-be0f-ce700633d459",
    name: "UNITED ARAB EMIRATES",
    countryCode: "+971",
  },
  {
    id: "7e9ac63c-d3f0-46d6-bd58-1cc46b88f2c8",
    name: "INDONESIA",
    countryCode: "+62",
  },
  {
    id: "2a9160ff-e1ad-410f-827f-05946127fe04",
    name: "JAPAN",
    countryCode: "+81",
  },
];

const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [verificationCode] = useState<string | null>(null);
  // const [counter, setCounter] = useState<number>(60);
  const [verificationCodeCounter, setVerificationCodeCounter] =
    useState<number>(60);
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);
  // const [nationalityOptions, setNationalityOptions] = useState([]);
  const [isNationalityModalVisible, setNationalityModalVisible] =
    useState<boolean>(false);

  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [locale, setLocale] = useState<string>("");
  const [isOtpResend, setIsOtpResend] = useState<boolean>(false);
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 0) {
      // Store personalInfoForm data
      personalInfoForm
        .validateFields()
        .then((values) => {
          setPersonalData({
            salutation: values.salutation,
            firstName: values.firstMiddleName || "",
            lastName: values.lastName,
            nationality: values.nationality,
            dob: values.dob.format("DD MMMM YYYY").toString(),
          });

          if (isNoFirstMiddleNameChecked) {
            setPersonalData({
              ...personalData,
              firstName: "",
            });
          }
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    } else if (currentStep === 1) {
      // Store contactDetailForm data
      contactDetailForm
        .validateFields()
        .then((values) => {
          setContactData({
            email: values.email,
            phoneNumber: `${values.locale}${values.phoneNumber}`,
          });
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    }

    // Move to the next step
    setCurrentStep(currentStep + 1);
  };

  const [personalInfoForm] = Form.useForm();
  const [contactDetailForm] = Form.useForm();
  const [verificationCodeForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [personalData, setPersonalData] = useState<PersonalFormData>({
    salutation: "",
    firstName: "",
    lastName: "",
    nationality: "",
    dob: "",
  });
  const [contactData, setContactData] = useState<ContactFormData>({
    email: "",
    phoneNumber: "",
  });

  const handleEditButtonClick = (section: "personalInfo" | "contactDetail") => {
    if (section === "personalInfo") {
      // Reset personalInfoForm values based on stored personalData
      personalInfoForm.setFieldsValue({
        salutation: personalData.salutation,
        firstMiddleName: isNoFirstMiddleNameChecked
          ? ""
          : personalData.firstName,
        noFirstMiddleName: isNoFirstMiddleNameChecked,
        lastName: personalData.lastName,
        nationality: getSelectedNationalityName() || "",
        dob: moment(personalData.dob, "DD MMMM YYYY"), // Use moment to parse the date
      });

      // Set current step to 0
      setCurrentStep(0);
    } else if (section === "contactDetail") {
      // Reset contactDetailForm values based on stored contactData
      contactDetailForm.setFieldsValue({
        locale: "", // You may need to parse the locale from stored contactData
        phoneNumber: contactData.phoneNumber,
        email: contactData.email,
      });

      // Set current step to 1
      setCurrentStep(1);
    }
  };

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const { Option } = Select;

  const handlePersonalFormChange =
    (fieldName: keyof PersonalFormData) => (value: string) => {
      if (fieldName === "nationality") {
        const selectedOption = nationalityOptions.find(
          (option) => option.name === value
        );
        if (selectedOption) {
          setLocale(selectedOption.id);
        }
      }

      if (fieldName === "firstName" && isNoFirstMiddleNameChecked) {
        setPersonalData({
          ...personalData,
          [fieldName]: "",
        });
      }

      setPersonalData({
        ...personalData,
        [fieldName]: value,
      });
    };

  const handleContactFormChange =
    (fieldName: keyof ContactFormData) => (value: string) => {
      if (fieldName === "phoneNumber") {
        const fullPhoneNumber = `${locale}${value}`;
        console.log("Full Phone Number:", fullPhoneNumber);
        setContactData({
          ...contactData,
          [fieldName]: fullPhoneNumber,
        });
      } else {
        setContactData({
          ...contactData,
          [fieldName]: value,
        });
      }
    };

  const handlePasswordFormChange =
    (fieldName: keyof PasswordFormData) => (value: string) => {
      setPasswordData({
        ...passwordData,
        [fieldName]: value,
      });
    };

  const handleContinueWithGoogle = () => {
    // Implement Google authentication logic here
  };

  const handleContinueWithEmail = () => {
    setIsOnboarding(false);
    setCurrentStep(0);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleHomepage = () => {
    navigate("/");
  };

  const handleTermsClick = () => {
    setTermsVisible(true);
  };

  const handlePrivacyClick = () => {
    setPrivacyVisible(true);
  };

  const handleCancel = () => {
    setTermsVisible(false);
    setPrivacyVisible(false);
  };

  const onPersonalFormFinish = (values: PersonalFormData) => {
    console.log("onPersonalFormFinish called");
    console.log("Personal Form values:", values);
    handleNext();
  };

  const onContactFormFinish = async (values: ContactFormData) => {
    console.log("Contact Form values:", values);

    try {
      await handleVerifyOTP(values.email); // Asynchronously verify OTP

      // Verification successful, start the counter
      startVerificationCodeCounter();

      // Move to the next step
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

  const onVerificationFormFinish = (values: VerificationFormData) => {
    console.log("Verification Form values:", values);
    handleNext();
    if (values.verificationCode === verificationCode) {
      handleNext();
    } else {
      console.error("Verification code mismatch");
    }
  };
  const onPasswordFormFinish = (values: PasswordFormData) => {
    console.log("Password Form values:", values);
    setPasswordData({
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    handleNext();
  };

  const startVerificationCodeCounter = useCallback(() => {
    const intervalId = setInterval(() => {
      setVerificationCodeCounter((prevCounter) =>
        prevCounter > 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [handleNext]);

  const minutes = Math.floor(verificationCodeCounter / 60);
  const seconds = verificationCodeCounter % 60;

  const validateFirstName: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      const noFirstMiddleName = getFieldValue("noFirstMiddleName");

      if (noFirstMiddleName) {
        return Promise.resolve();
      }

      if (!value) {
        return Promise.reject("Please enter your first name.");
      }

      if (/^[A-Za-z\s]+$/.test(value)) {
        return Promise.resolve();
      }

      return Promise.reject("Please enter a valid name with alphabets only.");
    },
  });

  const handleVerifyOTP = async (email: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;

      // Check if apiUrl is defined before making the request
      if (!apiUrl) {
        throw new Error("REACT_APP_API_BASE_URL is not defined.");
      }

      // Continue with the OTP verification logic
      const response = await fetch(`${apiUrl}/auth/verifyOTP?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("OTP verification successful:", responseData);
      } else {
        const errorData = await response.json();
        console.error("OTP verification failed:", errorData);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  const getSelectedNationalityName = () => {
    const selectedOption = nationalityOptions.find(
      (option) => option.id === selectedNationality
    );
    return selectedOption ? selectedOption.name : "";
  };

  const handleOtpResend = async (email: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;

      // Kirim permintaan ke API untuk resend OTP
      const response = await fetch(`${apiUrl}/auth/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer token'
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        // Resend OTP berhasil
        console.log("OTP Resend successful");
        setVerificationCodeCounter(60); // Set the counter back to 60 seconds
        setIsOtpResend(true); // Set isOtpResend to true
        startVerificationCodeCounter(); // Restart the counter
      } else {
        const errorData = await response.json();
        console.error("Failed to resend OTP:", errorData);
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
    } finally {
      setIsOtpResend(false); // Set isOtpResend back to false regardless of the result
    }
  };

  useEffect(() => {
    if (verificationCodeCounter === 0) {
      setIsOtpResend(false);
    }
  }, [verificationCodeCounter]);

  const phoneCode = nationalityOptions.find(
    (option) => option.name === personalData.nationality
  )?.countryCode;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/2 h-screen hidden md:block">
        <img
          src="src/assets/sign-up.png"
          alt="Sign Up Image"
          className="h-screen rounded p-10 object-contain fixed"
        />
      </div>
      <div className="md:w-1/2 flex items-center p-4 md:py-10 md:px-16 overflow-auto">
        {isOnboarding ? (
          <div className="w-full flex flex-col gap-4">
            <Text className="text-4xl font-semibold">Create an Account</Text>
            <Text className="text-lg mb-8">
              Join us on the journey! Register now and unlock a world of
              seamless possibilities and exclusive benefits.
            </Text>
            <div className="w-full flex flex-col items-center gap-6">
              <Button
                type="primary"
                onClick={handleContinueWithEmail}
                className="bg-primary mb-2 font-bold"
                size="large"
                block={true}
              >
                Continue with Email
              </Button>
              <Button
                type="default"
                onClick={handleContinueWithGoogle}
                className="bg-white border-solid border-1 border-neutral-light font-bold flex items-center justify-center"
                size="large"
                block={true}
                icon={
                  <img
                    src={GoogleSvg}
                    alt="My Icon"
                    width="20"
                    height="20"
                    style={{
                      left: "15px",
                      top: "25%",
                      bottom: "25%",
                      position: "absolute",
                    }}
                  />
                }
              >
                Continue with Google
              </Button>
              <div className="text-neutral mb-4">
                Have an account already?{" "}
                <Link
                  type="text"
                  onClick={handleSignIn}
                  className="cursor-pointer text-primary mb-4 left-0"
                  to="/login"
                >
                  Sign In
                </Link>
              </div>
              <TermsOfUseModal open={termsVisible} onCancel={handleCancel} />
              <PrivacyPolicyModal
                open={privacyVisible}
                onCancel={handleCancel}
              />
              <Text className="mt-3 text-neutral">
                By continuing, you accept the{" "}
                <span
                  className="font-semibold cursor-pointer underline"
                  onClick={handleTermsClick}
                >
                  Terms Of Use
                </span>{" "}
                and{" "}
                <span
                  className="font-semibold cursor-pointer underline"
                  onClick={handlePrivacyClick}
                >
                  Privacy Policy
                </span>
                .
              </Text>
            </div>
          </div>
        ) : (
          <div className="w-full md:max-w-2xl">
            {currentStep === 3 && (
              <div className="flex flex-col gap-5">
                {isOtpResend && (
                  <Alert
                    message={
                      <Text
                        className="font-semibold"
                        style={{ color: "#247535" }}
                      >
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
                )}

                <Text className="text-4xl font-semibold">Verify Code</Text>
                <div className="flex flex-col">
                  <Text className="text-lg text-neutral">
                    Enter the verification code we send you on
                  </Text>
                  <Text className="text-lg mb-8">{contactData.email}</Text>
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
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code2"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code3"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code4"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code5"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
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
                        onClick={() => handleOtpResend(contactData.email)}
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
            )}
            {currentStep === 4 && (
              <div className="flex flex-col gap-5">
                <Text className="text-4xl font-semibold">
                  Set your Password
                </Text>
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
                      value={personalData.lastName}
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
            )}
            {currentStep === 5 && (
              <div className="flex flex-col gap-5">
                <Text className="text-4xl font-semibold">
                  Congratulations! You're Cleared for Takeoff!
                </Text>
                <div className="flex flex-col">
                  <Text className="text-lg text-neutral">
                    Smooth skies ahead! Your account is set up and ready for you
                    to book flights, track your journeys, and unlock exclusive
                    travel perks. Buckle up for a seamless travel experience!
                  </Text>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mb-2 mt-5"
                  size="large"
                  block={true}
                  onClick={handleHomepage}
                >
                  Sign In
                </Button>
              </div>
            )}
            {currentStep < 3 && (
              <Steps current={currentStep} style={{ flexDirection: "row" }}>
                <Step title="Personal" />
                <Step title="Contact" />
                <Step title="Check" />
              </Steps>
            )}
            {currentStep === 0 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">
                  Personal Information
                </Text>
                <Text className="text-lg mb-8">
                  Join us on the journey! Register now and unlock a world of
                  seamless possibilities and exclusive benefits.
                </Text>
                {/* dummy form */}
                <Form
                  form={personalInfoForm}
                  onFinish={onPersonalFormFinish}
                  layout="vertical"
                  size="large"
                  initialValues={{
                    salutation: personalData.salutation,
                    firstMiddleName: isNoFirstMiddleNameChecked
                      ? ""
                      : personalData.firstName,
                    noFirstMiddleName: isNoFirstMiddleNameChecked,
                    lastName: personalData.lastName,
                    nationality: getSelectedNationalityName() || "",
                    dob: personalData.dob,
                  }}
                >
                  <Form.Item
                    label="Salutation"
                    name="salutation"
                    className="font-medium mb-5"
                    rules={[
                      { required: true, message: "Please select salutation" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Select
                      placeholder="Salutation"
                      className="font-normal"
                      value={personalData.salutation}
                      onChange={handlePersonalFormChange("salutation")}
                    >
                      <Option value="Mr">Mr</Option>
                      <Option value="Mrs">Mrs</Option>
                      <Option value="Ms">Ms</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="First & Middle Name"
                    name="firstMiddleName"
                    className="font-medium mb-0"
                    rules={[validateFirstName]}
                  >
                    <Input
                      disabled={isNoFirstMiddleNameChecked}
                      className="font-normal"
                      placeholder="First & Middle Name"
                      value={personalData.firstName}
                      onChange={(e) =>
                        handlePersonalFormChange("firstName")(e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="noFirstMiddleName"
                    valuePropName="checked"
                    className="mb-5"
                  >
                    <Checkbox
                      className="font-normal"
                      onChange={(e) => {
                        setIsNoFirstMiddleNameChecked(e.target.checked);
                        if (e.target.checked) {
                          // Jika checkbox dicentang, set nilai firstName menjadi string kosong
                          setPersonalData((prevData) => ({
                            ...prevData,
                            firstName: "",
                          }));
                          console.log("Personal Form values:", personalData);
                        }
                        // cek
                        // setTimeout(() => {
                        //   console.log("Personal Form values:", personalData);
                        // }, 0);
                      }}
                    >
                      This passenger doesn’t have a first & middle name in the
                      passport.
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    className="font-medium mb-5"
                    rules={[
                      { required: true, message: "Please enter last name" },
                      {
                        pattern: /^[A-Za-z\s]+$/, // Only allow alphabets and spaces
                        message:
                          "Please enter a valid last name with alphabets only",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      className="font-normal"
                      placeholder="Your Last Name"
                      value={personalData.lastName}
                      onChange={(e) =>
                        handlePersonalFormChange("lastName")(e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    className="font-medium mb-5"
                    rules={[
                      { required: true, message: "Please select nationality" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      readOnly
                      onClick={() => setNationalityModalVisible(true)}
                      value={getSelectedNationalityName() || ""}
                      className="font-normal"
                      placeholder="Your Nationality"
                      suffix={<DownOutlined style={{ color: "#d9d9d9" }} />}
                    />
                  </Form.Item>
                  {/* Nationality Modal */}
                  <Modal
                    title="Select your nationality"
                    open={isNationalityModalVisible}
                    onCancel={() => setNationalityModalVisible(false)}
                    centered
                    footer={null}
                  >
                    <div className="flex flex-col gap-5 w-100">
                      <Text>
                        Please select your nationality from the options below
                        for the personal information.
                      </Text>
                      {nationalityOptions.map((option) => (
                        <Card className="w-100" key={option.id}>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row">{option.name}</div>
                            <Radio
                              checked={option.id === selectedNationality}
                              onClick={() => {
                                setSelectedNationality(option.id);
                                setNationalityModalVisible(false);
                                personalInfoForm.setFieldsValue({
                                  nationality: option.name,
                                });
                                setPersonalData({
                                  ...personalData,
                                  nationality: option.name,
                                });
                              }}
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Modal>
                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    className="font-medium mb-5"
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                      {
                        validator: (_, value: Moment) => {
                          const selectedDate = value;

                          // Check if selectedDate is defined before accessing properties
                          if (!selectedDate) {
                            return Promise.reject(
                              "Please select a valid date of birth"
                            );
                          }

                          const today = moment().startOf("day");
                          const minDate = moment().subtract(17, "years");

                          if (
                            selectedDate.isAfter(today) ||
                            selectedDate.isSame(today) ||
                            selectedDate.isAfter(minDate)
                          ) {
                            return Promise.reject(
                              "Please select a valid date of birth"
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      className="font-normal"
                      style={{ width: "100%" }}
                      disabledDate={(currentDate) =>
                        currentDate &&
                        (currentDate >= moment().endOf("day") ||
                          currentDate > moment().subtract(17, "years"))
                      }
                      onChange={(currentDate) =>
                        handlePersonalFormChange("dob")(
                          currentDate!.format("DD MMMM YYYY").toString()
                        )
                      }
                      format={"DD MMMM YYYY"}
                    />
                  </Form.Item>

                  <Form.Item>
                    <SubmitButton form={personalInfoForm} />
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">Contact Detail</Text>
                <Text className="text-lg mb-8">
                  Provide us with your most recent contact information.
                </Text>
                <Form
                  onFinish={onContactFormFinish}
                  layout="vertical"
                  form={contactDetailForm}
                >
                  <Form.Item
                    label="Phone Number"
                    className="font-semibold mb-5"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="locale"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "12%",
                        marginRight: "2%",
                      }}
                    >
                      <Input placeholder={phoneCode} readOnly size="large" />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        { required: true },
                        {
                          pattern: /^[0-9]*$/,
                          message: "Please enter a valid phone number",
                        },
                        {
                          min: 6,
                          message:
                            "Invalid phone number length. Please enter a valid phone number with at least 8 digits",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "86%",
                      }}
                      className=" mb-5"
                    >
                      <Input
                        size="large"
                        placeholder="Phone Number"
                        onChange={(e) =>
                          handleContactFormChange("phoneNumber")(e.target.value)
                        }
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    className="font-semibold"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      onChange={(e) =>
                        handleContactFormChange("email")(e.target.value)
                      }
                      className="mb-5"
                    />
                  </Form.Item>
                  <Form.Item>
                    <SubmitButton form={contactDetailForm} />
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">Double Check</Text>
                <Text className="text-lg mb-8">
                  Almost there! Ensure all your details are accurate before
                  hitting the submit button.
                </Text>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <Text className="font-semibold text-xl">
                      Personal Information
                    </Text>
                    <button
                      className="flex flex-row items-center gap-2 cursor-pointer"
                      onClick={() => handleEditButtonClick("personalInfo")}
                    >
                      <Text className="font-bold text-primary">Edit</Text>
                      <EditOutlined className="text-primary" />
                    </button>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-col w-1/2">
                      <Text className="text-neutral">First & Middle Name</Text>
                      <Text>{personalData.firstName}</Text>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <Text className="text-neutral">Last Name</Text>
                      <Text>{personalData.lastName}</Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0">
                    <Text className="text-neutral">Date of Birth</Text>
                    <Text>{personalData.dob}</Text>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-3">
                  <div className="flex flex-row justify-between items-center">
                    <Text className="font-semibold text-xl">
                      Contact Detail
                    </Text>
                    <button
                      className="flex flex-row items-center gap-2 cursor-pointer"
                      onClick={() => handleEditButtonClick("contactDetail")}
                    >
                      <Text className="font-bold text-primary">Edit</Text>
                      <EditOutlined className="text-primary" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <Text className="text-neutral">Email</Text>
                      <Text>{contactData.email}</Text>
                    </div>
                    <div className="flex flex-col">
                      <Text className="text-neutral">Phone Number</Text>
                      <Text>{contactData.phoneNumber}</Text>
                    </div>
                  </div>
                </div>
                <Checkbox className="font-normal my-2">
                  Subscribe to newsletter to receive latest offer and promotion
                  every month.
                </Checkbox>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mb-2"
                  size="large"
                  block={true}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
