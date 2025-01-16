import * as Yup from "yup";

const validationSchema = {
  // Add Book Schema's
  AddBookSchema: Yup.object({
    bookUrl: Yup.string()
      .url("Enter a valid URL")
      .required("Book URL is required"),
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
    copies: Yup.number()
      .positive("Enter a positive number")
      .integer("Enter a valid number")
      .required("Number of copies is required"),
    author: Yup.string().required("Author name is required"),
    language: Yup.string().required("Language is required"),
  }),
};
export default validationSchema;
