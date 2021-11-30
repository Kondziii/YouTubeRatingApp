import './styles/quasar.scss';
import 'animate.css';
import 'quasar/dist/quasar.addon.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import langPl from 'quasar/lang/pl';
import { QSpinner } from 'quasar';

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {},
  lang: langPl,
  loading: {
    spinner: QSpinner,
    spinnerColor: 'teal-10',
    messageColor: 'white',
    message: '<b>Loading...</b>',
  },
};
