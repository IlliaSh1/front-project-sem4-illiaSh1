import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface DocumentProps {
  name: string;
  picture: FileList;
}

// Create Document Component
const MyDocument: React.FC<DocumentProps> = ({ name, picture }: DocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>#Name = {name}</Text>
      </View>
      <View style={styles.section}>{picture && <Image source={picture[0]} />}</View>
    </Page>
  </Document>
);

export default MyDocument;
