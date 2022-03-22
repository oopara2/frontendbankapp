import { useUserContext } from '../context/Context';
import { Navigate } from 'react-router-dom';
import Card from '../components/Card';
import image from '../assets/bank-logo.png';

const Home = () => {
  const { userLogIn } = useUserContext();
  return (
    <>
    {userLogIn?
    <Card
      bgcolor="success"
      txtcolor="white"
      header={`Welcome ${userLogIn.name}!`}
      title="Welcome to the Green Mountain Bank"
      text="You can get started by entering an amount in the Deposit section."
      body={(<img src={image} className="img-fluid"
      alt="Responsive image"/>)}
      />
      :<Navigate to="/login"/>}
    </>
  );  
}
export default Home;
