import { useUserContext } from "../context/Context";
import { useState, useRef } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Navigate } from 'react-router-dom';

const Withdraw = () => {
  const { updateUserBalance, userLogIn } = useUserContext();
  const withdraw = useRef('');
  const [modal, setModal] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [error, setError] = useState(null);

  function validate(){
      if (!(/^[1-9]+/.test(withdraw.current.value))) {
      setError('Please enter a number in the field ');
      setTimeout(() => {
      setError(null)
      }, 2500);
      return false
      }
      return true;
    }
  
  function validateAmountChange(newBalance){
    if(newBalance <= 0 ){
      setError(`Insufficient funds. Please lower withdrawal amount. Current balance is $  ${userLogIn.balance}`);
      setTimeout(() => {
      setError(null)
    }, 4000);
    return false
  }
    return true;
  }

  function handleAmountChange(e){
    e.preventDefault();
    if(!validate()) return 
    let newBalance = userLogIn.balance - Number(withdraw.current.value);
    if(!validateAmountChange(newBalance)) return;
    setEnabled(true);
    updateUserBalance(userLogIn.id, newBalance);
    setModal(true);
  }

  const clearForm = () => {
    withdraw.current.value = '';
    setError(null)
    }

  function closeModal(){
    setModal(false);
    clearForm();
  }

  return(
    <>
    {userLogIn?
    <Card
    bgcolor="success"
    header="Withdraw Funds"
    txtcolor="light"
    body={(
      <>
      <p>{`Your current balance is: $${userLogIn.balance}`}</p>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleAmountChange}>
      <div className="col-12 position-relative">
      <label htmlFor="withdraw" className="form-label">Withdraw Amount</label>
      <input type="text" className={error ? "form-control is-invalid" : "form-control"} id="withdraw"
      ref={withdraw} aria-describedby="validationFeedback" required 
      onChange={() => withdraw.current.value ? setEnabled(false) : setEnabled(true)} />
      <div id="validationFeedback" className="invalid-tooltip">{error}</div>
      </div>
        <div className="col-12">
        <button type="submit" className="btn btn-light" 
        disabled={isEnabled}>Withdraw</button>
        </div>
      </form>
      {modal?<Modal title="Successful" text={`You have withdrew $ ${withdraw.current.value}`} 
      btncolor="success" btntext="Enter" event={closeModal} /> : <> </> } 
      </>
    )}
    />
    :<Navigate to="/login"/>}
    </>
  )
}
export default Withdraw;