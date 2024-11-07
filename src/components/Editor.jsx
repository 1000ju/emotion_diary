import "./Editor.css";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";
//리스트로 관리하는 이유, 수정의 편리성을 위해 따로 빼두는 것
//<EmotionItem/>부분을 보면 중복 5줄이 map한 줄로 변경됨 -> map안에서 기능추가하고 수정하면 됨

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "createdDate") value = new Date(value);
    //왜냐면 e.target.value는 Date가 아니라 String형식이기 때문에
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSumbitButton = () => {
    onSubmit(input);
  };
  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        ></input>
      </section>

      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>

      <seciotn className="button_section">
        <Button text={"취소하기"} type={Button} onClick={() => nav(-1)} />
        <Button
          text={"작업완료"}
          type={"POSITIVE"}
          onClick={onClickSumbitButton}
        />
      </seciotn>
    </div>
  );
};

export default Editor;
