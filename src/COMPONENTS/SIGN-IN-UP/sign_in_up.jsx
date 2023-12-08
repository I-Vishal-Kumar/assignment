import { useState } from "react";
import SVGFile from "../ASSETS/Login.svg";
import { PropTypes } from "prop-types";
import facebook_logo from "../ASSETS/facebook_logo.png";
import google_logo from "../ASSETS/google_logo.png";

const SignInUp = ({ handleClick }) => {
  const [isLogin, updateLogin] = useState(true);
  const [l_details, update_l_details] = useState({
    email: "",
    pass: "",
  });

  const [r_details, update_r_details] = useState({
    phoneNumber: "",
    pass: "",
    otp: "",
    name: "",
    invitationCode: "",
    confPass: "",
  });

  function update_register_details(e) {
    update_r_details((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  function update_login_details(e) {
    update_l_details((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  function handleConfPass(e) {
    if (e.target.value !== r_details.pass) {
      e.target.style.border = "1.5px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
    update_r_details((prev) => {
      return { ...prev, confPass: e.target.value };
    });
  }

  let [l_pass_visibility, update_l_pass_visib] = useState(false);
  let [r_pass_visibility, update_r_pass_visib] = useState(false);

  return (
    <div className="absolute h-[100vh] top-0 justify-center md:items-center items-end w-[100vw] bg-[#3836369e] text-black flex">
      <div className="flex md:h-[80vh] h-auto relative  md:w-[70vw] w-[100vw] rounded-[1.4rem]  ">
        <h5 className="md:block w-full text-center absolute hidden top-[1rem] text-[green]">
          Let&#39;s learn, share & inspire each other with our passion for
          computer engineering. Sign up now 🤘🏼
        </h5>
        <div className="md:w-[50%] w-full h-auto  bg-slate-200 rounded-full flex justify-center items-center">
          {/* login section */}
          {isLogin && (
            <section
              className="h-[100%] justify-end  md:rounded-tr-none
       overflow-hidden md:rounded-br-none rounded-[1rem]  p-5 pl-[2.25rem] md:py-[6rem] py-[2rem] w-[100%] bg-slate-200 flex flex-col items-center text-start "
            >
              <div className="flex w-full justify-between text-black items-center">
                <h1 style={{ alignSelf: "start" }} className="ml-[1rem]">
                  Sign In
                </h1>
                <span onClick={() => handleClick(false)} className="md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#212529"
                    />
                  </svg>
                </span>
              </div>
              <form className=" [&>*]:flex z-10 [&>*]:py-1 w-full p-4">
                <div className="flex-col">
                  <input
                    autoFocus
                    tabIndex={1}
                    required={true}
                    value={l_details.email}
                    onChange={update_login_details}
                    placeholder="Email"
                    // pattern=""TO DO EMAIL VALIDATOR
                    className="border-[1px] invalid:border-[1.5px] invalid:border-red-500 rounded-md py-2 pl-4 text-xl border-solid font-bold
            outline-none border-black bg-transparent"
                    type="text"
                    id="email"
                  />
                </div>
                <div className="relative flex-col">
                  <input
                    tabIndex={2}
                    required={true}
                    placeholder="Password"
                    className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
            outline-none border-black bg-transparent "
                    autoComplete="false"
                    type={l_pass_visibility ? "text" : "password"}
                    id="pass"
                    onChange={update_login_details}
                    value={l_details.pass}
                  />
                  <span
                    onClick={() => update_l_pass_visib((prev) => !prev)}
                    className="absolute bottom-[20%] cursor-pointer right-[0.5rem] material-symbols-outlined"
                  >
                    {l_pass_visibility ? "visibility" : "visibility_off"}
                  </span>
                </div>
                <div className="md:flex-col flex-row justify-between  w-full items-center mt-4">
                  <button
                    type="submit"
                    tabIndex={3}
                    className="md:w-full w-[50%] hover:opacity-[0.9] bg-blue-600 rounded-full py-2 text-center font-bold text-xl text-white"
                  >
                    Sign In
                  </button>
                  <button
                    className="md:hidden"
                    onClick={() => updateLogin((prev) => !prev)}
                  >
                    <p className=" text-xl underline underline-offset-2">
                      or, Create Account
                    </p>
                  </button>
                </div>
                <ul className="flex flex-col items-center mt-[1rem]">
                  <li className="flex items-center cursor-pointer">
                    <span
                      className="h-[1rem] aspect-square rounded-full"
                      style={{
                        background: `url(${facebook_logo}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></span>
                    <h4 className="ml-[0.5rem] font-semibold">
                      Sign in with Facebook
                    </h4>
                  </li>
                  <li className="flex items-center cursor-pointer mt-[1rem]">
                    <span
                      className="h-[1rem] aspect-square rounded-full"
                      style={{
                        background: `url(${google_logo}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></span>
                    <h4 className="ml-[0.5rem] font-semibold">
                      Sign in with Google
                    </h4>
                  </li>
                  <li className=" cursor-pointer mt-[1rem]">
                    <h4>Forgot Password</h4>
                  </li>
                </ul>
              </form>
            </section>
          )}
          {/* signup section */}
          {isLogin || (
            <section
              className="h-[100%] md:rounded-tr-none
       overflow-y-auto pb-10 md:rounded-br-none rounded-[1rem]  p-5 md:py-[6rem] py-[1.5rem] w-[100%] bg-slate-200 flex flex-col items-center text-start"
            >
              <div className="flex w-full justify-between items-center">
                <h1 style={{ alignSelf: "start" }} className="ml-[1rem]">
                  Create Account
                </h1>
                <span onClick={() => handleClick(false)} className="md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                      fill="#212529"
                    />
                  </svg>
                </span>
              </div>
              <form className=" [&>*]:flex z-10 [&>*]:py-1 w-full p-4">
                <div className="flex-col">
                  <div className="flex">
                    <input
                      autoFocus
                      tabIndex={1}
                      required={true}
                      id="r_first_name"
                      onChange={update_register_details}
                      placeholder="First name"
                      className="border-[1px] invalid:border-red-400 invalid:border-[1.5px] w-[80%] rounded-md py-2 pl-4 text-xl border-solid font-bold
            outline-none border-black bg-transparent"
                      type="text"
                      value={r_details.r_first_name}
                    />
                    <input
                      autoFocus
                      tabIndex={2}
                      required={true}
                      id="r_second_name"
                      onChange={update_register_details}
                      placeholder="Second name"
                      className="border-[1px] invalid:border-red-400 invalid:border-[1.5px] w-[80%] rounded-md py-2 pl-4 text-xl border-solid font-bold
            outline-none border-black bg-transparent"
                      type="text"
                      value={r_details.r_second_name}
                    />
                  </div>
                </div>
                <div className="relative flex-col">
                  <input
                    tabIndex={3}
                    required={true}
                    placeholder="Email"
                    className="border-[1px] invalid:border-red-500 invalid:border-[1.5px] rounded-md py-2 pl-4 text-xl border-thin font-bold
            outline-none border-black bg-transparent "
                    autoComplete="false"
                    type="text"
                    id="r_email"
                    value={r_details.r_email}
                    onChange={update_register_details}
                  />
                </div>
                <div className="relative flex-col">
                  <input
                    tabIndex={4}
                    required={true}
                    placeholder="password"
                    className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
            outline-none border-black bg-transparent "
                    autoComplete="false"
                    type={r_pass_visibility ? "text" : "password"}
                    id="pass"
                    onChange={update_register_details}
                    value={r_details.pass}
                  />
                  <span
                    onClick={() => update_r_pass_visib((prev) => !prev)}
                    className=" absolute bottom-[20%] cursor-pointer right-[0.5rem] material-symbols-outlined"
                  >
                    {r_pass_visibility ? "visibility" : "visibility_off"}
                  </span>
                </div>
                <div className="relative flex-col">
                  <input
                    onChange={handleConfPass}
                    tabIndex={5}
                    required={true}
                    value={r_details.confPass}
                    placeholder="confirm password"
                    className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
            outline-none border-black bg-transparent "
                    autoComplete="false"
                    type="password"
                    id="conf_pass"
                  />
                </div>
                <div className="md:flex-col flex-row justify-between  w-full items-center mt-4">
                  <button
                    type="submit"
                    tabIndex={6}
                    className="md:w-full w-[50%] hover:opacity-[0.9] bg-blue-600 rounded-full py-2 text-center font-bold text-xl text-white"
                  >
                    Create Account
                  </button>
                  <button
                    className="md:hidden"
                    onClick={() => updateLogin((prev) => !prev)}
                  >
                    <p className=" text-xl underline underline-offset-2">
                      or, SignIn
                    </p>
                  </button>
                </div>
                <ul className="flex flex-col items-center mt-[1rem]">
                  <li className="flex items-center cursor-pointer">
                    <span
                      className="h-[1rem] aspect-square rounded-full"
                      style={{
                        background: `url(${facebook_logo}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></span>
                    <h4 className="ml-[0.5rem] font-semibold">
                      Sign in with Facebook
                    </h4>
                  </li>
                  <li className="flex items-center cursor-pointer mt-[1rem]">
                    <span
                      className="h-[1rem] aspect-square rounded-full"
                      style={{
                        background: `url(${google_logo}) center no-repeat`,
                        backgroundSize: "contain",
                      }}
                    ></span>
                    <h4 className="ml-[0.5rem] font-semibold">
                      Sign in with Google
                    </h4>
                  </li>
                  <li className=" cursor-pointer mt-[1rem]">
                    <h4>Forgot Password</h4>
                  </li>
                </ul>
              </form>
            </section>
          )}
        </div>
        <div className=" md:flex hidden justify-center items-center bg-slate-200 h-full w-[50%] rounded-br-[1rem] rounded-tr-[1rem]  ">
          <div className="h-[80%] w-[100%] mt-[6rem] flex flex-col items-center">
            <h6>
              {isLogin
                ? "Don't have an account yet? "
                : "Already have a account?"}
              <span
                onClick={() => updateLogin((prev) => !prev)}
                className="text-blue-700 cursor-pointer"
              >
                {isLogin ? "Create new for free!" : "sign In"}
              </span>
            </h6>
            <img className="mt-[3rem]" src={SVGFile} alt="svg" />
            <span className="text-gray-600 text-sm w-full px-[1rem]">
              By signing up, you agree to our Terms & conditions, Privacy policy
            </span>
          </div>
        </div>
        <div
          onClick={() => handleClick(false)}
          className="md:block absolute hidden cursor-pointer top-[-1rem] scale-125 right-[-2rem]"
        >
          <span
            style={{ color: "black", background: "white" }}
            className="text-black rounded-full material-symbols-outlined"
          >
            cancel
          </span>
        </div>
      </div>
    </div>
  );
};

SignInUp.propTypes = {
  handleClick: PropTypes.func,
};
export default SignInUp;
