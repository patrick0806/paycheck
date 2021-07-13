import Head from "next/head";
import {useForm} from "react-hook-form";

export default function Home() {
  const {register, handleSubmit} = useForm();
  const onSubmit = async (data) =>{

    const formData = new FormData();
    formData.append("pdf",data.pdf[0]);
    formData.append("excel",data.excel[0]);
    
    const res = await fetch(
      'http://localhost:3005',
      {
        body: formData,
        method: 'POST'
      }
    )

    const response = await res.json();
    if(response.message){
      alert(response.message);
    }else{
      alert("Houve uma falha ao enviar os emails");
    }

  }

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="my-2 block mb-1 text-sm" htmlFor="pdf">
          Selecione o PDF
        </label>
        <input
          id="pdf"
        {...register('pdf',{required:true})}
          type="file"
          name="pdf"
          className="my-2 block border shadow-inner w-full text-gray-700 p-1 border-gray-400"
          required
        />
        <label className="my-2 block mb-1 text-sm" htmlFor="excel">
          Selecione o Excel
        </label>
        <input
          id="excel"
          name="excel"
          {...register('excel',{required:true})}
          type="file"
          className="my-2 block border shadow-inner w-full text-gray-700 p-1 border-gray-400"
          required
        />
        <button
          type="submit"
          className="my-2 bg-gray-200 text-gray-700 pr-8 pl-8 text-sm hover:bg-gray-400 h-12 rounded-md align-bottom"
        >
          Enviar E-mails
        </button>
      </form>
    </div>
  );
}