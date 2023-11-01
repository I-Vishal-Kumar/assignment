import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Categoryquestions() {
  const [answers, update_answers] = useState([]);
  const [catagories, update_catagories] = useState([]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      answers,
      result.source.index,
      result.destination.index
    );
    update_answers(items);
  }

  function catagoryDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      catagories,
      result.source.index,
      result.destination.index
    );
    update_catagories(items);
  }

  function delete_answer(id) {
    let new_array = answers.filter((item) => {
      return item.id !== id;
    });
    update_answers(new_array);
  }

  function add_catagory() {
    let random_colors = [
      "bg-pink-300",
      "bg-teel-300",
      "bg-sky-300",
      "bg-green-300",
      "bg-purple-300",
    ];
    let value = document.querySelector("#catagory_input").value;
    let new_array = Array.from(catagories);
    new_array.push({
      id: `catagory-${Math.floor(Math.random() * 100)}`,
      value: value,
      color: random_colors[Math.floor(Math.random() * random_colors.length)],
      selected: false,
    });
    document.querySelector("#catagory_input").value = "";
    update_catagories(new_array);
  }

  function create_answer() {
    let input_answer = document.querySelector("#answer_input").value;
    let selected_values = catagories.filter((item) => {
      return item.selected === true;
    });
    selected_values = selected_values[0];
    if (!selected_values || typeof selected_values === "undefined") {
      alert("catagory not selected");
      return;
    }
    let answer_array = Array.from(answers);
    answer_array.push({
      answer: input_answer,
      catagory: selected_values.value,
      color: selected_values.color,
      id: `item-${Math.floor(Math.random() * 100)}`,
    });

    update_answers(answer_array);
    let removing_selected = Array.from(catagories);
    removing_selected.forEach((item) => {
      item.selected = false;
    });
    update_catagories(removing_selected);
    document.querySelector("#answer_input").value = "";
  }

  function select_ans_catagory(idx) {
    let updated_array = Array.from(catagories);
    updated_array.forEach((item, idx) => {
      item.selected = false;
    });
    updated_array[idx].selected = true;
    update_catagories(updated_array);
  }

  function submit() {
    window.localStorage.setItem(
      "catagory",
      JSON.stringify({
        catagories: catagories,
        answers: answers,
      })
    );
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
          <button className="p-5 rounded w-fill mb-3 bg-sky-500 ">CHOSE</button>
          <button className="p-5 rounded w-fill mb-3 bg-pink-500 ">
            CATEGORY
          </button>
          <button className="p-5 rounded w-fill mb-3 bg-green-500 ">
            PASSAGE
          </button>
        </div>
        <div>
          <section className="flex border-2 border-solid border-red-400 items-center justify-center">
            <input
              id="catagory_input"
              className=" border-b-2 border-black px-3 mr-4 "
              placeholder="Enter name of catagory"
            ></input>
            <button
              onClick={(e) => add_catagory()}
              className="w-2/12 h-10 border-2 bg-purple-500 rounded"
            >
              Add
            </button>
          </section>
          <section className="flex justify-center mt-2">
            <DragDropContext onDragEnd={catagoryDragEnd}>
              <Droppable droppableId="droppable" direction="both">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      gridTemplateColumn:
                        "repeat(auto-fill , minmax(370px , 0.8fr))",
                    }}
                    className="category_addbox w-4/5 p-2 gap-2 max-w-3xl border-solid border-2 border-green-500 grid grid-cols-3"
                  >
                    {catagories.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={
                              "p-2 pb-10 text-center  rounded gap-2 " +
                              item.color
                            }
                          >
                            {item.value}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>

          {/* this section contains input section for answers */}
          <section className="mt-4 p-4  grid grid-cols-1">
            <b>Add answers</b>
            <h3>Add answers one by one.</h3>

            <div className="flex">
              <input
                id="answer_input"
                style={{ flex: 3 }}
                className="mt-2 max-h-10 py-2 px-4 outline-none shadow-md bg-slate-100 "
                placeholder="Enter answer"
              ></input>
              <div
                className="p-4 grid gap-2"
                style={{
                  flex: 2,
                  gridTemplateColumns:
                    "repeat(auto-fill , minmax(100px , 0.8fr))",
                }}
              >
                {catagories.map((item, idx) => {
                  return (
                    <div
                      onClick={() => select_ans_catagory(idx)}
                      key={idx}
                      className={
                        item.selected === true
                          ? `${item.color} rounded  py-2 px-4 border-2 border-dashed border-purple-500`
                          : `${item.color} rounded  py-2 px-4`
                      }
                    >
                      {item.value}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                create_answer();
              }}
              className="justify-self-center rounded bg-purple-500 px-4 py-2"
            >
              Add
            </button>
          </section>

          {/* here we can see the preview of our answers */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="both">
              {(provided, snapshot) => (
                <section
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill , minmax(300px , 1fr))",
                  }}
                  className="p-4 grid gap-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {answers.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="flex bg-slate-200 items-center px-2 pr-0 shadow-sm "
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="flex-1">{item.answer}</div>
                          <div
                            style={{ minWidth: "7rem" }}
                            className={
                              " text-center rounded px-4 py-2 " + item.color
                            }
                          >
                            {item.catagory}
                          </div>
                          <button
                            onClick={() => delete_answer(item.id)}
                            className="p-2 bg-red-200 rounded ml-2"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div onClick={submit} className="absolute right-8 bottom-1/4 ">
          <button className="px-8 py-4 bg-purple-500 rounded ">SAVE</button>
        </div>
      </div>
    </>
  );
}

export default Categoryquestions;
