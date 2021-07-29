import Head from "next/head";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [processFiles, setProcessFiles] = useState(false);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("pdf", data.pdf[0]);
    formData.append("excel", data.excel[0]);
    const url = process.env.NODE_ENV != 'production' ? 'http://localhost:3005' : 'https://contra-cheque-r58j6.ondigitalocean.app:3005'; 
    try{
      const res = await fetch(url, {
        body: formData,
        method: "POST",
      });
  
      const response = await res.json();
      setProcessFiles(false);
      if (response.message) {
        alert(response.message);
      } else {
        alert("Houve uma falha ao enviar os emails");
      }
    }catch(err){
      console.log(err);
      alert("Houve uma falha ao enviar os emails");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="my-2 block mb-1 text-sm" htmlFor="pdf">
          Selecione o PDF
        </label>
        <input
          id="pdf"
          {...register("pdf", { required: true })}
          type="file"
          name="pdf"
          placeholder="Selecione o PDF"
          className="my-2 block border shadow-inner w-full text-gray-700 p-1 border-gray-400"
          required
        />
        <label className="my-2 block mb-1 text-sm" htmlFor="excel">
          Selecione o Excel
        </label>
        <input
          id="excel"
          name="excel"
          {...register("excel", { required: true })}
          placeholder="Selecione a planilha"
          type="file"
          className="my-2 block border shadow-inner w-full text-gray-700 p-1 border-gray-400"
          required
        />
        <button
          onClick={() => setProcessFiles(true)}
          type="submit"
          className={
            processFiles
              ? `hidden`
              : `my-2 bg-gray-200 text-gray-700 pr-8 pl-8 text-center text-sm hover:bg-gray-400 h-12 rounded-md flex align-center items-center`
          }
        >
          Enviar E-mails
        </button>
        <div
          disabled
          className={
            processFiles
              ? `my-2 bg-gray-200 text-gray-700 pr-8 pl-8 text-center text-sm hover:bg-gray-400 h-12 rounded-md flex align-center items-center`
              : `hidden`
          }
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Enviando Emails
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {}
