import logo from '../images/HR.JPG';

export default function Claim() {
    return (
      <div className="App">
        <form>
          <h1>Claim Form</h1>
          <div>
          <img src={logo} width="540" height="300" alt="HR logo"/>
          </div>
        </form>
      </div>
    ) 
  }