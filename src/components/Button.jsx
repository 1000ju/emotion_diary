import "./Button.css";

const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button_${type}`}>
      {text}
    </button>
  );
};
//공통 버튼의 스타일이 3가지, 동적으로 className을 변경되도록 하면서 버튼 type을 바꿈

export default Button;
