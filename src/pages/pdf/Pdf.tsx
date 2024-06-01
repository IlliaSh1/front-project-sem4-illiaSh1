import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ButtonStyle } from "../../components/Button/Button.styles";
import FormStyle from "../../components/Form/Form.styles";
import LabelStyle from "../../components/Form/Label";
import InputStyle from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import MyDocument from "./MyDocument";

interface IMyForm {
  name: string;
  picture: FileList;
}

const PdfPage = () => {
  const [task, setTask] = useState<IMyForm>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const saveElement = (data: IMyForm) => {
    setTask(data);
    // reset();
  };

  return (
    <>
      <h2>Fill form</h2>
      <FormStyle onSubmit={handleSubmit(saveElement)}>
        <LabelStyle>
          <span>Имя</span>
          <InputStyle
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 5,
                message: "Нужно больше символов",
              },
            })}
          />
        </LabelStyle>
        <LabelStyle>
          <span>Изображение</span>
          <InputStyle
            type="file"
            accept="image/*"
            {...register("picture", {
              required: "Required",
            })}
          />
        </LabelStyle>

        <div>{errors.name?.message}</div>
        <button type="submit">Сохранить</button>
      </FormStyle>
      {/* PDF document */}
      <h2>Your pdf</h2>
      {task?.name && task?.picture ? <MyDocument name={task?.name ?? ""} picture={task?.picture} /> : <></>}

      {/* Downloading PDF */}
      <h3>Download</h3>
      {/* Button download */}
      {task?.name && (
        <ButtonStyle disabled={!task?.name || !task?.picture} type="primary">
          <PDFDownloadLink
            document={<MyDocument name={task.name} picture={task.picture} />}
            fileName="generate_example.pdf"
          >
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
          </PDFDownloadLink>
        </ButtonStyle>
      )}
    </>
  );
};

export default PdfPage;
