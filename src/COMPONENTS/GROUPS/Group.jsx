import { PropTypes } from "prop-types";

const Group = ({ data, handleClick }) => {
  return (
    <div className="mt-[0.5rem] items-center w-full grid grid-cols-2  px-[0.5rem] pr-[2rem]">
      <div className="flex items-center">
        <span
          style={{
            background: `url(${data.image})center no-repeat`,
            backgroundSize: "cover",
          }}
          className="h-[4rem] aspect-square  rounded-full"
        ></span>
        <p className="text-[1.2rem] ml-[0.75rem]">{data.name}</p>
      </div>
      {data.followed ? (
        <button
          className=" rounded-full max-h-[2rem] py-[0.25rem] px-[1rem] bg-slate-400 "
          style={{ justifySelf: "flex-end" }}
          onClick={() => {
            handleClick(data.id);
          }}
        >
          Followed
        </button>
      ) : (
        <button
          className=" rounded-full max-h-[2rem] py-[0.25rem] px-[1rem] bg-slate-200"
          style={{ justifySelf: "flex-end" }}
          onClick={() => {
            handleClick(data.id);
          }}
        >
          Follow
        </button>
      )}
      <button></button>
    </div>
  );
};
Group.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
};
export default Group;
