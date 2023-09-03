import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function FeedbackForm() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("${process.env.REACT_APP_Api_URL}/feedback", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })
      .then(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setAlertMsg(
          "Awesome! Your feedback has been successfully submitted. Thank you for sharing your thoughts with us!"
        );
        setAlert(true);
        setShowModal(false);
      })
      .catch(() => {
        setAlertMsg(
          "Oops! Something went wrong. Don't worry, let's give it another shot."
        );
        setAlert(true);
      });
  };

  return (
    <>
      {alert && (
        <div style={{ marginTop: "20px" }}>
          <Alert
            severity={
              alertMsg ===
              "Oops! Something went wrong. Don't worry, let's give it another shot."
                ? "error"
                : "success"
            }
            onClose={() => {
              setAlert(false);
            }}
          >
            {alertMsg}
          </Alert>
        </div>
      )}
      <button
        className="font-Poppins text-sm bg-gradient-to-tr from-purple-600 to-pink-600 text-white p-3 rounded-md block mx-auto mt-10 hover:shadow-lg hover:shadow-purple-900 before:ease-linear transition-all duration-150"
        onClick={() => setShowModal(true)}
      >
        Got something to say?
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-Poppins ">Write to us!</h3>
                  <button
                    className="text-slate-400 background-transparent font-Raleway text-sm ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                <p className="mt-2 text-slate-500 text-sm">
                  Share your thoughts and help us improve! We value your
                  feedback and appreciate your input.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col mt-7 gap-3"
                >
                  <label htmlFor="name" className="font-Raleway text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />

                  <label htmlFor="email" className="font-Raleway text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />

                  <label
                    htmlFor="message"
                    className="font-Raleway text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
