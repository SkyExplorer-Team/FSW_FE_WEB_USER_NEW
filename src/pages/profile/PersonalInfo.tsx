import React, { useState, useEffect } from "react";
import { Select, Form, Input, Typography, Checkbox, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import { Moment } from "moment";
import moment from "moment";

import dayjs, { Dayjs } from "dayjs";
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

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  formValues,
  setFormValues,
}) => {
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(Object);
  const [dobData, setDobData] = useState<any>("");
  useEffect(() => {
    // Fetch user data from the API

    fetchUserData();
  }, []); // Empty dependency array means this effect runs once on mount
  const tokenNew =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvd2VuQHN1c2FudG8ubWUiLCJpYXQiOjE3MDc4ODcyNTksImV4cCI6MTcwODg4NzI1OX0.PpiWO9ittMOhTRaeCtm-7rgPOAKS1EeYhADpLbztoG8"; // Gantilah dengan nilai token yang sebenarnya
  localStorage.setItem("access_token", tokenNew);

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
        const {
          salutation,
          firstName,
          lastName,
          nationality,
          // dob,
          phone,
          email,
        } = userData.data;

        setUserData(userData.data);
        setSelectedNationality(userData.data.national);
        console.log(userData.data.nationality);
        const [year, month, day] = userData.data.dob;
        userData.data.dob = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
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
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setFormValues((prevFormValues: FormValues) => ({
      ...prevFormValues,
      dateOfBirth: dateString,
    }));
  };
  const defaultDate = userData.dob;
  console.log(typeof defaultDate);

  const [form] = Form.useForm();

  return (
    <>
      <h2 className="title-personal_info">Informasi Pribadi</h2>
      <h2 className="sub_title-personal_info">
        Harap lengkapi profil Anda dengan informasi yang diperlukan.
      </h2>
      <Form form={form}>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0, marginTop: 10 }}
            level={5}
          >
            salutation
          </Typography.Title>
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
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            First & Middle Name
          </Typography.Title>
          <Input
            placeholder="Lewis Carl"
            disabled={isNoFirstMiddleNameChecked}
            style={{ height: "40px" }}
            onChange={(e) =>
              setFormValues((prevFormValues: FormValues) => ({
                ...prevFormValues,
                firstMiddleName: e.target.value,
              }))
            }
            defaultValue={userData.firstName}
          />
          <Checkbox
            className="font-normal"
            onChange={(e) => {
              setIsNoFirstMiddleNameChecked(e.target.checked);
              form.setFieldsValue({
                firstMiddleName: e.target.checked ? undefined : "",
              });
            }}
          >
            This Passanger doesnt have a first name in the passport
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Last Name
          </Typography.Title>
          <Input
            placeholder="Davidson"
            style={{ height: "40px" }}
            value={userData.lastName}
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
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Date of Birth
          </Typography.Title>
          <DatePicker
            format={"YYYY/MM/DD"}
            onChange={onChange} // Perubahan di sini
            placeholder="7 Januari 1985"
            style={{ width: "100%", height: "40px" }}
            defaultValue={dayjs("2004-01-08")}
          />
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
              defaultValue="085161644408"
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
          <Input
            size="large"
            onChange={(e) => handleContactFormChange("email")(e.target.value)}
            className="mb-5"
            value={userData.email}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalInfo;
