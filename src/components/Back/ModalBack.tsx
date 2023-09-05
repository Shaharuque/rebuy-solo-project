import { CgClose } from 'react-icons/cg';


interface ModalBackProps {
    handleCancel: () => void;
  }
const ModalBack:React.FC<ModalBackProps> = ({handleCancel}) => {
    return (
        <div className='flex justify-between mx-2 my-6'>
            <h1 className='text-[18px] text-[#FF5858] font-bold font-[cursive]'>ReeBuy</h1>
            <CgClose onClick={handleCancel} className='text-[20px] text-tcolor'></CgClose>
        </div>
    );
};

export default ModalBack;