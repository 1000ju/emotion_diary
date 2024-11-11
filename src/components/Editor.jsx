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

  // 얘 뭐하는 기능이지??? -> Edit에서 저장된 기록 불러오기 기능
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    //Date, emotion, content 입력을 받는 이벤트 핸들러
    //name이 있는 이유는 어떤 이벤트가 발생했는지 알기 위해서 (input태그에 name으로 등록해둠)
    let name = e.target.name;
    let value = e.target.value;
    if (name === "createdDate") value = new Date(value);
    //왜냐면 e.target.value는 Date가 아니라 String형식이기 때문에
    setInput({
      ...input,
      [name]: value,
      //name === "createdDate"
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
          //input.createdDate의 초기값이 오늘 날짜
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
                    //why 왜 target으로 묶어서 계산??
                  },
                })
              }
              //EmotionItem은 button, input이 아니라 컴포넌트를 나열해둔 것이기 때문에 의도적으로 이벤트를 발생시켜야 함
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
              //emotion바뀌는 코드 원리 이해가 조금 부족
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

      <section className="button_section">
        <Button text={"취소하기"} type={Button} onClick={() => nav(-1)} />
        <Button
          text={"작업완료"}
          type={"POSITIVE"}
          onClick={onClickSumbitButton}
        />
      </section>
    </div>
  );
};

export default Editor;
