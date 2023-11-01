import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function Previewpage() {
  let catagory = JSON.parse(window.localStorage.getItem("catagory"));
  let choze = JSON.parse(window.localStorage.getItem("choze"));
  let passage = JSON.parse(window.localStorage.getItem("passage"));
  let new_answers = [[]];

  if (catagory && typeof catagory !== "undefined" && catagory.answers) {
    catagory.answers.forEach((item, idx) => {
      new_answers[0].push({
        content: item.answer,
        id: item.id,
      });
    });
    catagory.catagories.forEach(() => {
      new_answers.push([]);
    });
  }
  const [state, setState] = useState(new_answers);
  const catagories = ["answers"];

  if (catagory && typeof catagory !== "undefined" && catagory.catagories) {
    catagory.catagories.forEach((element) => {
      catagories.push(element.value);
    });
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      // setState(newState.filter((group) => group.length));
      setState(newState);
    }
  }

  return (
    <>
      <div
        className="grid p-4 gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill , minmax(500px , 0.8fr))",
        }}
      >
        {/* catagorise questions */}
        <section className="text-center border-2 border-dashed border-purple-400 p-4">
          <h2>CATAGORY QUESTIONS</h2>
          <div>
            <div
              className="border-2 border-purple-700 border-solid"
              style={{ display: "flex" }}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                {catagories.map((el, ind) => (
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div
                        style={{ minHeight: "5rem" }}
                        className=" p-4 rounded w-fit border-2 border-red-700 border-solid"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h3 className="mb-4">{catagories[ind]}</h3>
                        {state[ind].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className=" border-2 border-solid border-purple-400 rounded p-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  {item.content}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
          </div>
        </section>

        {/* chose questions */}
        <section className="text-center border-2 border-dashed border-purple-400 p-4">
          <h2>CHOZE</h2>
          <div>
            {choze.map((item, idx) => (
              <div className="text-start" key={idx}>
                <h3>
                  Q{idx + 1} {item.question}
                </h3>
                <ul>
                  {item.options.map((el, index) => (
                    <li>{el.value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* passage questions */}
        <section className="text-center border-2 border-dashed border-purple-400 p-4">
          <h2>PASSAGE</h2>
          <p>{passage.passage}</p>

          <div className="mt-4">
            <ul className="text-start space-y-4  list-disc list-inside text-black">
              {passage.questions.length !== 0 ? (
                passage.questions.map((item, idx) => (
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
          </div>
        </section>
      </div>
    </>
  );
}

export default Previewpage;
