import PropTypes from "prop-types";
import share_svg from "../ASSETS/share_svg.svg";
import location_svg from "../ASSETS/location_svg.svg";
import calander_svg from "../ASSETS/calander_svg.svg";
const Cards = ({ cards_data }) => {
  return (
    <div
      style={{ gridTemplateRows: "1fr 1fr" }}
      className="grid w-full py-[0.5rem] px-[1rem] pb-[1rem]"
    >
      {cards_data?.image && (
        <div
          style={{
            background: `url(${cards_data?.image})center no-repeat`,
            backgroundSize: "cover",
          }}
          className="h-full w-full"
        ></div>
      )}

      <div className="h-full w-full flex flex-col items-center">
        <div className="w-full py-[0.15rem] mt-[0.5rem]">
          <h2>{cards_data?.genere || "✍️ Article"}</h2>
        </div>
        <div className="w-[95%]">
          <div className="flex">
            <h3 className="w-[90%]">
              {cards_data?.heading || "not available"}
            </h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M18.6666 14C18.6666 15.2834 19.7166 16.3334 20.9999 16.3334C22.2833 16.3334 23.3333 15.2834 23.3333 14C23.3333 12.7167 22.2833 11.6667 20.9999 11.6667C19.7166 11.6667 18.6666 12.7167 18.6666 14ZM16.3333 14C16.3333 12.7167 15.2833 11.6667 13.9999 11.6667C12.7166 11.6667 11.6666 12.7167 11.6666 14C11.6666 15.2834 12.7166 16.3334 13.9999 16.3334C15.2833 16.3334 16.3333 15.2834 16.3333 14ZM9.33325 14C9.33325 12.7167 8.28325 11.6667 6.99992 11.6667C5.71659 11.6667 4.66659 12.7167 4.66659 14C4.66659 15.2834 5.71658 16.3334 6.99992 16.3334C8.28325 16.3334 9.33325 15.2834 9.33325 14Z"
                  fill="#212529"
                />
              </svg>
            </span>
          </div>
        </div>

        {(cards_data.type === "meetup" || cards_data.type === "job") && (
          <button
            style={{ margin: "0.5rem auto" }}
            className={
              (cards_data.type === "job"
                ? "text-[#02B875]"
                : "text-[#E56135]") +
              " cursor-pointer border-[1px] border-solid border-gray-600 rounded-[0.5rem] text-center w-[95%] py-[0.5rem] font-semibold"
            }
          >
            {cards_data.button_text}
          </button>
        )}
        <div className="py-[1rem] w-[95%] overflow-y-hidden">
          {cards_data.type !== "meetup" ? (
            <span className=" whitespace-nowrap overflow-y-hidden">
              {cards_data?.subheading ||
                "I've worked in UX for the better part of a decade. F.."}
            </span>
          ) : (
            <span className="flex justify-between">
              <span className="flex">
                <img src={calander_svg} alt="" /> Fri,12Oct,2018
              </span>
              <span className="flex">
                <img src={location_svg} alt="" />
                Ahmedabad,India
              </span>
            </span>
          )}
        </div>
        {/* avatar section */}
        <div className="flex justify-between w-[95%] items-center pt-[1rem] pr-[1.25rem]">
          <div className="flex justify-between items-center">
            <span
              style={{
                background: `url(${cards_data?.profile_image}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[3rem] aspect-square rounded-full "
            >
              x
            </span>
            <div className="ml-[0.7rem]">
              <h3>{cards_data?.name || "no name"}</h3>
              <h6>{cards_data?.views || 0}k views</h6>
            </div>
          </div>
          <div className="flex">
            <img src={share_svg} alt="share" />
            <span className="ml-[0.7rem]">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  cards_data: PropTypes.object,
};

export default Cards;
