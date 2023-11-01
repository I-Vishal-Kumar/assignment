import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function Passage() {
  const [choice, update_choice] = useState([
    {
      value: "",
      id: "item-0",
    },
  ]);
  const [file_url, change_file] = useState("");
  const [questions, update_questions] = useState([]);

  function new_image(file) {
    let url = URL.createObjectURL(file);
    change_file(() => url);
  }

  function submit() {
    let passage = document.querySelector("#message").value;
    window.localStorage.setItem(
      "passage",
      JSON.stringify({
        passage: passage,
        questions: questions,
      })
    );
    alert("saved");
    window.location.href = window.location.origin + "/preview";
  }

  function add_more_choice() {
    let array = Array.from(choice);
    array.push({ value: "", id: `item-${Math.floor(Math.random() * 100)}` });
    update_choice(array);
  }

  function update_values(value, idx) {
    let new_array = Array.from(choice);
    new_array[idx].value = value;
    update_choice(new_array);
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragend(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      choice,
      result.source.index,
      result.destination.index
    );

    update_choice(items);
  }

  function delete_choice(idx) {
    let new_array = choice.filter((item, index) => index !== idx);
    update_choice(new_array);
  }

  function create_question() {
    let new_questions = Array.from(questions);
    let question = document.querySelector("#question").value;
    if (!question || typeof question === "undefined") {
      alert("add the question first");
    } else if (choice.length < 1) {
      alert("add some choices !!");
      return;
    } else {
      let question_choice = [];
      choice.forEach((item) => {
        question_choice.push(item.value);
      });
      new_questions.push({
        question: question,
        choices: question_choice,
      });
    }
    update_questions(new_questions);
    document.querySelector("#question").value = "";
    update_choice([]);
  }

  return (
    <>
      <div
        style={{
          gridTemplateColumns: "0.5fr 2fr",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
        className="relative w-screen sidebar grid p-2 h-screen"
      >
        {/* this section will provide the preview of the categories */}
        <div className="flex  flex-col border-solid border-2 border-teal-200 ">
          <a href="/" className="p-5 rounded w-fill mb-3 bg-sky-500 ">
            CHOSE
          </a>
          <a href="/catagory" className="p-5 rounded w-fill mb-3 bg-pink-500 ">
            CATEGORY
          </a>
          <a href="/passage" className="p-5 rounded w-fill mb-3 bg-green-500 ">
            PASSAGE
          </a>
        </div>
        <div>
          {/* choose photos section */}
          <section className="p-4 justify-self-center flex justify-center items-center w-1/2">
            <img
              className="h-20 w-20 rounded-full "
              alt="default"
              src={file_url}
            ></img>

            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Upload image
            </label>
            <input
              onChange={(e) => {
                new_image(e.target.files[0]);
              }}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
              id="multiple_files"
              type="file"
            />
          </section>

          {/* create the passage */}
          <section>
            <label className="block mb-2 text-sm font-medium text-gray-900 "></label>
            <textarea
              id="message"
              style={{ minWidth: "min(80vw , 600px)" }}
              rows="10"
              className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the paragraph....."
            ></textarea>

            <div className="w-fit grid">
              <label className="block mt-4 mb-2 text-sm font-medium text-gray-900 ">
                Enter your question:-
              </label>

              <input
                id="question"
                className="px-4 mb-2 py-2 mt-5 outline-none"
                type="text"
                placeholder="Enter your question"
              ></input>
              <div
                className="ml-8 rounded p-2"
                style={{
                  width: "min(500px , 80vw)",
                  border: "2px dashed purple",
                }}
              >
                <DragDropContext onDragEnd={onDragend}>
                  <Droppable droppableId="droppable" direction="verticle">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {choice.map((item, idx) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={idx}
                            >
                              {(provided, snap) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex mb-2"
                                  key={idx}
                                >
                                  <h4 className="pr-4 pl-2">{idx + 1}.</h4>
                                  <input
                                    onChange={(e) =>
                                      update_values(e.target.value, idx)
                                    }
                                    value={item.value}
                                    className="w-full mb-2 outline-none"
                                    placeholder="Enter choice...."
                                  ></input>
                                  <button
                                    onClick={() => {
                                      delete_choice(idx);
                                    }}
                                    className="bg-red-400 px-4 py-1 rounded"
                                  >
                                    X
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <button
                  onClick={() => add_more_choice()}
                  className="w-full mt-2 px-4 py-2 text-center rounded bg-green-500"
                >
                  Add More
                </button>
              </div>
              <button
                onClick={create_question}
                className="mt-4 justify-self-center rounded px-4 py-2 bg-purple-500"
              >
                Next qustion
              </button>
            </div>
          </section>

          {/* question's preview */}
          <section className=" border-2 border-dashed border-purple-300 mt-4 pb-10 pl-4">
            <ul className="space-y-4  list-disc list-inside text-black">
              {questions.length !== 0 ? (
                questions.map((item, idx) => (
                  <li key={idx}>
                    {item.question}
                    <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                      {item.choices.map((ch) => (
                        <li>{ch}</li>
                      ))}
                    </ol>
                  </li>
                ))
              ) : (
                <h2>Add some questions for preview</h2>
              )}
            </ul>
          </section>
        </div>
        <div onClick={submit} className="absolute right-8 bottom-1/4 ">
          <button className="px-8 py-4 bg-purple-500 rounded ">SAVE</button>
        </div>
      </div>
    </>
  );
}

export default Passage;
