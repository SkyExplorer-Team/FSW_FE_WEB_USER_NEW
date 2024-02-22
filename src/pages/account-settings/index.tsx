import React from "react";
import { Layout, Switch } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import HeaderComponent from "../../components/Header";

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;

const AccountSettings: React.FC = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <div className="my-5">
          <div className="grid grid-cols-10 gap-5">
            <HomeNavSide />
            <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-8 py-3 bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-start inline-flex">
              <div className="text-start font-['Plus Jakarta Sans']  mb-6">
                <h1 className="text-black font-medium text-3xl mb-3">
                  Account Settings
                </h1>
                <p className="text-neutral">
                  Make booking easier and faster by saving family, friends, and
                  partners details.
                </p>
              </div>
              <div className="w-full min-h-[562px]">
                <div className="w-full grid grid-cols-10 gap-1">
                  <div className="w-full col-start-1 col-span-10 flex-col justify-center items-start inline-flex">
                    <div className="flex items-center justify-between w-full my-4">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-black">
                          Newsletter and promotion offers
                        </p>
                        <p className="text-black">
                          Seasonal deals, new products, and exclusive partner
                          offers.
                        </p>
                      </div>
                      <div>
                        <Switch
                          checked={false}
                          onChange={onChange}
                          className="custom-switch" // Tambahkan kelas custom untuk styling
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full my-4">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-black">
                          Email Booking info
                        </p>
                        <p className="text-black">
                          Booking confirmation and trip changes and updates.
                        </p>
                      </div>
                      <div>
                        <Switch
                          checked={false}
                          onChange={onChange}
                          className="custom-switch" // Tambahkan kelas custom untuk styling
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full my-4">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-black">
                          Delete your account
                        </p>
                        <p className="text-black">
                          Request to delete your account and data.
                        </p>
                      </div>
                      <button className="bg-error-background text-error p-3 rounded-xl font-semibold">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          padding: 0,
        }}
      >
        <HomeFooter />
      </Footer>
    </Layout>
  );
};

export default AccountSettings;
