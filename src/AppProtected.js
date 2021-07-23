import Protect from 'react-app-protect'
import 'react-app-protect/dist/index.css'
import App from './App'

export default function AppProtected() {
  return (
    <Protect
      blur
      sha512='e5ea5f3ec4d33f45f032bb53aec0607ae3201e82532bb8212f18419cfff05011c1023db5e1b0506a4815e89e0737b89488fa6f825359ad54186dbfa3aca57ced'>
      <App/>
    </Protect>
  );
}
