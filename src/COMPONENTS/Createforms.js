import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Createforms() {
  const [current_options, update_current_option] = useState([]);

  const [new_question, update_question] = useState("");
  const [generated_questions, add_final_questions] = useState([]);

  function getSelectedText(e) {
    let txt;
    if (window.getSelection) {
      txt = window.getSelection();
    } else if (window.document.getSelection) {
      txt = window.document.getSelection();
    } else if (window.document.selection) {
      txt = window.document.selection.createRange().text;
    }
    let start =
      txt.anchorOffset < txt.extentOffset ? txt.anchorOffset : txt.extentOffset;
    let end =
      txt.anchorOffset > txt.extentOffset ? txt.anchorOffset : txt.extentOffset;
    let word = "";
    let whole_word = e.target.innerText;

    for (let i = start; i < end; i++) {
      word += whole_word[i];
    }
    if (word !== "") {
      update_question(() => whole_word.replace(word.trim(), `_____`));
      console.log(word, new_question);
      update_current_option(() => {
        let new_array = [...current_options];
        new_array.push({
          id: "item-" + Math.floor(Math.random() * 400000),
          value: word.trim(),
        });
        return new_array;
      });
    }
  }

  function delete_option(index) {
    update_current_option(() => {
      let new_array = [...current_options];
      new_array.pop(index);
      return new_array;
    });
  }

  function update_final_questions() {
    add_final_questions(() => {
      return [
        ...generated_questions,
        {
          question: new_question,
          options: [...current_options],
        },
      ];
    });
    update_current_option(() => {
      return [];
    });
    update_question(() => "");
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  function submit() {
    window.localStorage.setItem("choze", JSON.stringify(generated_questions));
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      current_options,
      result.source.index,
      result.destination.index
    );
    update_current_option(items);
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
        <div className="flex  flex-col border-solid border-2 border-teal-200 ">
          <button className="p-5 rounded w-fill mb-3 bg-sky-500 ">CHOSE</button>
          <button className="p-5 rounded w-fill mb-3 bg-pink-500 ">
            CATEGORY
          </button>
          <button className="p-5 rounded w-fill mb-3 bg-green-500 ">
            PASSAGE
          </button>
        </div>

        <div className="main_box flex pl-2 flex-col border-solid border-2 border-red-400">
          {/* this will be our editable question */}
          <div className="flex items-center p-5">
            <h3 className="pr-3 font-bold ">Q:- </h3>
            <p
              className="outline-none shadow-sm p-1 pl-4  mt-3 w-10/12 border-solid border-b-2 border-sky-400"
              type="text"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onMouseUp={(e) => getSelectedText(e)}
            >
              {new_question}
            </p>
          </div>

          <div className="ml-5 flex w-10/12 items-center ">
            <div className="options  w-4/5  border-2 border-dashed border-purple-400 ">
              <h4 className="font-bold">Options</h4>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      className="dropable_box h-4/5 option_items px-3 py-2 gap-2 flex max-w-2xl"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {current_options.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="opt py-1 px-3 rounded bg-slate-500 relative "
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span
                                onClick={() => {
                                  delete_option(index);
                                }}
                                className=" cursor-pointer absolute h-4 w-4 grid content-center justify-center -top-1 -right-1 bg-red-500 rounded-full  "
                              >
                                x
                              </span>
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
            </div>

            <button
              onClick={update_final_questions}
              className="bg-purple-500 w-1/10 h-fit p-2 rounded text-white"
            >
              ADD
            </button>
          </div>

          {/*-------------------- the generated questions ------------- */}
          <div className="w-4/5 mt-10 overflow-x-hidden py-2 px-3 overflow-y-auto self-center h-80 border-2 border-solid border-sky-800">
            {generated_questions.map((item, idx) => {
              return (
                <div className="mb-2 questions_preview w-4/5 " key={idx}>
                  <h3>
                    <b>Q{idx + 1}:</b> {item.question}
                  </h3>
                  <div className="mt-1 w-full overflow-x-auto overflow-y-hidden gap-1.5 border-2 border-dashed border-purple-500 Options_preview ml-5 p-1 flex">
                    {item.options.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="opt py-1 px-3 rounded bg-slate-500 relative w-fit "
                        >
                          {item.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div onClick={submit} className="absolute right-8 bottom-1/4 ">
          <button className="px-8 py-4 bg-purple-500 rounded ">SAVE</button>
        </div>
      </div>
    </>
  );
}

export default Createforms;
