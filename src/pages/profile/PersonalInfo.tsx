import React, { useState, useEffect } from "react";
import { Select, Form, Input, Typography, Checkbox, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";

import dayjs from "dayjs";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import axios from "axios";

// ... (import statements)

interface ContactFormData {
  email: string;
  phoneNumber: string;
}

interface UserData {
  salutation: string;
  firstName: string;
  lastName: string;
  national: string;
  dob: number[]; // Or use a different type for date of birth
  phone: string;
  email: string;
  // Add other properties as needed
}

interface FormValues {
  salutation: string;
  firstMiddleName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string; // Sesuaikan dengan tipe yang sesuai
  phoneNumber: string;
  email: string;
  // ... tambahkan properti lainnya jika diperlukan
}

const { Option } = Select;

interface PersonalInfoProps {
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ setFormValues }) => {
  const [isNoFirstNameChecked, setIsNoFirstNameChecked] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(Object);
  useEffect(() => {
    // Fetch user data from the API

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const api = axios.create({
        baseURL: "https://be-java-master-production.up.railway.app/api",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await api.get("/users/me");

      const userData = response.data;
      console.log(userData.data);

      // Check if the request was successful
      if (userData.status === "success") {
        // Extract relevant user data
        setUserData(userData.data);
        setSelectedNationality(userData.data.national);
        console.log(userData.data.nationality);
        const [year, month, day] = userData.data.dob;
        userData.data.dob = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        form.setFieldsValue({
          salutation: userData.data.salutation,
          firstName: userData.data.firstName,
          lastName: userData.data.lastName,
          dateOfBirth: dayjs(userData.data.dob),
          national: userData.data.national,
          phoneNumber: userData.data.phone,
          email: userData.data.email,

          // ... (set other fields as needed)
        });
      } else {
        console.error("Failed to fetch user data:", userData.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (value: string) => {
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      salutation: value,
    }));
  };

  const nationalityOptions = [
    { flag: "🇺🇸", name: "Amerika Serikat", value: "US" },
    { flag: "🇬🇧", name: "Inggris", value: "GB" },
    { flag: "🇨🇦", name: "Kanada", value: "CA" },
    { flag: "🇦🇺", name: "Australia", value: "AU" },
    { flag: "🇩🇪", name: "Jerman", value: "DE" },
    { flag: "🇫🇷", name: "Perancis", value: "FR" },
    { flag: "🇯🇵", name: "Jepang", value: "JP" },
    { flag: "🇮🇳", name: "India", value: "IN" },
    { flag: "🇧🇷", name: "Brasil", value: "BR" },
    { flag: "🇮🇩", name: "Indonesia", value: "ID" },
    // Tambahkan opsi kewarganegaraan lainnya jika diperlukan
  ];
  const [contactData, setContactData] = useState<ContactFormData>({
    email: "",
    phoneNumber: "",
  });

  const handleContactFormChange =
    (fieldName: keyof ContactFormData) => (value: string) => {
      setContactData({
        ...contactData,
        [fieldName]: value,
      });

      // Meneruskan lebih banyak data ke komponen induk
      setFormValues((prevFormValues: FormValues) => ({
        ...prevFormValues,
        [fieldName]: value,
        // Tambahkan properti lainnya jika diperlukan
      }));
    };

  const [selectedNationality, setSelectedNationality] = useState<string>("");

  const handleChangeNationality = (value: string) => {
    setSelectedNationality(value);
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      nationality: value,
    }));
  };
  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      dateOfBirth: dateString,
    }));
  };

  const [form] = Form.useForm();

  return (
    <>
      <h2 className="title-personal_info">Informasi Pribadi</h2>
      <h2 className="sub_title-personal_info">
        Harap lengkapi profil Anda dengan informasi yang diperlukan.
      </h2>
      <Form form={form} initialValues={{ lastName: userData.lastName }}>
        <Typography.Title
          style={{ paddingBottom: 0, marginBottom: 0, marginTop: 10 }}
          level={5}
        >
          salutation
        </Typography.Title>
        {/* --------------------------------------------------------- */}
        <Form.Item name="salutation">
          <Select
            defaultValue="Mrs"
            style={{ width: "100%", height: "40px" }}
            value={userData.salutation}
            onChange={handleChange}
            options={[
              { value: "Mr", label: "Mr" },
              { value: "Mrs", label: "Mrs" },
              { value: "Ms", label: "Ms" },
            ]}
          />
          {/* --------------------------------------------------------- */}
        </Form.Item>
        <Form.Item>
          <Typography.Title level={5}>First & Middle Name</Typography.Title>
          <Form.Item name="firstName" style={{ marginBottom: 0 }}>
            <Input
              placeholder="Lewis Carl"
              disabled={isNoFirstNameChecked}
              style={{ height: "40px" }}
              onChange={(e) =>
                setFormValues((prevFormValues: FormValues) => ({
                  ...prevFormValues,
                  firstName: e.target.value,
                }))
              }
            />
          </Form.Item>

          <Checkbox
            className="font-normal"
            onChange={(e) => {
              setIsNoFirstNameChecked(e.target.checked);
              form.setFieldsValue({
                firstName: e.target.checked ? undefined : "",
              });
            }}
          >
            This Passanger doesnt have a first name in the passport
          </Checkbox>
        </Form.Item>
        <Typography.Title
          style={{ paddingBottom: 0, marginBottom: 0 }}
          level={5}
        >
          Last Name
        </Typography.Title>
        <Form.Item name="lastName">
          <Input
            placeholder="Davidson"
            style={{ height: "40px" }}
            onChange={(e) =>
              setFormValues((prevFormValues: FormValues) => ({
                ...prevFormValues,
                lastName: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item validateTrigger={["onChange", "onBlur"]}>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Nationality
          </Typography.Title>
          <Form.Item name="national">
            <Select
              showSearch
              optionFilterProp="children"
              onChange={handleChangeNationality}
              value={selectedNationality}
              className="font-normal"
              placeholder="Pilih kewarganegaraan Anda"
              style={{ height: "40px", width: "100%" }}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <DownOutlined style={{ color: "#d9d9d9" }} />
                  </div>
                </div>
              )}
            >
              {nationalityOptions.map((option) => (
                <Option key={option.value} value={option.name}>
                  <div style={{ display: "flex", fontWeight: "bold" }}>
                    <FlagIcon
                      code={option.value as FlagIconCode}
                      size={32}
                      className="mr-4 rounded"
                    ></FlagIcon>
                    {option.name}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Date of Birth
          </Typography.Title>
          <Form.Item name="dateOfBirth">
            <DatePicker
              format={"YYYY/MM/DD"}
              onChange={onChange} // Perubahan di sini
              placeholder="7 Januari 1985"
              style={{ width: "100%", height: "40px" }}
            />
          </Form.Item>
        </Form.Item>

        <h2 className="title-personal_info">Contact Detail</h2>
        <h2
          className="sub_title-personal_info"
          style={{ marginBottom: "20px" }}
        >
          Provide us with your most recent contact information.
        </h2>

        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Nomor Telepon
          </Typography.Title>
          <Form.Item
            name="locale"
            rules={[{ required: false }]}
            style={{
              display: "inline-block",
              width: "18%",
              marginRight: "2%",
            }}
          >
            <Input
              defaultValue="+62"
              readOnly={true}
              size="large"
              suffix={<FlagIcon code={"ID"} size={28} className="rounded" />}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            style={{
              display: "inline-block",
              width: "80%",
            }}
          >
            <Input
              size="large"
              placeholder="81247222044"
              onChange={(e) =>
                handleContactFormChange("phoneNumber")("+62" + e.target.value)
              }
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Email
          </Typography.Title>
          <Form.Item name="email">
            <Input
              size="large"
              onChange={(e) => handleContactFormChange("email")(e.target.value)}
              className="mb-5"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalInfo;
