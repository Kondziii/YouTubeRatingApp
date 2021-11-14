import { ref, watch } from 'vue';

interface DateRules {
  dateErr: {
    value: boolean;
  };
  beginDate: {
    value: string;
  };
  endDate: {
    value: string;
  };
  dateRules: (value: string) => string | void;
}

export default (): DateRules => {
  const dateErr = ref<boolean>(false);
  const beginDate = ref<string>('');
  const endDate = ref<string>('');

  const dateRules = (value: string): string | void => {
    if (!value || value.length === 0) {
      return 'Pole nie może być puste';
    } else if (!/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(value)) {
      return 'Nieprawidłowy format, przykład 1/01/2021';
    }
  };

  watch([beginDate, endDate], (currValues) => {
    if (currValues[0] !== '' && currValues[1] !== '') {
      const date1 = new Date(currValues[0].split('/').reverse().join());
      const date2 = new Date(currValues[1].split('/').reverse().join());

      if (date1.getTime() > date2.getTime()) {
        dateErr.value = true;
      } else {
        dateErr.value = false;
      }
    } else {
      dateErr.value = false;
    }
  });

  return { dateErr, beginDate, endDate, dateRules };
};
