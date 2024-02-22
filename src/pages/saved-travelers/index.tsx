import { Layout } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import HeaderComponent from "../../components/Header";

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;

const SavedTraveler: React.FC = () => {
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
                  Saved Travelers
                </h1>
                <p className="text-neutral mb-5">
                  Make booking easier and faster by saving family, friends, and
                  partners details.
                </p>
              </div>
              <div className="w-full min-h-[562px]">
                <div className="w-full grid grid-cols-10 gap-1">
                  <div className="w-full col-start-1 col-span-10 flex-col gap-[32px] justify-center items-start inline-flex">
                    <div className="flex items-center w-full justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="font-medium text-black">
                            Mrs. Jocelyn Vetros
                          </p>
                          <p className="bg-neutral-background text-link rounded-lg p-1 text-xs">
                            Adult
                          </p>
                        </div>
                        <p className="text-black">20 February 1984</p>
                      </div>
                      <img
                        src="/assets/chevron-right-neutral.svg"
                        alt="w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center w-full justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="font-medium text-black">
                            Ms. Linda Davidson
                          </p>
                          <p className="bg-neutral-background text-link rounded-lg p-1 text-xs">
                            Adult
                          </p>
                        </div>
                        <p className="text-black">1 January 2010</p>
                      </div>
                      <img
                        src="/assets/chevron-right-neutral.svg"
                        alt="w-4 h-4"
                      />
                    </div>
                    <button className="flex gap-2 justify-center bg-white border border-primary rounded-xl border-solid border-1 w-full p-2 text-primary font-semibold text-md">
                      <img src="/assets/add.svg" alt="w-4 h-4" />
                      Add New Traveler
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="w-full col-start-1 col-span-10 flex-col justify-bottom items-bottom "
                style={{ textAlign: "center" }}
              >
                {/* <Pagination
                    total={notifications.length}
                    defaultPageSize={pageSize}
                    current={currentPageActive}
                    onChange={handlePageChangeActive}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    hideOnSinglePage={true}
                    className="my-1"
                  /> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2"></div>
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

export default SavedTraveler;
