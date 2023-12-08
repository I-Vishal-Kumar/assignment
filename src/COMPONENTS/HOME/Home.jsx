import home_top_backgound from "../ASSETS/home_top_background.png";
import Cards from "../CARD/Cards";
import card_data from "../../data";
import { useState } from "react";
import Group from "../GROUPS/Group";
import SignInUp from "../SIGN-IN-UP/sign_in_up";

import logo from "../ASSETS/logo.png";

// importing group images
import group_1 from "../ASSETS/group_1.png";
import group_2 from "../ASSETS/group_2.png";
import group_3 from "../ASSETS/group_3.png";
import group_4 from "../ASSETS/group_4.png";
// ------------------

const Home = () => {
  let groups_data = [
    {
      image: group_1,
      id: 1,
      name: "Leasure",
      followed: false,
    },
    {
      image: group_2,
      id: 2,
      name: "Activism",
      followed: false,
    },
    {
      image: group_3,
      id: 3,
      name: "MBA",
      followed: false,
    },
    {
      image: group_4,
      id: 4,
      name: "Philosophy",
      followed: false,
    },
  ];
  let [loginSignup, updateLSPopup] = useState(true);
  let [group_data, update_group_data] = useState(groups_data);
  let [navigation, update_navigation] = useState([
    {
      value: "Posts(32)",
      clicked: true,
    },
    {
      value: "Article",
      clicked: false,
    },
    {
      value: "Events",
      clicked: false,
    },
    {
      value: "Eduction",
      clicked: false,
    },
    {
      value: "Job",
      clicked: false,
    },
  ]);
  function follow_group(group_id) {
    update_group_data((prev) => {
      let new_data = [...prev];
      new_data.forEach((item) => {
        if (item.id === group_id) {
          item.followed = !item.followed;
        }
      });
      return new_data;
    });
  }
  function navigate(id) {
    let new_data = [...navigation];
    new_data.forEach((item) => (item.clicked = false));
    new_data[id].clicked = true;
    update_navigation(new_data);
  }

  return (
    <>
      <nav className="bg-slate-200 h-[65px]">
        <div className="flex gap-11 px-[1rem] justify-between items-center">
          {/* Logo */}
          <div
            style={{
              background: `url(${logo}) center no-repeat`,
              backgroundSize: "contain",
            }}
            className=" text-lg w-[20%] h-[65px] font-bold"
          ></div>

          {/* Search Bar */}
          <div className="flex w-[60%] items-center justify-center rounded-full px-[1rem] bg-slate-300">
            <span className=" flex items-center">
              {/* Magnify glass icon from Material Icons */}
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              type="text"
              placeholder="Search for your favroit groups in ATG"
              className="px-2 w-full outline-none py-1 bg-slate-300  rounded"
            />
          </div>

          {/* Create a New Account */}
          <div
            onClick={() => updateLSPopup(true)}
            className="cursor-pointer w-[20%]"
          >
            Create account. <span className="text-blue-600">Its free</span>
          </div>
        </div>
      </nav>
      <section
        style={{ height: "calc(100vh - 70px)" }}
        className=" overflow-y-auto"
      >
        {/* top portion */}
        <section
          style={{
            background: `url(${home_top_backgound}) center no-repeat`,
            backgroundSize: "cover",
            filter: "brightness(0.8)",
          }}
          className="h-[20rem] relative w-full  "
        >
          <div
            style={{ background: "rgba(0,0,0,0.5" }}
            className="absolute h-full w-full "
          ></div>
          <div className="absolute bottom-[2rem] left-[1rem] text-white">
            <h2>Computer Engineering</h2>
            <span>142,765 Computer Engineers follow this</span>
          </div>
        </section>
        {/* main contents */}

        <div className=" hidden md:flex pt-[1rem] border-b-2 items-end border-b-solid border-b-gray-200 ">
          <div className="w-[60%] md:pl-[5rem] flex [&>*]:h-full [&>*]:ml-[0.8rem] ">
            {navigation.map((item, i) => (
              <h2
                onClick={() => {
                  navigate(i);
                }}
                className={
                  " border-b-[#FF922B] border-solid cursor-pointer " +
                  (item.clicked ? " border-b-2 " : " text-gray-500 ")
                }
                key={i}
              >
                {item.value}
              </h2>
            ))}
          </div>
          <div className=" md:w-[40%] flex">
            <button className=" flex bg-[#EDEEF0] items-center py-[0.75rem] px-[2rem] rounded-md ">
              <span className="mr-[0.5rem] ">Write a post</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_839)">
                    <path
                      d="M6.41663 9.16663L11 13.75L15.5833 9.16663H6.41663Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_839">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
            <button className=" flex items-center py-[0.75rem] px-[1rem] rounded-md bg-blue-500">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_859)">
                    <path
                      d="M7.33333 9.16671H4.58333V6.41671H2.75V9.16671H0V11H2.75V13.75H4.58333V11H7.33333V9.16671ZM16.5 10.0834C18.0217 10.0834 19.2408 8.85504 19.2408 7.33337C19.2408 5.81171 18.0217 4.58337 16.5 4.58337C16.2067 4.58337 15.9225 4.62921 15.6658 4.71171C16.1883 5.45421 16.4908 6.35254 16.4908 7.33337C16.4908 8.31421 16.1792 9.20337 15.6658 9.95504C15.9225 10.0375 16.2067 10.0834 16.5 10.0834ZM11.9167 10.0834C13.4383 10.0834 14.6575 8.85504 14.6575 7.33337C14.6575 5.81171 13.4383 4.58337 11.9167 4.58337C10.395 4.58337 9.16667 5.81171 9.16667 7.33337C9.16667 8.85504 10.395 10.0834 11.9167 10.0834ZM17.985 12.0634C18.7458 12.7325 19.25 13.585 19.25 14.6667V16.5H22V14.6667C22 13.255 19.8275 12.3842 17.985 12.0634ZM11.9167 11.9167C10.0833 11.9167 6.41667 12.8334 6.41667 14.6667V16.5H17.4167V14.6667C17.4167 12.8334 13.75 11.9167 11.9167 11.9167Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_859">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className="ml-[0.5rem] text-white">Join a group</span>
            </button>
          </div>
        </div>
        <div className="md:hidden pt-[1rem] flex px-[1rem] justify-between border-b-2 items-end border-b-solid border-b-gray-200 ">
          <h2>Posts(32)</h2>
          <select
            id="filter"
            className="text-xl bg-slate-300 rounded-md py-[0.25rem]"
          >
            <option defaultChecked defaultValue="Filter">
              Filter
            </option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <section className="flex md:px-[5rem]">
          <section className="md:w-[60%]">
            {card_data.map((item, i) => (
              <Cards key={i} cards_data={item} />
            ))}
          </section>
          {/* this section will be hidden in mobile  */}
          <section className="md:block pl-[2rem] w-[40%] hidden py-[1rem]">
            {/* location */}
            <div className="mt-[4rem] w-[80%]">
              <div className="relative">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Location"
                  className="px-[2rem] py-[0.5rem] border-[0.8px] border-solid rounded-md border-gray-500 outline-none w-full"
                />
                <span className="absolute left-[0.5%] top-[25%] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_842)">
                      <path
                        d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM5.25 6.75C5.25 4.68 6.93 3 9 3C11.07 3 12.75 4.68 12.75 6.75C12.75 8.91 10.59 12.1425 9 14.16C7.44 12.1575 5.25 8.8875 5.25 6.75Z"
                        fill="black"
                      />
                      <path
                        d="M9 8.625C10.0355 8.625 10.875 7.78553 10.875 6.75C10.875 5.71447 10.0355 4.875 9 4.875C7.96447 4.875 7.125 5.71447 7.125 6.75C7.125 7.78553 7.96447 8.625 9 8.625Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_842">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>

                <span className="absolute right-[0.5%] top-[25%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1_848)">
                      <path
                        d="M2.5 14.375V17.5H5.625L14.8417 8.28334L11.7167 5.15834L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_848">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
              <div className="mt-10 flex">
                <span
                  style={{ color: "gray" }}
                  className="material-symbols-outlined"
                >
                  error
                </span>
                <span className="ml-[0.5rem] text-gray-500">
                  Your location will help us serve better and extend a
                  personalised experience.
                </span>
              </div>
            </div>
            {/* recomended groups */}
            <div className="mt-[2rem]">
              <div className="flex">
                <span className="material-symbols-outlined">thumb_up</span>
                <h4 className="uppercase ml-[0.5rem]">recomended groups</h4>
              </div>
              {/* groups */}
              <div className="mt-[2rem]">
                {group_data.map((item) => (
                  <Group key={item.id} data={item} handleClick={follow_group} />
                ))}
                <div className="text-end px-[2.5rem] mt-[4rem] text-blue-500">
                  <a>See More...</a>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      {loginSignup && <SignInUp handleClick={updateLSPopup} />}
    </>
  );
};

export default Home;
