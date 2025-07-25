import { SelectField } from 'payload'

export const marker: SelectField = {
  name: "marker",
  type: 'select',
  options: [
    {
      label: "Run",
      value: "run",
    },
    {
      label: "Walk",
      value: "walk",
    },
    {
      label: "Hike",
      value: "hike",
    },
    {
      label: "Bike",
      value: "bike",
    },
    {
      label: "Zwift",
      value: "zwift",
    },
  ],
};
