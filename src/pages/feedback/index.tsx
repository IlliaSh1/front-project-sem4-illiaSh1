import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthContext from "../../context/authContext";
import { ButtonStyle } from "../../components/Button";
import FormStyle from "../../components/Form";
import LabelStyle from "../../components/Form/Label";
import InputStyle from "../../components/Form/Input";
import InputErrorStyle from "../../components/Form/InputError";
import TextareaStyle from "../../components/Form/Textarea";
import { ListStyle } from "../../components/List";
import CardStyle from "../../components/Card";

interface IMyForm {
  title: string;
  text: string;
}

function Feedbacks() {
  let { user } = useContext(AuthContext);

  const {
    register, // метод для регистрации вашего инпута, для дальнейшей работы с ним
    handleSubmit, // метод для получения данных формы, если валидация прошла успешна
    formState: { errors, isValid }, // errors - список ошибок валидации для всех полей формы
    reset, // метод для очистки полей формы
  } = useForm<IMyForm>({
    mode: "onBlur", // парметр onBlur - отвечает за запуск валидации при не активном состоянии поля
  });

  const [feedbacks, setFeedbacks] = useState<IMyForm[]>([]);

  const saveElement: SubmitHandler<IMyForm> = (data) => {
    // здесь мы передаём новый массив, который содержит все старые элементы и новый
    // ...prev - мы получаем все элементы текущего стэйте (с помощью spread оператора)
    setFeedbacks((prev: any) => [...prev, data]);
    reset();
  };

  return (
    <div className="Notes">
      <h2>Оставить отзыв</h2>
      <FormStyle onSubmit={handleSubmit(saveElement)}>
        <LabelStyle>
          <span>Заголовок</span>
          <InputStyle
            placeholder="Заголовок"
            {...register("title", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 5,
                message: `Нужно больше символов, ${user ? user.username : "Guest"}, будь осторожнее`,
              },
            })}
          />
          <InputErrorStyle>{errors.title?.message}</InputErrorStyle>
        </LabelStyle>
        <LabelStyle>
          <span>Описание</span>
          <TextareaStyle
            placeholder="Текст"
            rows={3}
            {...register("text", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 10,
                message: "Нужно больше символов",
              },
            })}
          />
          <InputErrorStyle>{errors.text?.message}</InputErrorStyle>
        </LabelStyle>
        <ButtonStyle htmlType="submit" disabled={!isValid}>
          Отправить
        </ButtonStyle>
      </FormStyle>

      <h3>Мои отзывы</h3>

      <ListStyle>
        {feedbacks.map((feedback, index) => (
          <li key={index}>
            <CardStyle title={<h4>{feedback.title}</h4>} style={{ width: 300 }}>
              <p>{feedback.text}</p>
            </CardStyle>
          </li>
        ))}
      </ListStyle>
    </div>
  );
}

export default Feedbacks;
