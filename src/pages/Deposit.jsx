import { useUserContext } from "../context/Context";
import { useState, useRef } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Navigate } from 'react-router-dom';

const Deposit = () => {
  const { updateUserBalance, userLogIn } = useUserContext();
  const deposit = useRef('');
  const [modal, setModal] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [error, setError] = useState(null);

  function validate () {
      if (deposit.current.value === '') {
      setError('  You can only deposit a positive amount. Please try again.');
      setTimeout(() => {
      setError(null)
      }, 2500);
      return false
      }
    if (!(/^[0-9]+$/.test(deposit.current.value))) {
      setError('You must type a number. Please try again. ');
      setTimeout(() => {
      setError(null)
      }, 2500);
      return false
      }
      return true;
    }
  
  function handleAmountChange(e){
    e.preventDefault();
    if(!validate()) return 
    setEnabled(true);
    let newBalance = userLogIn.balance + Number(deposit.current.value);
    updateUserBalance(userLogIn.id, newBalance);
    setModal(true);
  }

  const clearForm = () => {
    deposit.current.value = '';
    setError(null)
    isEnabled(true)
    }

  function closeModal(){
    setModal(false)
    clearForm()
  }

  return(
    <>
    {userLogIn?
    <Card
    bgcolor="success"
    header="Deposit"
    txtcolor="light"
    body={(
      <>
      <p>{`Your current balance is: $${userLogIn.balance}`}</p>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleAmountChange}>
      <div className="col-12 position-relative">
      <label htmlFor="deposit" className="form-label">Deposit Amount</label>
      <input type="text" className={error ? "form-control is-invalid" : "form-control"} id="deposit"
      ref={deposit} aria-describedby="validationFeedback" required 
      onChange={() => deposit.current.value ? setEnabled(false) : setEnabled(true)} />
      <div id="validationFeedback" className="invalid-tooltip">{error}</div>
      </div>
        <div className="col-12">
        <button type="submit" className="btn btn-light" 
        disabled={isEnabled}>Deposit</button>
        </div>
      </form>
      {modal?<Modal title="Success" text={`You have deposited $ ${deposit.current.value}`} 
      btncolor="success" btntext="Ok" event={closeModal} /> : <> </> } 
      </>
    )}
    />
    :<Navigate to="/login"/>}
    </>
  )
}
export default Deposit;