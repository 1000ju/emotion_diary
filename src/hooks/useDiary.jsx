import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다");
      nav("/", { replace: true });
      //12.15 17분
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id, data]);
  // currentDiaryItem을 쓰면 되지 않나?? 왜 굳이 setCurDiaryItem을 사용해야하는 거지???
  // useEffect를 사용하는 이유 -> deps의 변화를 통해 콜백함수를 다시 실행할 수 있기 때문

  return curDiaryItem;
};

export default useDiary;
