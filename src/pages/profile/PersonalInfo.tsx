import React, { useState } from "react";
import { Select, Form, Input, Typography, Checkbox, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

interface ContactFormData {
  email: string;
  phoneNumber: string;
}

const { Option } = Select;

const PersonalInfo: React.FC = () => {
  
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const nationalityOptions = [
    { flag: "🇺🇸", name: "United States", value: "US" },
    { flag: "🇬🇧", name: "United Kingdom", value: "GB" },
    { flag: "🇨🇦", name: "Canada", value: "CA" },
    { flag: "🇦🇺", name: "Australia", value: "AU" },
    { flag: "🇩🇪", name: "Germany", value: "DE" },
    { flag: "🇫🇷", name: "France", value: "FR" },
    { flag: "🇯🇵", name: "Japan", value: "JP" },
    { flag: "🇮🇳", name: "India", value: "IN" },
    { flag: "🇧🇷", name: "Brazil", value: "BR" },
    { flag: "🇮🇩", name: "Indonesia", value: "ID" },
    // Add more nationality options as needed
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
    };

  const [selectedNationality, setSelectedNationality] = useState<string>("");

  const handleChangeNationality = (value: string) => {
    setSelectedNationality(value);
    // You may want to update your form values or state here
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [form] = Form.useForm();

  return (
    <>
      <h2 className="title-personal_info">Personal Information</h2>
      <h2 className="sub_title-personal_info">
        Please complete your profile with the necessary information.
      </h2>
      <Form form={form}>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0, marginTop: 10 }}
            level={5}
          >
            Salutation
          </Typography.Title>
          <Select
            defaultValue="Mr"
            style={{ width: "100%", height: "40px" }}
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
            First and Middle Name
          </Typography.Title>
          <Input
            placeholder="Lewis Carl"
            disabled={isNoFirstMiddleNameChecked}
            style={{ height: "40px" }}
          />
          <Checkbox
            className="font-normal"
            onChange={(e) => {
              setIsNoFirstMiddleNameChecked(e.target.checked);

              // Update validation rules for First & Middle Name
              form.setFieldsValue({
                firstMiddleName: e.target.checked ? undefined : "",
              });
            }}
          >
            This passenger doesn’t have a first & middle name in the passport.
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Last Name
          </Typography.Title>
          <Input placeholder="Davidson" style={{ height: "40px" }} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please select nationality" }]}
          validateTrigger={["onChange", "onBlur"]}
        >
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
            placeholder="Select your nationality"
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
              <Option key={option.value} value={option.value}>
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
            onChange={onChange}
            placeholder="7 January 1985"
            style={{ width: "100%", height: "40px" }}
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
            Phone Number
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
              width: "80%",
            }}
          >
            <Input
              size="large"
              placeholder="Phone Number"
              onChange={(e) =>
                handleContactFormChange("phoneNumber")("+62" + e.target.value)
              }
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please enter your email" },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
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
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonalInfo;
