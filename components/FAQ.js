import {useState} from 'react';

const FAQ = ({ answer, question }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto w-full sm:w-1/2 md:w-2/3 border-2 small-rounded my-4">
      <button className="pointer text-2xl w-full block p-4 flex justify-between" onClick={() => setOpen(!open)}>
        <h1 className="text-white text-left"> {question}</h1>
        {open ? <p className="text-white my-auto">-</p> : <p className="text-white my-auto">+</p>}
      </button>
      {open && <div className="px-4 py-4">
        <p className="text-white my-auto">{answer}</p>
      </div>}
    </div>);
};

export default FAQ;