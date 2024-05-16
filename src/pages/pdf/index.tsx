import React, { useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { ButtonStyle } from "../../components/Button/Button.styles";
import FormStyle from "../../components/Form";
import LabelStyle from "../../components/Form/Label";
import InputStyle from "../../components/Form/Input";
import InputErrorStyle from "../../components/Form/InputError";
import TextareaStyle from "../../components/Form/Textarea";
import { useForm } from "react-hook-form";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface Props {
  name: string;
}

// Create Document Component
const MyDocument: React.FC<Props> = ({ name }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>#Name = {name}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2 - age</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #3</Text>
      </View>
    </Page>
  </Document>
);

interface IMyForm {
  name: string;
  picture: File;
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
    reset();
  };

  return (
    <>
      <h2>Fill form</h2>
      <form onSubmit={handleSubmit(saveElement)}>
        <input
          {...register("name", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 5,
              message: "Нужно больше символов",
            },
          })}
        />

        <div>{errors.name?.message}</div>
        <button type="submit">Сохранить</button>
      </form>
      {/* PDF document */}
      <h2>Your pdf</h2>
      <MyDocument name={task?.name || ""} />
      {/* Downloading PDF */}
      <h3>Download</h3>
      {/* Button download */}
      {task?.name && (
        <ButtonStyle type="primary">
          <PDFDownloadLink document={<MyDocument name={task.name} />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
          </PDFDownloadLink>
        </ButtonStyle>
      )}
    </>
  );
};

export default PdfPage;
